/* 天予恒成 · AI 落地初诊（纯前端，无请求、无存储） */
(function () {
  "use strict";

  var MAIL = "tyhctech@hotmail.com";

  var STEPS = ["企业基本盘", "痛点与可量化基线", "数据与知识基础", "组织与决策"];

  var QUESTIONS = [
    {
      id: "size", step: 0, type: "radio", required: true,
      label: "公司在职人数", hint: "按当前在职人数选，含外包常驻",
      options: [
        { v: "s1", t: "20 人以下" },
        { v: "s2", t: "20–100 人" },
        { v: "s3", t: "100–300 人" },
        { v: "s4", t: "300 人以上" }
      ]
    },
    {
      id: "role", step: 0, type: "radio", required: true,
      label: "填这份自查的人", hint: "不同角色看到的结论侧重点不同",
      options: [
        { v: "boss", t: "一把手 / 老板" },
        { v: "head", t: "业务或职能负责人" },
        { v: "it", t: "IT / 行政 / 综合管理" },
        { v: "other", t: "其他" }
      ]
    },
    {
      id: "chains", step: 0, type: "multi", required: true, max: 2,
      label: "最想优先解决的环节", hint: "最多选 2 项；贪多会摊薄单点验证的效果",
      options: [
        { v: "acquire", t: "获客引流" },
        { v: "presale", t: "售前交付" },
        { v: "operate", t: "生产与业务执行" },
        { v: "office", t: "内部协同管理" },
        { v: "compliance", t: "风控合规与文档资产" },
        { v: "review", t: "复盘与数据运营" }
      ]
    },
    {
      id: "pain", step: 1, type: "text", required: false,
      label: "在这个环节里，最耗人力或最容易出错的具体动作", hint: "一句话即可，例如「每份标书手工拼装约 4 小时」「质检靠老师傅抽检」",
      placeholder: "例如：每份标书手工拼装约 4 小时，体检式返工多"
    },
    {
      id: "baseline", step: 1, type: "multi", required: true,
      label: "现在能拿出的量化基线", hint: "多选；没有具体数字就选最后一项",
      options: [
        { v: "time", t: "处理耗时" },
        { v: "error", t: "差错率 / 返工率" },
        { v: "complaint", t: "客诉或退货次数" },
        { v: "headcount", t: "投入人力人数" },
        { v: "loss", t: "产值或成本损失" },
        { v: "unclear", t: "暂时说不清" }
      ]
    },
    {
      id: "impact", step: 1, type: "radio", required: true,
      label: "这个问题一年大致造成的损失或占用的人工", hint: "粗估即可，用于判断投入是否划算",
      options: [
        { v: "unknown", t: "说不清" },
        { v: "lt10", t: "10 万以内" },
        { v: "10to50", t: "10–50 万" },
        { v: "gt50", t: "50 万以上" }
      ]
    },
    {
      id: "material", step: 2, type: "multi", required: true,
      label: "相关资料现在是什么形态", hint: "多选；这决定知识库能否快速建起来",
      options: [
        { v: "paper", t: "纸质" },
        { v: "scan", t: "扫描件 PDF" },
        { v: "excel", t: "Excel 表格" },
        { v: "system", t: "业务系统导出" },
        { v: "scattered", t: "散落在个人电脑" },
        { v: "none", t: "基本没有" }
      ]
    },
    {
      id: "kb", step: 2, type: "radio", required: true,
      label: "知识库 / 文档管理的现状", hint: "有无维护人，比有没有系统更关键",
      options: [
        { v: "maintained", t: "有，且有人定期维护" },
        { v: "idle", t: "有，但没人维护" },
        { v: "none", t: "没有" }
      ]
    },
    {
      id: "dataMode", step: 2, type: "radio", required: true,
      label: "相关数据能否离开公司内网", hint: "涉及客户数据、案卷、财务的多为不可出网",
      options: [
        { v: "cloud", t: "可以上云" },
        { v: "private", t: "只能私有化部署" },
        { v: "unsure", t: "不确定" }
      ]
    },
    {
      id: "owner", step: 3, type: "radio", required: true,
      label: "是否有专人推进这件事", hint: "兼职也算；没人推是项目最常见的停摆原因",
      options: [
        { v: "full", t: "有专职负责人" },
        { v: "part", t: "有兼职负责人" },
        { v: "none", t: "还没有" }
      ]
    },
    {
      id: "budget", step: 3, type: "radio", required: true,
      label: "可投入的预算量级", hint: "决定起步档位，不构成报价",
      options: [
        { v: "b1", t: "3 万以内" },
        { v: "b2", t: "3–10 万" },
        { v: "b3", t: "10–30 万" },
        { v: "b4", t: "30–60 万" },
        { v: "b5", t: "60 万以上" },
        { v: "b6", t: "未定" }
      ]
    },
    {
      id: "horizon", step: 3, type: "radio", required: true,
      label: "希望多久看到效果", hint: "时间越紧，越只能做单点验证",
      options: [
        { v: "m1", t: "1 个月内" },
        { v: "m3", t: "1–3 个月" },
        { v: "m6", t: "3 个月以上" },
        { v: "any", t: "说不好" }
      ]
    }
  ];

  var BAGS = {
    b1: { name: "救命包", price: "3 万起 · 2–4 周", note: "单场景单岗位，先跑通一个可签字的指标" },
    b2: { name: "增效包", price: "6–14 万 · 4–8 周", note: "1–3 个岗位数字员工，工时与差错双口径验收" },
    b3: { name: "建制包", price: "15–30 万 · 8–12 周", note: "3–5 岗位群 + 组织模板，流程会签承载" },
    b4: { name: "增长包", price: "35 万起 · 1–3 月", note: "全链路贯通，全局 ROI 对标 POC 基线" },
    b5: { name: "共创包", price: "60–150 万", note: "战略级五模块，全链路重构" }
  };

  var state = {};
  var step = 0;

  var elBody = document.getElementById("quizBody");
  var elPrev = document.getElementById("quizPrev");
  var elNext = document.getElementById("quizNext");
  var elFill = document.getElementById("quizFill");
  var elStepLabel = document.getElementById("quizStepLabel");
  var elCount = document.getElementById("quizCount");
  var elQuiz = document.getElementById("quiz");
  var elResult = document.getElementById("quizResult");

  function qs(list, id) {
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  function answeredCount() {
    var n = 0;
    QUESTIONS.forEach(function (q) {
      var v = state[q.id];
      if (q.type === "multi") { if (v && v.length) n++; }
      else if (q.type === "text") { if (v && String(v).trim()) n++; }
      else if (v) n++;
    });
    return n;
  }

  function render() {
    elStepLabel.textContent = "第 " + (step + 1) + " 步 / 共 " + STEPS.length + " 步 · " + STEPS[step];
    elCount.textContent = answeredCount() + " / " + QUESTIONS.length + " 题";
    elFill.style.width = Math.round(((step + 1) / STEPS.length) * 100) + "%";
    elPrev.disabled = step === 0;
    elNext.textContent = step === STEPS.length - 1 ? "生成初诊结论" : "下一步";

    while (elBody.firstChild) elBody.removeChild(elBody.firstChild);

    QUESTIONS.filter(function (q) { return q.step === step; }).forEach(function (q, idx) {
      var block = document.createElement("div");
      block.className = "q";

      var l = document.createElement("div");
      l.className = "q-label";
      var num = QUESTIONS.indexOf(q) + 1;
      l.textContent = num + ". " + q.label;
      block.appendChild(l);

      if (q.hint) {
        var h = document.createElement("div");
        h.className = "q-hint";
        h.textContent = q.hint;
        block.appendChild(h);
      }

      if (q.type === "text") {
        var ta = document.createElement("textarea");
        ta.className = "q-text";
        ta.rows = 3;
        ta.placeholder = q.placeholder || "";
        ta.value = state[q.id] || "";
        ta.addEventListener("input", function () { state[q.id] = ta.value; elCount.textContent = answeredCount() + " / " + QUESTIONS.length + " 题"; });
        block.appendChild(ta);
      } else {
        var wrap = document.createElement("div");
        wrap.className = "q-opts";
        q.options.forEach(function (o) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "opt";
          b.textContent = o.t;
          var cur = state[q.id] || (q.type === "multi" ? [] : "");
          var on = q.type === "multi" ? cur.indexOf(o.v) > -1 : cur === o.v;
          if (on) b.classList.add("on");
          b.setAttribute("aria-pressed", on ? "true" : "false");
          b.addEventListener("click", function () {
            if (q.type === "multi") {
              var arr = (state[q.id] || []).slice();
              var i = arr.indexOf(o.v);
              if (i > -1) arr.splice(i, 1);
              else {
                if (arr.length >= q.max) { flash(b); return; }
                arr.push(o.v);
              }
              state[q.id] = arr;
            } else {
              state[q.id] = o.v;
            }
            render();
          });
          wrap.appendChild(b);
        });
        block.appendChild(wrap);
      }

      elBody.appendChild(block);
      if (idx < 3) { /* 间距由 CSS 控制 */ }
    });
  }

  function flash(node) {
    node.classList.add("shake");
    setTimeout(function () { node.classList.remove("shake"); }, 400);
  }

  function validateStep() {
    var ok = true;
    QUESTIONS.filter(function (q) { return q.step === step; }).forEach(function (q) {
      if (!q.required) return;
      var v = state[q.id];
      var empty = q.type === "multi" ? !(v && v.length) : !v;
      if (empty) ok = false;
    });
    return ok;
  }

  elPrev.addEventListener("click", function () {
    if (step > 0) { step--; render(); window.scrollTo({ top: elQuiz.offsetTop - 90, behavior: "smooth" }); }
  });

  elNext.addEventListener("click", function () {
    if (!validateStep()) {
      elCount.classList.add("warn");
      setTimeout(function () { elCount.classList.remove("warn"); }, 600);
      alert("这一步还有未选的必答项，选完再继续。");
      return;
    }
    if (step < STEPS.length - 1) {
      step++; render();
      window.scrollTo({ top: elQuiz.offsetTop - 90, behavior: "smooth" });
    } else {
      showResult();
    }
  });

  function labelOf(qid, val) {
    var q = qs(QUESTIONS, qid);
    if (!q) return "";
    if (q.type === "multi") {
      var arr = val || [];
      return arr.map(function (v) {
        for (var i = 0; i < q.options.length; i++) if (q.options[i].v === v) return q.options[i].t;
        return v;
      }).join("、");
    }
    for (var i = 0; i < q.options.length; i++) if (q.options[i].v === val) return q.options[i].t;
    return val || "";
  }

  function compute() {
    var s = 0;
    if (state.kb === "maintained") s += 30;
    else if (state.kb === "idle") s += 18;
    else s += 6;

    if (state.owner === "full") s += 30;
    else if (state.owner === "part") s += 18;
    else s += 6;

    var base = state.baseline || [];
    var hasMetric = base.filter(function (x) { return x !== "unclear"; }).length > 0;
    s += hasMetric ? 25 : 5;

    if (state.role === "boss") s += 10;

    return { score: s, hasMetric: hasMetric };
  }

  function pickBag(score, hasMetric) {
    var b = state.budget;
    var scenes = (state.chains || []).length;
    if (b === "b1") return "b1";
    if (b === "b2") return (score >= 55 && hasMetric) ? "b2" : "b1";
    if (b === "b3") return score >= 55 ? "b3" : "b2";
    if (b === "b4") return scenes >= 3 ? "b4" : "b3";
    if (b === "b5") return "b5";
    return (score >= 70 && hasMetric) ? "b2" : "b1";
  }

  function verdict(score, hasMetric) {
    if (score >= 70 && hasMetric) return { t: "适合现在启动单点验证", d: "基础条件齐备，可以从最痛的单点场景直接进入 POC，用 2–4 周换一个可签字的结果。" };
    if (score >= 40) return { t: "有条件启动，先补齐一项基础", d: "方向明确，但缺一项前提（量化基线、知识沉淀或推进人）。补齐这一项，POC 的成功率会明显不同。" };
    return { t: "建议先做基线梳理，暂不进入采购", d: "现在直接采购方案的风险偏高：没有可比较的基线，验收标准就立不住。先用两周把现状量出来更划算。" };
  }

  function advice(score, hasMetric) {
    var out = [];
    if (!hasMetric) out.push("选一个岗位，连续记录两周的耗时、差错与处理量，形成可比较的基线数字。");
    if (state.kb === "none") out.push("先收拢近 12 个月的文档，指定一名维护人；知识库没有维护人，三周就会腐化。");
    else if (state.kb === "idle") out.push("现有知识库缺维护机制：定命名规范与周维护动作，否则检索质量会持续下降。");
    if (state.owner === "none") out.push("指定一名推进人（兼职即可），负责跨部门协调与验收签字，否则项目会停在部门之间。");
    if (state.dataMode === "private") out.push("数据只能私有化，预算里要预留本地算力（一体机或推理卡），不能只算软件。");
    if (state.role !== "boss") out.push("让一把手对验收指标做一次确认：指标谁定，谁就在验收时签字。");
    if (state.horizon === "m1") out.push("一个月内只做单点快赢，不要同期铺开多个场景。");
    if ((state.chains || []).length >= 3) out.push("先聚焦一个环节，其余环节列为下一阶段，避免多线并行拖慢验证。");
    while (out.length < 3) {
      out.push("把最痛的那个动作写成一句话，加上「现在多久、错多少次」，这就是 POC 的第一条验收口径。");
      if (out.length < 3) out.push("方案周期不要压缩：压缩换来的时间，通常会在验收阶段还回去。");
    }
    return out.slice(0, 3);
  }

  function summaryText(res) {
    var lines = [];
    lines.push("天予恒成 · AI 落地初诊摘要");
    lines.push("生成时间：" + new Date().toLocaleString("zh-CN"));
    lines.push("");
    lines.push("公司规模：" + labelOf("size", state.size));
    lines.push("填写人角色：" + labelOf("role", state.role));
    lines.push("优先环节：" + labelOf("chains", state.chains));
    if (state.pain) lines.push("具体动作：" + state.pain);
    lines.push("现有基线：" + labelOf("baseline", state.baseline));
    lines.push("年度影响：" + labelOf("impact", state.impact));
    lines.push("资料形态：" + labelOf("material", state.material));
    lines.push("知识库：" + labelOf("kb", state.kb));
    lines.push("数据出网：" + labelOf("dataMode", state.dataMode));
    lines.push("推进人：" + labelOf("owner", state.owner));
    lines.push("预算区间：" + labelOf("budget", state.budget));
    lines.push("期望周期：" + labelOf("horizon", state.horizon));
    lines.push("");
    lines.push("准备度：" + res.score + " / 95");
    lines.push("适配档位：" + res.bag.name + "（" + res.bag.price + "）");
    lines.push("结论：" + res.verdict.t);
    lines.push("");
    lines.push("行动清单：");
    res.advice.forEach(function (a, i) { lines.push((i + 1) + ". " + a); });
    lines.push("");
    lines.push("（本摘要由 tyhctech.com/diagnose.html 本机生成，未上传任何服务器）");
    return lines.join("\n");
  }

  function showResult() {
    var sc = compute();
    var bagKey = pickBag(sc.score, sc.hasMetric);
    var bag = BAGS[bagKey];
    var vd = verdict(sc.score, sc.hasMetric);
    var adv = advice(sc.score, sc.hasMetric);

    var res = { score: sc.score, bag: bag, verdict: vd, advice: adv };

    while (elResult.firstChild) elResult.removeChild(elResult.firstChild);

    var badge = document.createElement("span");
    badge.className = "pill";
    badge.textContent = "准备度 " + sc.score + " / 95";
    elResult.appendChild(badge);

    var h = document.createElement("h2");
    h.textContent = vd.t;
    elResult.appendChild(h);

    var p = document.createElement("p");
    p.className = "result-lead";
    p.textContent = vd.d;
    elResult.appendChild(p);

    var box = document.createElement("div");
    box.className = "result-box";
    var bh = document.createElement("h3");
    bh.textContent = "适配档位：" + bag.name;
    box.appendChild(bh);
    var bp = document.createElement("p");
    bp.textContent = bag.price + " · " + bag.note;
    box.appendChild(bp);
    elResult.appendChild(box);

    var ah = document.createElement("h3");
    ah.className = "result-sub";
    ah.textContent = "建议先做这三件事";
    elResult.appendChild(ah);

    var ol = document.createElement("ol");
    ol.className = "result-list";
    adv.forEach(function (a) {
      var li = document.createElement("li");
      li.textContent = a;
      ol.appendChild(li);
    });
    elResult.appendChild(ol);

    if (state.dataMode === "private") {
      var note = document.createElement("p");
      note.className = "result-note";
      note.textContent = "数据只能私有化部署：软件之外还需预留本地算力与部署实施的工作量，报价会与上云方案不同。";
      elResult.appendChild(note);
    }

    var acts = document.createElement("div");
    acts.className = "result-actions";

    var a1 = document.createElement("a");
    a1.className = "btn btn-primary";
    a1.href = "service.html";
    a1.textContent = "看服务与价目";
    acts.appendChild(a1);

    var a2 = document.createElement("button");
    a2.type = "button";
    a2.className = "btn btn-ghost";
    a2.textContent = "复制诊断摘要";
    a2.addEventListener("click", function () {
      var txt = summaryText(res);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () {
          a2.textContent = "已复制";
          setTimeout(function () { a2.textContent = "复制诊断摘要"; }, 1600);
        }, function () { fallbackCopy(txt, a2); });
      } else { fallbackCopy(txt, a2); }
    });
    acts.appendChild(a2);

    var a3 = document.createElement("a");
    a3.className = "btn btn-ghost";
    a3.textContent = "发送到企业邮箱";
    a3.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent("AI 落地初诊摘要（来自官网自查）") + "&body=" + encodeURIComponent(summaryText(res));
    acts.appendChild(a3);

    elResult.appendChild(acts);

    var foot = document.createElement("p");
    foot.className = "result-foot";
    foot.textContent = "初诊只说明「现在适合做什么」，不构成报价承诺；具体方案需在确认场景基线后测算。";
    elResult.appendChild(foot);

    var again = document.createElement("button");
    again.type = "button";
    again.className = "result-again";
    again.textContent = "重新做一次";
    again.addEventListener("click", function () {
      state = {}; step = 0;
      elResult.hidden = true;
      elQuiz.hidden = false;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    elResult.appendChild(again);

    elQuiz.hidden = true;
    elResult.hidden = false;
    window.scrollTo({ top: elResult.offsetTop - 90, behavior: "smooth" });
  }

  function fallbackCopy(txt, btn) {
    var ta = document.createElement("textarea");
    ta.value = txt;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); btn.textContent = "已复制"; }
    catch (e) { btn.textContent = "请手动选择复制"; }
    document.body.removeChild(ta);
    setTimeout(function () { btn.textContent = "复制诊断摘要"; }, 1600);
  }

  render();
})();
