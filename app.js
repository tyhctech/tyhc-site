// 天予恒成官网 · 轻量交互（无第三方依赖）
(function () {
  // 防点击劫持：GitHub Pages 无法下发 X-Frame-Options / frame-ancestors，这里做兜底
  if (window.self !== window.top) {
    try { window.top.location.href = window.self.location.href; }
    catch (e) { document.documentElement.style.display = 'none'; }
    return;
  }

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }
})();
