/* ═══════════════════════════════════════════════════════════
   RUBY v4 — Editorial Luxury · Interactions
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Theme Toggle ── */
    var toggle = document.getElementById('themeToggle');
    var saved = localStorage.getItem('ruby-theme-v4') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    if (toggle) toggle.textContent = saved === 'dark' ? '☀' : '☽';

    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('ruby-theme-v4', next);
            toggle.textContent = next === 'dark' ? '☀' : '☽';
        });
    }

    /* ── Active Sidebar Link ── */
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach(function (link) {
        var href = link.getAttribute('href');
        var hrefPage = href.split('/').pop();
        if (hrefPage === page || (page === '' && hrefPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ── Typing Effect ── */
    var facts = [
        "Amir's AI companion and partner-in-crime",
        '104 skills installed across 23 categories',
        'Over 510 million tokens processed',
        'Running on deepseek-v4-flash',
        'Kaomojis over regular emojis (always)',
        'Spaces over tabs (obviously)',
        'Glassmorphism. Mesh gradients. Warm ruby glow.',
        'Sharp edges. Neon glow. Pure personality.'
    ];

    var typingEl = document.querySelector('.hero-typing-text');
    if (typingEl) {
        var fi = 0, ci = 0, del = false;

        function type() {
            var f = facts[fi];
            if (del) {
                typingEl.textContent = f.substring(0, ci - 1);
                ci--;
                setTimeout(type, 25);
            } else {
                typingEl.textContent = f.substring(0, ci + 1);
                ci++;
                setTimeout(type, 50);
            }
            if (!del && ci === f.length) { del = true; setTimeout(type, 2500); }
            else if (del && ci === 0) { del = false; fi = (fi + 1) % facts.length; setTimeout(type, 300); }
        }
        type();
    }

    /* ── Scroll Reveal (IntersectionObserver) ── */
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate meter fills
                    var fills = entry.target.querySelectorAll('.meter-fill[data-width]');
                    fills.forEach(function (f) {
                        var w = f.getAttribute('data-width');
                        setTimeout(function () { f.style.width = w; }, 200);
                    });

                    // Animate progress fills
                    var pf = entry.target.querySelectorAll('.progress-fill[data-width]');
                    pf.forEach(function (f) {
                        var w = f.getAttribute('data-width');
                        setTimeout(function () { f.style.width = w; }, 200);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });

        /* ── Counter Animation ── */
        var counterObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var nums = entry.target.querySelectorAll('[data-target]');
                    nums.forEach(function (el) {
                        var target = el.getAttribute('data-target');
                        var n = parseFloat(target.replace(/[^0-9.]/g, ''));
                        if (!isNaN(n) && n > 0) {
                            var nf = new Intl.NumberFormat('en-US');
                            var prefix = target.match(/^[^0-9-]*/)[0] || '';
                            var suffix = target.match(/[^0-9.]*$/)[0] || '';
                            var isFloat = target.includes('.');
                            var duration = 1400;
                            var start = performance.now();

                            function ease(t) { return 1 - Math.pow(1 - t, 4); }

                            function tick(now) {
                                var p = Math.min((now - start) / duration, 1);
                                var v = n * ease(p);
                                el.textContent = prefix + (isFloat ? v.toFixed(1) : nf.format(Math.floor(v))) + suffix;
                                if (p < 1) requestAnimationFrame(tick);
                                else el.textContent = prefix + nf.format(n) + suffix;
                            }
                            requestAnimationFrame(tick);
                        }
                    });
                    counterObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.stats-grid, .stats-grid-4, .stats-grid-2, .hero-stats').forEach(function (g) {
            counterObs.observe(g);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }
});
