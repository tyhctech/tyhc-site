# 变更记录 · 11-天予恒成官网

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2026-11-11 | 首版：5 页静态站（首页 / 关于我们 / 运营体系 / 服务与价格 / 行业案例），内容取自《天予恒成公司简介》PPT 14 页；共享样式 + 移动端导航；robots / sitemap；部署 GitHub Pages |
| v1.0.1 | 2026-11-11 | 切换自有域名 tyhctech.com：新增 CNAME、Pages 自定义域名生效；canonical / sitemap / robots 全站域名替换；等待 DNSPod 解析与 HTTPS 证书签发 |
| v1.1 | 2026-11-11 | 安全加固：CSP 收紧（object/frame/worker/media 全禁 + upgrade-insecure-requests）、security.txt 双份（RFC 9116）、.nojekyll、404 兜底页；修复 service.html 七阶步骤布局错乱（h4 误闭合） |
| v1.2 | 2026-11-11 | **接入产品矩阵**：新增 `products.html`（软件工具 5 项 / 算力与治理 2 项 / 五档服务包），数据源为 04-产品官网 `products.json` 可对外字段，剔除毛利率与战略契合度等内部口径；全站导航 + 页脚加「产品矩阵」入口；首页新增产品矩阵速览区块；solution.html 加交叉链接；sitemap 补条目 |
| v1.3 | 2026-11-11 | **导航更名**：全站菜单项更名为「运营体系」（6 页导航 + 页脚共 12 处链接文字同步），`solution.html` 页面 title 同步；全库检索旧词 0 命中 |
