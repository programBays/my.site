(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ссылки из config.js ---------- */
  function applyLinks() {
    var links = (window.SITE_CONFIG && window.SITE_CONFIG.links) || {};
    document.querySelectorAll('[data-link]').forEach(function (a) {
      var href = links[a.dataset.link];
      if (!href) return;
      a.href = href;
      if (/^https?:/.test(href)) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  }

  /* ---------- Медуза ---------- */
  function el(style, children) {
    var d = document.createElement('div');
    d.setAttribute('style', style);
    (children || []).forEach(function (c) { d.appendChild(c); });
    return d;
  }

  function buildJelly(root) {
    var kids = [];

    kids.push(el('left:-160px;top:-110px;width:840px;height:700px;border-radius:50%;' +
      'background:radial-gradient(closest-side,rgba(255,59,31,0.34),rgba(179,20,10,0.14) 55%,rgba(179,20,10,0) 100%);' +
      'animation:jf-pulse 8s ease-in-out infinite'));

    // Тонкие щупальца: [x, ширина, длина, сторона, длительность, задержка, прозрачность]
    var tentacles = [
      [128, 30, 640, 'l', 6.5, -1, 0.8], [156, 22, 840, 'r', 7.2, -3, 0.65], [186, 42, 560, 'l', 5.8, -2, 0.9],
      [214, 18, 920, 'r', 8, -5, 0.6], [246, 34, 720, 'l', 6.8, -4, 0.85], [272, 24, 780, 'r', 7.6, -1.5, 0.7],
      [300, 40, 620, 'r', 6.2, -2.5, 0.8], [330, 26, 880, 'l', 7.9, -3.5, 0.6], [356, 32, 680, 'r', 6.6, -0.5, 0.75],
      [382, 20, 540, 'l', 5.6, -2.2, 0.7], [142, 16, 480, 'r', 5.2, -1.2, 0.5], [404, 14, 600, 'r', 6, -3.1, 0.5],
      [228, 12, 1000, 'l', 9, -6, 0.45], [318, 14, 960, 'r', 8.4, -4.4, 0.45]
    ];
    var mask = 'linear-gradient(180deg,#000 0%,rgba(0,0,0,0.7) 35%,rgba(0,0,0,0) 100%)';
    tentacles.forEach(function (t) {
      var border = '2px solid rgba(255,120,92,' + t[6] + ')';
      var line = el('position:relative;width:100%;height:100%;border-radius:50%;' +
        (t[3] === 'l' ? 'border-left:' + border + ';' : 'border-right:' + border + ';') +
        'filter:drop-shadow(0 0 4px rgba(255,59,31,0.9));-webkit-mask-image:' + mask + ';mask-image:' + mask);
      kids.push(el('left:' + (t[0] - t[1] / 2) + 'px;top:318px;width:' + t[1] + 'px;height:' + t[2] + 'px;' +
        'transform-origin:50% 0;animation:jf-sway ' + t[4] + 's ease-in-out ' + t[5] + 's infinite alternate', [line]));
    });

    // Ротовые лопасти
    [[208, 34, 560, 7, -2], [258, 48, 660, 8, -4], [306, 30, 600, 6.5, -1], [236, 22, 740, 7.5, -3], [282, 20, 700, 6.9, -5]]
      .forEach(function (a) {
        kids.push(el('left:' + (a[0] - a[1] / 2) + 'px;top:300px;width:' + a[1] + 'px;height:' + a[2] + 'px;' +
          'transform-origin:50% 0;animation:jf-sway ' + a[3] + 's ease-in-out ' + a[4] + 's infinite alternate', [
          el('inset:0;border-radius:45% 45% 50% 50% / 6% 6% 94% 94%;' +
            'background:linear-gradient(180deg,rgba(255,120,90,0.85),rgba(255,59,31,0.5) 22%,rgba(179,20,10,0.22) 58%,rgba(179,20,10,0) 100%);filter:blur(6px)'),
          el('left:50%;top:0;width:2px;margin-left:-1px;height:75%;' +
            'background:linear-gradient(180deg,rgba(255,200,180,0.9),rgba(255,90,61,0.4) 50%,rgba(255,59,31,0));filter:blur(0.6px)')
        ]));
      });

    // Купол
    var bellMask = 'linear-gradient(180deg,#000 55%,rgba(0,0,0,0.35) 100%)';
    kids.push(el('left:80px;top:100px;width:360px;height:260px;transform-origin:50% 100%;animation:jf-bell 8s ease-in-out infinite', [
      el('inset:0;border-radius:50% 50% 50% 50% / 74% 74% 26% 26%;' +
        'background:radial-gradient(ellipse 62% 64% at 50% 34%,rgba(255,226,210,0.92) 0%,rgba(255,120,90,0.72) 15%,rgba(255,59,31,0.5) 36%,rgba(179,20,10,0.3) 62%,rgba(120,8,3,0.12) 86%,rgba(120,8,3,0.04) 100%);' +
        'border-top:1px solid rgba(255,190,170,0.35);' +
        'box-shadow:0 0 70px rgba(255,59,31,0.4),0 0 200px rgba(255,59,31,0.28),inset 0 10px 40px rgba(255,200,180,0.22);' +
        '-webkit-mask-image:' + bellMask + ';mask-image:' + bellMask),
      el('left:70px;top:34px;width:220px;height:140px;border-radius:50%;border:1px solid rgba(255,225,210,0.35);filter:blur(0.5px)'),
      el('left:110px;top:60px;width:140px;height:90px;border-radius:50%;border:1px solid rgba(255,225,210,0.22)'),
      el('left:84px;top:26px;width:120px;height:54px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,0.55),rgba(255,255,255,0));filter:blur(6px)'),
      el('left:-14px;top:196px;width:388px;height:74px;border-radius:50%;border-bottom:2px solid rgba(255,150,120,0.6);filter:blur(1px);box-shadow:0 14px 30px -10px rgba(255,59,31,0.55)')
    ]));

    var body = document.createElement('div');
    body.className = 'jelly__body';
    kids.forEach(function (k) { body.appendChild(k); });
    var scale = document.createElement('div');
    scale.className = 'jelly__scale';
    scale.appendChild(body);
    root.appendChild(scale);
  }

  /* ---------- Меню ---------- */
  function initMenu() {
    var burger = document.querySelector('.burger');
    var menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    }
    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- Активный пункт меню при скролле ---------- */
  function initActiveNav() {
    if (!('IntersectionObserver' in window)) return;
    var links = document.querySelectorAll('.menu a, .mobile-menu a:not(.btn)');
    var ids = ['about', 'work', 'tariffs', 'reviews', 'faq'];
    var visible = {};

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = 'top';
      ids.forEach(function (id) { if (visible[id]) current = id; });
      setActive(current);
    }, { rootMargin: '-45% 0px -50% 0px' });

    ids.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------- Метки в hero: ТРЕВОГА / ОТНОШЕНИЯ / КРИЗИСЫ ---------- */
  function initTags() {
    var wrap = document.querySelector('[data-tags]');
    if (!wrap || reduceMotion) return;
    var tags = wrap.querySelectorAll('span');
    var i = 0;
    setInterval(function () {
      i = (i + 1) % tags.length;
      tags.forEach(function (t, j) { t.classList.toggle('is-active', j === i); });
    }, 2800);
  }

  /* ---------- Count-up ---------- */
  function countUp(node) {
    var finalText = node.textContent;
    var target = parseInt(node.dataset.count, 10);
    var suffix = node.dataset.suffix || '';
    var start = performance.now();
    var dur = 1400;
    function step(t) {
      var p = Math.min(1, (t - start) / dur);
      var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      node.textContent = p < 1 ? v.toLocaleString('ru-RU') + suffix : finalText;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Появление блоков при скролле ---------- */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var vh = window.innerHeight;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var node = e.target;
        io.unobserve(node);
        if (node.dataset.count) countUp(node);
        else node.classList.remove('is-hidden');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(function (node) {
      if (node.getBoundingClientRect().top < vh * 0.92) return;
      node.style.setProperty('--d', (parseInt(node.dataset.reveal, 10) || 0) * 80 + 'ms');
      node.classList.add('is-hidden');
      io.observe(node);
    });
    document.querySelectorAll('[data-count]').forEach(function (node) { io.observe(node); });
  }

  /* ---------- FAQ: открыт только один пункт ---------- */
  function initFaq() {
    var list = document.querySelector('[data-faq]');
    if (!list) return;
    var buttons = list.querySelectorAll('.faq__q');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wasOpen = btn.getAttribute('aria-expanded') === 'true';
        buttons.forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          document.getElementById(b.getAttribute('aria-controls')).hidden = true;
        });
        if (!wasOpen) {
          btn.setAttribute('aria-expanded', 'true');
          document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
        }
      });
    });
  }

  /* ---------- Слайдер отзывов ---------- */
  function initReviews() {
    var track = document.querySelector('[data-reviews-track]');
    if (!track) return;
    document.querySelectorAll('[data-reviews]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = btn.dataset.reviews === 'next' ? 1 : -1;
        track.scrollBy({ left: dir * 416, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Параллакс медузы + липкая кнопка ---------- */
  function initScroll() {
    var heroJelly = document.querySelector('.jelly--hero');
    var sticky = document.querySelector('[data-sticky-cta]');
    var raf = null;

    function update() {
      raf = null;
      var y = window.scrollY || 0;
      if (heroJelly && !reduceMotion) heroJelly.style.translate = '0 ' + Math.round(y * 0.15) + 'px';
      if (sticky) sticky.classList.toggle('is-visible', y > window.innerHeight * 0.85);
    }
    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function init() {
    applyLinks();
    document.querySelectorAll('[data-jelly]').forEach(buildJelly);
    initMenu();
    initActiveNav();
    initTags();
    initFaq();
    initReviews();
    initScroll();
    setTimeout(initReveal, 80);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
