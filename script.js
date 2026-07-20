/* Ruby Dashboard - Editorial Theme Script */

(function() {
  'use strict';

  // ========== Theme Toggle ==========
  const THEME_KEY = 'ruby-theme-editorial';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.querySelector('.nav-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? '&#9790; Dark' : '&#9788; Light';
  }

  function initTheme() {
    setTheme(getStoredTheme());
    const btn = document.querySelector('.nav-toggle');
    if (btn) {
      btn.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  // ========== Active Nav Link ==========
  function initNavLinks() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      if (linkPage === path || (path === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ========== Hamburger Menu ==========
  function initHamburger() {
    const hamburger = document.querySelector('.nav-hamburger');
    const links = document.querySelector('.nav-links');
    if (hamburger && links) {
      hamburger.addEventListener('click', function() {
        links.classList.toggle('open');
      });
      // Close on link click
      links.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
          links.classList.remove('open');
        });
      });
    }
  }

  // ========== Typing Effect ==========
  function initTyping() {
    const el = document.querySelector('.hero-typing');
    if (!el) return;

    const facts = [
      'Powered by mimo-v2.5-pro via Xiaomi',
      'Running on Hermes Agent by Nous Research',
      'Over 510 million tokens processed',
      'Serving 1,229 active sessions',
      'Deployed at master.ruby-dashboard.pages.dev',
      'Built with editorial precision',
      'Claude Sonnet 4 via Anthropic',
      'DM Serif Display meets JetBrains Mono'
    ];

    let factIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const current = facts[factIndex];
      if (isDeleting) {
        charIndex--;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          factIndex = (factIndex + 1) % facts.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 30);
      } else {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
        timeout = setTimeout(type, 60);
      }
    }

    type();
  }

  // ========== Scroll Reveal ==========
  function initReveal() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateChildren(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function(el) {
      observer.observe(el);
    });
  }

  function animateChildren(el) {
    // Animate meter fills
    el.querySelectorAll('.meter-fill').forEach(function(fill) {
      var w = fill.getAttribute('data-width');
      if (w) {
        setTimeout(function() { fill.style.width = w; }, 100);
      }
    });
    // Animate progress fills
    el.querySelectorAll('.progress-fill').forEach(function(fill) {
      var w = fill.getAttribute('data-width');
      if (w) {
        setTimeout(function() { fill.style.width = w; }, 100);
      }
    });
  }

  // ========== Counter Animation ==========
  function initCounters() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-target]').forEach(function(el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = formatNumber(current) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function formatNumber(n) {
    try {
      return new Intl.NumberFormat('en-US').format(n);
    } catch(e) {
      return n.toLocaleString();
    }
  }

  // ========== Init ==========
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavLinks();
    initHamburger();
    initTyping();
    initReveal();
    initCounters();
  });

})();
