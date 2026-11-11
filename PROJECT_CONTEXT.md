# 项目记忆 · 11-天予恒成官网

> ⚡ 项目的"记忆文件"。换账号/换会话后，AI 先读本文件即可接上上下文。
> 最后更新：2026-11-11

## 🚨 防漂移铁律（每次读文件先看）
- **铁律一：不读文档不动手** — 新会话第一件事：完整读本文件 + README.md。
- **铁律二：不确认不动手** — 接到需求先复述理解，用户确认再动手，禁止脑补。
- **铁律三：做完立刻写文档** — 关键决策/变更立刻更新本文件与 README。
- **铁律四：用户说啥做啥，不发挥** — 说 A 做 A，不自己加 B/C/D。
- **内容红线**：所有对外内容必须来自公司简介 PPT / 用户确认口径，**不编造数据、案例、客户名、资质**。

## 一、项目是什么（一句话）

**天予恒成官网** = 成都天予恒成科技有限公司的企业官网，纯静态多页站（5 页：首页 / 关于我们 / 运营体系 / 服务与价格 / 行业案例），把公司简介 PPT 的结构化内容搬到线上，供客户了解定位、产品、价目与案例，并为后续 GEO 提供权威源。

## 二、技术栈（选型表）

| 层 | 选型 |
|---|---|
| 前端 | 纯静态 HTML + CSS + 原生 JS（无框架、无第三方包） |
| 托管 | GitHub Pages（账号 hadesheng，仓库 hadesheng/tyhc-site，项目页 + 仓库级自定义域名） |
| 域名 | **tyhctech.com**（已注册，2019-10-21 注册 / 2027-10-21 到期，NS 在 DNSPod）；www 子域规划同站 |
| 更新 | 改文件 → git commit → push（Pages 60–180 秒重新构建） |

## 三、目录结构（关键文件说明）

```
11-天予恒成官网/
├── index.html          # 首页
├── about.html          # 关于我们
├── solution.html       # 运营体系（七层 / 治理 / 权限熔断）
├── service.html        # 服务与价格（L0–L6 / 五档包 / 六项保障）
├── cases.html          # 行业案例（四行业 / 四案例）
├── style.css           # 共享样式
├── app.js              # 移动端导航
├── robots.txt / sitemap.xml
├── PROJECT_CONTEXT.md  # 本文件
├── README.md           # 项目卡片
└── CHANGELOG.md        # 版本变更
```

## 四、启动方式 / 端口 / 访问地址

- 本地：项目根目录 `python -m http.server 8788` → http://127.0.0.1:8788/
- 线上（目标）：https://tyhctech.com/ （仓库内 CNAME=tyhctech.com，Pages 自定义域名已设置）
- 过渡地址（域名解析生效前）：https://hadesheng.cn/tyhc-site/ （注意：设置仓库级自定义域名后会失效）

## 五、当前进度

- ✅ 立项建档（目录 / git / README / PROJECT_CONTEXT / .gitignore）
- ✅ 5 个页面开发完成，内容取自《天予恒成公司简介》PPT 14 页
- ✅ 部署 GitHub Pages（仓库 hadesheng/tyhc-site），构建 built
- ✅ 自定义域名 tyhctech.com：仓库 CNAME 文件 + Pages cname 已设置，canonical / sitemap / robots 全部改为 tyhctech.com
- ⬜ **待用户在 DNSPod 加解析**（4 条 A + www CNAME），生效后 GitHub 签发 HTTPS 证书
- ⬜ 生产级合规：ICP 备案（如需境内服务器/CDN、公众号小程序跳转、平台投流）
- ⬜ OG 分享图（1200×630）
- ⬜ 内容增补：公司实景图 / 团队照片（如用户提供）

## 六、关键决策与踩坑记录（决策→原因→结果）

1. **静态站走 GitHub Pages（复用 09 通道）** — 原因：0 成本、已有 gh CLI 与 API 推送脚本经验、无需服务器。结果：本机 github.com 网页不可达但 api.github.com 可达，走 gh CLI（已登录 hadesheng）建仓推送即可。
2. **内容口径严格取自 PPT** — 原因：官网是对外承诺，价格、KPI 达标线、案例数字均属合同级口径，不能自行润色放大。结果：五档价目、五项 KPI、四级权限、四案例数字全部与 PPT 逐字一致。
3. **设计沿用 09 品牌基调（深蓝黑 #070A13 + 电光青 #22D3EE / 紫 #8B5CF6）** — 原因：同一公司主体，视觉统一；用户偏好科技蓝、拒绝绿色。结果：全站同一套 CSS 变量，换色只需改 :root。
4. **CSP 用 meta 下发** — 原因：GitHub Pages 无法自定义响应头；沿用 09 的严格基线，并让脚本失败时内容仍可见（无 JS 也能读全部内容）。
5. **项目页绑定独立域名 tyhctech.com（2026-11-11）** — 依据 GitHub 官方文档「You can override the default custom domain by adding a custom domain to the individual repository」：项目页可覆盖用户站默认域名。操作=仓库加 `CNAME`（tyhctech.com）+ `PUT /repos/…/pages -f cname=tyhctech.com`。**副作用**：设置后原 `hadesheng.cn/tyhc-site/` 路径不再服务，站点只回答 tyhctech.com。
6. **git push 443 被阻断，改走 API 提交** — 现象：`git push` 报 `Recv failure: Connection was reset`（github.com 网页/443 不稳），但 `api.github.com` 稳定可达。做法：脚本用 `gh auth token` 取 token（仅内存），走 Contents API 逐文件 base64 PUT。**下次改版沿用此通道**，不要反复试 git push。
7. **安全加固（2026-11-11，v1.1）** — 已做：①CSP 收紧为 `default-src 'none'` + 显式 `media/object/frame/worker` 全禁 + `base-uri 'none'` + `form-action 'none'` + `upgrade-insecure-requests`；②`security.txt` 双份（根目录 + `.well-known/`，RFC 9116，Contact=hadeshengai@163.com，Expires=2027-11-11）；③加 `.nojekyll`（让 `.well-known` 等点开头路径按原样发布，09 已验证不加会 404）；④加 `404.html`（`noindex` 兜底，不泄露内部信息）；⑤全站无外部资源、无 `target=_blank`、无表单、无 Cookie → 无 XSS/CSRF/点击劫持业务面；⑥验证=headless Chrome 逐页截图（CSP 生效下渲染正常）。
8. **静态站安全加固的硬边界（已知残余风险，接受）** — GitHub Pages 无法下发响应头，因此 **HSTS / X-Frame-Options / X-Content-Type-Options / Permissions-Policy / CSP frame-ancestors 永久缺失**；meta CSP 只能覆盖部分指令。09 已就「前置 CDN 补响应头」做过方案并被用户否决（需本人注册账号 + 迁 NS），此处不再重复提议。**另有一条待用户操作**：GitHub Pages 自定义域名未做域名验证时可被他人抢注托管 → 需在仓库 Settings → Pages 点 Verify（GitHub 自动签发 TXT），我无法代做。
9. **踩坑：手写 HTML 闭合错导致布局崩** — `service.html` L1–L3 的 `<h4>诊断</div>`（应为 `</h4>`）使 `<p>` 脱离卡片、被 grid 当作独立项，七阶步骤视觉错乱。**规则**：改完页面必须 headless 截图核验 + 跑标签平衡检查（脚本 `assets/fix_and_check.py`），不能只看源码。
10. **构建方式真相（2026-11-11 纠错，重要）** — 本仓库**不是** Jekyll + Actions 发布：无 `_config.yml`、无 `Gemfile`、无 `.github/workflows`、无 `gh-pages` 分支，根目录有 `.nojekyll`。GitHub Pages 走 legacy 构建，**直接从 `main` 分支根目录发布原始 HTML/CSS/JS**。所以「本地 `jekyll clean && jekyll build` + 检查 `_site`」在这台机器上不存在也跑不了（无 Ruby/Jekyll）。**等效自检三项**：①全库 grep 旧菜单词零命中（html/js/yml/md 全覆盖）；②`python -m http.server 8788` + headless Chrome 逐页截图肉眼核验；③HTML 标签闭合校验（`html.parser` 脚本，2026-11-11 用 `D:\Temp\tyhc_check\check_tags.py`，7 页全 OK）。实测发布生效 20–60 秒，响应头 `Cache-Control: max-age=600`、`Server: GitHub.com`，**无 `cf-cache-status`** → 本域名直连 GitHub Pages（185.199.x.x），不经过 Cloudflare，"清 CF 缓存"这一步在本站不适用。
11. **推送通道实测（2026-11-11）** — `git push` / `git ls-remote` 到 github.com:443 全部 `Connection was reset`，本机无代理（7890/7897/10809/1080/8080 均无监听）、无 credential helper；SSH 443 能连通但公钥被拒（`Permission denied (publickey)`）。**可用通道只有 `gh api` Contents API**：gh 在 `D:\工具\gh-cli\bin\gh.exe`（**不在 PATH**，`gh` 直接调会 CommandNotFound），账号 `hadesheng` 走 keyring 已登录，对 `tyhctech/tyhc-site` 权限 `push=true`（组织成员接口 404 不影响推送）。逐文件 PUT 必须带远端 sha 做乐观锁，返回的 blob sha 与本地 `git hash-object` 一致才算内容对齐。

## 七、接手提示（唯一真相路径、验证方式）

- 唯一真相：`D:\天予工具栈\11-天予恒成官网`
- 内容源：用户上传《天予恒成公司简介》PPT（14 页），本地副本在会话 assets 目录
- 线上验证：`curl -sI https://tyhctech.com/` 应 200 且证书有效；改版后必须核对线上特征串，不能凭 push/commit 成功断言
- 健康检查清单：`security.txt`、`.well-known/security.txt` 各自 200；`404.html` 生效；页面源码含新 CSP 串
- 服务器裸仓（按工具栈约定应配）：`ssh://devuser@1.95.50.1:23390/home/devuser/zc-toolstack/repos/11-tyhc-site.git`（待创建/确认）

### 变更记录

| 日期 | 变更 |
|---|---|
| 2026-11-11 | 立项建档 + v1.0 首版 5 页开发完成 + GitHub Pages 发布（hadesheng/tyhc-site） |
| 2026-11-11 | 切自有域名 tyhctech.com：仓库 CNAME + Pages 自定义域名；canonical / sitemap / robots 全站改域名；待 DNSPod 解析生效后签发 HTTPS 证书 |
| 2026-11-11 | **v1.1 安全加固**：CSP 收紧、security.txt 双份、.nojekyll、404.html；顺带修复 service.html h4 误闭合导致的七阶布局错乱。已过 headless 截图核验与标签平衡校验 |
| 2026-11-11 | **仓库归属迁移**：GitHub 仓库由 `hadesheng/tyhc-site` 转移到公司账号 `tyhctech/tyhc-site`（Git 历史、Pages 配置、自定义域名 tyhctech.com 均保留，构建状态 built）。www 的 CNAME 目标随之改为 `tyhctech.github.io`。**后续推送需以 tyhctech 账号登录**（脚本 `assets/gh_push_any.py` 已更新为 tyhctech/tyhc-site，支持 GH_TOKEN 环境变量） |
| 2026-11-11 | **DNS 阻塞实录（已解）**：域名注册商 DNSPod, Inc.，注册局 NS 为 CHAIR/RACETRACK.DNSPOD.NET；控制台显示「状态正常 / 域名已正常解析」且 5 条记录齐全，但外部权威（chair / f1g1ns1 / f1g1ns2）全部回 NXDOMAIN（SOA=`nxdomainadmin.dnspod.com`），DNSPod 自带「生效检测」与腾讯 itango 也报失败 → 判定 zone 未加载，非 TTL/本地网络问题。**修复动作：DNSPod 侧重建解析（暂停→启用/重新添加域名）后解析生效**。经验：面板「正常」不等于权威已加载，必须以外部查询对方为准 |
| 2026-11-11 | **生产环境正式可达**：DNSPod 侧 zone 重建后解析生效（`185.199.108.153` / `.109.153`），GitHub Pages DNS check successful，HTTPS 证书签发成功。线上逐项核验：5 页 + style.css + app.js + security.txt 双份 + sitemap + robots 全 200，未知路径返回 404，`www` 301 跳 `https://tyhctech.com/` |
| 2026-11-11 | **品牌口径去个人化**：全站邮箱 `hadeshengai@163.com` → `tyhctech@hotmail.com`、公众号 `HadeshengAI` → `天予恒成`，`security.txt` 双份 Contact 同步（本地已提交 53c349d，待推送到 tyhctech 仓库生效） |
| 2026-11-11 | **v1.2 接入产品矩阵**：新增 `products.html`，数据取自 `04-产品官网/products.json`，只搬对外字段（名称 / 形态 / 描述 / 可售状态），**剔除 margin、strategicFit 与指向内部仓库的 link**；仅纳入「在售 / 可售」12 项，待建与规划的 5 项不上公开页。口径对齐：04 的「AI 岗位 POC（3 万起）」对外沿用 service.html 已公布的「救命包 3 万起」，避免两站同名档位打架。全站导航 + 页脚加「产品矩阵」入口，首页新增产品矩阵速览区块，solution.html 加交叉链接，sitemap 补条目 |
| 2026-11-11 | **导航更名（v1.3）**：全站菜单项改为「运营体系」，覆盖 6 页顶部导航 + 页脚共 12 处链接文字，`solution.html` 页面 title 同步；全库（html/js/yml/md）检索旧词 0 命中；本地起 http 服务 + headless 截图核验渲染无误 |
| 2026-11-11 | **v1.3 已上线**：9 个文件（6 页 + README/PROJECT_CONTEXT/CHANGELOG）经 Contents API 逐文件提交到 `tyhctech/tyhc-site@main`，线上 6 页全部 200、新词每页 2–3 处、旧词 0；`solution.html` title=「运营体系 - AI 控制中心与数字员工治理」；其余资源（style.css / app.js / sitemap / robots / security.txt 双份）全 200，未知路径仍 404 |
| 2026-11-11 | **待办（git 基线分叉）**：远端 `main` 的全部提交由 API 生成，本地仓库还有 6 个未推提交，两侧历史已分叉。**网络恢复后先 `git fetch` 重建基线再决定合并或重置，禁止直接强推覆盖远端**；本次改动本地已另做一次 commit 留痕 |
