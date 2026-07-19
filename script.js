/* ═══════════════════════════════════════════════════════════
   Ruby Dashboard v2 — Edge Design · Theme Toggle · Animations
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Active Nav Highlighting ── */
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(function (link) {
        var href = link.getAttribute('href');
        var hrefPage = href.split('/').pop();
        if (hrefPage === page ||
            (page === '' && hrefPage === 'index.html') ||
            (page === 'index.html' && hrefPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ── Theme Toggle ── */
    var toggle = document.getElementById('themeToggle');
    var sunIcon = document.getElementById('themeSun');
    var moonIcon = document.getElementById('themeMoon');

    // Load saved theme
    var savedTheme = localStorage.getItem('ruby-dashboard-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('ruby-dashboard-theme', next);
            updateThemeUI(next);
        });
    }

    function updateThemeUI(theme) {
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.classList.remove('active');
                moonIcon.classList.add('active');
            } else {
                moonIcon.classList.remove('active');
                sunIcon.classList.add('active');
            }
        }
    }

    /* ── Counter Animation ── */
    function animateCounters() {
        var nf = new Intl.NumberFormat('en-US');
        document.querySelectorAll('.stat-value[data-target]').forEach(function (el) {
            var target = el.getAttribute('data-target');
            var numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
            if (isNaN(numericTarget) || numericTarget === 0) {
                el.textContent = target;
                return;
            }
            var prefix = target.match(/^[^0-9-]*/)[0] || '';
            var suffix = target.match(/[^0-9.]*$/)[0] || '';
            var isFloat = target.includes('.');
            var duration = 1200;
            var startTime = performance.now();

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function update(currentTime) {
                var elapsed = currentTime - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var easedProgress = easeOutCubic(progress);
                var current = numericTarget * easedProgress;
                if (isFloat) {
                    el.textContent = prefix + current.toFixed(1) + suffix;
                } else {
                    el.textContent = prefix + nf.format(Math.floor(current)) + suffix;
                }
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = prefix + nf.format(numericTarget) + suffix;
                }
            }

            requestAnimationFrame(update);
        });
    }

    /* ── Typing Effect ── */
    var facts = [
        "Amir's AI companion and partner-in-crime",
        '104 skills installed across 23 categories',
        'Over 478 million tokens processed',
        'Powered by Hermes Agent deepseek-v4-flash',
        'Kaomojis over regular emojis (always)',
        'Critical about system design and security',
        'Spaces over tabs (obviously)',
        'Sharp angles, no rounded corners, all personality'
    ];

    var subtitleEl = document.querySelector('.typing-text');
    if (subtitleEl) {
        var factIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingDelay = 50;

        function typeWriter() {
            var currentFact = facts[factIndex];
            if (isDeleting) {
                subtitleEl.textContent = currentFact.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 25;
            } else {
                subtitleEl.textContent = currentFact.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 50;
            }
            if (!isDeleting && charIndex === currentFact.length) {
                typingDelay = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                factIndex = (factIndex + 1) % facts.length;
                typingDelay = 300;
            }
            setTimeout(typeWriter, typingDelay);
        }

        typeWriter();
    }

    /* ── IntersectionObserver for fade-in ── */
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animate bars inside
                    var bars = entry.target.querySelectorAll('.bar-fill[data-width]');
                    bars.forEach(function (bar) {
                        var targetWidth = bar.getAttribute('data-width');
                        setTimeout(function () {
                            bar.style.width = targetWidth;
                        }, 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ── Counter observer ── */
    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var nums = entry.target.querySelectorAll('.stat-value[data-target]');
                    nums.forEach(function (el) {
                        var target = el.getAttribute('data-target');
                        var numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
                        if (!isNaN(numericTarget) && numericTarget > 0) {
                            var nf = new Intl.NumberFormat('en-US');
                            var prefix = target.match(/^[^0-9-]*/)[0] || '';
                            var suffix = target.match(/[^0-9.]*$/)[0] || '';
                            var isFloat = target.includes('.');
                            var duration = 1200;
                            var startTime = performance.now();

                            function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

                            function tick(now) {
                                var p = Math.min((now - startTime) / duration, 1);
                                var v = numericTarget * easeOut(p);
                                el.textContent = prefix + (isFloat ? v.toFixed(1) : nf.format(Math.floor(v))) + suffix;
                                if (p < 1) requestAnimationFrame(tick);
                                else el.textContent = prefix + nf.format(numericTarget) + suffix;
                            }

                            requestAnimationFrame(tick);
                        }
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.stat-grid').forEach(function (row) {
            counterObserver.observe(row);
        });
    }
});
