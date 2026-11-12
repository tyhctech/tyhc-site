/* 天予恒成官网 · 站内客服（纯前端，无请求、无第三方依赖）
   规则式应答：命中预置问答即答，未命中引导做初诊或留邮箱。
   所有文案取自已上线的站点口径，不承诺价格、不承诺工期。 */
(function () {
  "use strict";

  var MAIL = "tyhctech@hotmail.com";

  var QA = [
    {
      k: ["价格", "多少钱", "费用", "报价", "收费", "预算", "贵"],
      a: "服务分五档：救命包 3 万起（2–4 周，单场景单岗位）；增效包 6–14 万（4–8 周，1–3 个岗位数字员工）；建制包 15–30 万（8–12 周，3–5 岗位群）；增长包 35 万起（1–3 月）；共创包 60–150 万。完整价目在「服务与价格」页。"
    },
    {
      k: ["私有化", "内网", "数据安全", "部署", "本地", "出网", "保密", "案卷"],
      a: "涉及客户数据、案卷、财务的场景可以做私有化部署，数据不出内网。这类方案除软件之外要预留本地算力与实施工作量，报价与上云方案不同。"
    },
    {
      k: ["多久", "周期", "见效", "时间", "上线"],
      a: "单点验证通常 2–4 周，用一个可签字的指标验收。周期不建议压缩：压缩换来的时间，一般会在验收阶段还回去。"
    },
    {
      k: ["开始", "怎么合作", "流程", "前期", "起步", "第一次"],
      a: "建议先做一次免费初诊（12 题，3 分钟），拿到起步建议与适配档位；确认场景基线后再进入 POC。也可以直接把问题发到 " + MAIL + "。"
    },
    {
      k: ["案例", "做过", "客户", "行业", "效果"],
      a: "已交付制造、律所、高校、内容运营等场景，案例页都是脱敏版。做法是先在天予自己身上跑通，再对外交付。"
    },
    {
      k: ["付款", "分期", "怎么付", "合同", "尾款"],
      a: "按效果分期：签约 30%，快赢验收 40%，30 天稳定运行后 30%。"
    },
    {
      k: ["规模", "多少人", "适合", "中小", "人数"],
      a: "主要面向 20–300 人的中小企业。更小的团队先做单点场景，规模更大的按建制包或共创包组织。"
    },
    {
      k: ["大模型", "模型", "区别", "api", "自己买", "智能体"],
      a: "模型本身不产生结果，产生结果的是流程和岗位。我们做的是把 AI 接进业务流程、定义可验收的指标、并让组织真正用起来，而不是堆模型。"
    },
    {
      k: ["售后", "运维", "维护", "出问题", "稳定"],
      a: "交付后进入稳定运行期，30 天内按验收指标复核；此后的运维与迭代按约定执行。"
    },
    {
      k: ["联系", "邮箱", "电话", "地址", "在哪", "微信", "公众号"],
      a: "邮箱 " + MAIL + "，地址在成都天府新区华阳街道富民路一段 87 号 1 层，公众号「天予恒成」。也可以直接做免费初诊。"
    },
    {
      k: ["是什么", "做什么", "业务", "介绍", "你们"],
      a: "天予恒成做中小企业 AI 落地：核心交付是数字员工、行业方案与私有化部署三类，目标是把 AI 放进具体岗位和考核里。"
    }
  ];

  var CHIPS = ["价格怎么算", "数据能不能私有化", "多久能见效", "怎么开始", "有没有案例"];

  function normalize(s) {
    return String(s || "").toLowerCase().replace(/\s+/g, "");
  }

  function answerFor(text) {
    var q = normalize(text);
    if (!q) return null;
    for (var i = 0; i < QA.length; i++) {
      for (var j = 0; j < QA[i].k.length; j++) {
        if (q.indexOf(normalize(QA[i].k[j])) > -1) return QA[i].a;
      }
    }
    return null;
  }

  var FALLBACK = "这个问题我暂时答不好。你可以：① 做一次免费初诊，拿到起步建议；② 把问题发到 " + MAIL + "，我们直接回你。";

  var root = document.createElement("div");
  root.className = "cs";

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cs-btn";
  btn.setAttribute("aria-label", "在线客服");
  btn.innerHTML = '<svg class="cs-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 14.6a8.5 8.5 0 0 1 17 0"/><rect x="1.9" y="13.6" width="4.6" height="7" rx="2.3"/><rect x="17.5" y="13.6" width="4.6" height="7" rx="2.3"/></svg><span class="cs-label">在线客服</span>';
  var label = btn.querySelector(".cs-label");
  function setLabel(t) { label.textContent = t; }
  root.appendChild(btn);

  var panel = document.createElement("div");
  panel.className = "cs-panel";
  panel.hidden = true;

  var head = document.createElement("div");
  head.className = "cs-head";
  var title = document.createElement("span");
  title.className = "cs-title";
  title.textContent = "在线客服";
  var close = document.createElement("button");
  close.type = "button";
  close.className = "cs-close";
  close.setAttribute("aria-label", "关闭");
  close.textContent = "×";
  head.appendChild(title);
  head.appendChild(close);
  panel.appendChild(head);

  var log = document.createElement("div");
  log.className = "cs-log";

  var greet = document.createElement("div");
  greet.className = "cs-msg cs-bot";
  greet.textContent = "你好，这里是天予恒成的在线客服。服务包、部署方式、周期和案例都可以直接问；也可以先做一次免费初诊。";
  log.appendChild(greet);
  panel.appendChild(log);

  var chips = document.createElement("div");
  chips.className = "cs-chips";
  CHIPS.forEach(function (t) {
    var c = document.createElement("button");
    c.type = "button";
    c.className = "cs-chip";
    c.textContent = t;
    c.addEventListener("click", function () { ask(t); });
    chips.appendChild(c);
  });
  panel.appendChild(chips);

  var foot = document.createElement("div");
  foot.className = "cs-foot";
  var input = document.createElement("input");
  input.type = "text";
  input.className = "cs-input";
  input.placeholder = "输入问题，例如：私有化部署怎么算";
  input.setAttribute("aria-label", "输入问题");
  var send = document.createElement("button");
  send.type = "button";
  send.className = "cs-send";
  send.textContent = "发送";
  foot.appendChild(input);
  foot.appendChild(send);
  panel.appendChild(foot);

  var quick = document.createElement("div");
  quick.className = "cs-quick";
  var qa = document.createElement("a");
  qa.href = "diagnose.html";
  qa.textContent = "免费初诊";
  var qb = document.createElement("a");
  qb.href = "mailto:" + MAIL;
  qb.textContent = "发邮件";
  quick.appendChild(qa);
  quick.appendChild(qb);
  panel.appendChild(quick);

  root.appendChild(panel);
  document.body.appendChild(root);

  function add(kind, text) {
    var m = document.createElement("div");
    m.className = "cs-msg " + (kind === "me" ? "cs-me" : "cs-bot");
    m.textContent = text;
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  function ask(text) {
    var t = String(text || "").trim();
    if (!t) return;
    add("me", t);
    var a = answerFor(t);
    window.setTimeout(function () { add("bot", a || FALLBACK); }, 260);
    input.value = "";
  }

  btn.addEventListener("click", function () {
    var open = panel.hidden;
    panel.hidden = !open;
    setLabel(open ? "收起" : "在线客服");
    if (open) input.focus({ preventScroll: true });
  });

  close.addEventListener("click", function () {
    panel.hidden = true;
    setLabel("在线客服");
  });

  send.addEventListener("click", function () { ask(input.value); });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); ask(input.value); }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; setLabel("在线客服"); }
  });
})();
