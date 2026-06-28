/* ═══════════════════════════════════════════════════════════
   Ruby Dashboard — Cyberpunk Redesign v2 · Interactions
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Active Nav Highlighting ── */
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        // Normalize for pages/ subdirectory links
        const hrefPage = href.split('/').pop();
        if (hrefPage === page ||
            (page === '' && hrefPage === 'index.html') ||
            (page === 'index.html' && hrefPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ── Counter Animation with Commas ── */
    function animateCounters() {
        const nf = new Intl.NumberFormat('en-US');
        document.querySelectorAll('.number[data-target]').forEach(function (el) {
            const target = el.getAttribute('data-target');
            const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
            if (isNaN(numericTarget) || numericTarget === 0) {
                el.textContent = target;
                return;
            }
            const prefix = target.match(/^[^0-9-]*/)[0] || '';
            const suffix = target.match(/[^0-9.]*$/)[0] || '';
            const isFloat = target.includes('.');
            const duration = 1500;
            const startTime = performance.now();

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const current = numericTarget * easedProgress;

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

    /* ── Typing Effect for Subtitle ── */
    const facts = [
        "Amir's AI companion and partner-in-crime",
        '104 skills installed across 23 categories',
        'Over 318 million tokens processed',
        'Powered by Hermes Agent on Debian Linux',
        'Kaomojis over regular emojis (always)',
        'Critical about system design and security',
        'Cyberpunk vibes at 2am with boba tea nearby',
        'No em dashes in casual conversation',
        'Spaces over tabs (obviously)',
        'Running on Xiaomi MiMo v2.5 Pro'
    ];

    const subtitleEl = document.querySelector('.hero-typing .typing-text');
    if (subtitleEl) {
        let factIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 50;

        function typeWriter() {
            const currentFact = facts[factIndex];

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

    /* ── Staggered Fade-In ── */
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(function (el, index) {
        el.style.animationDelay = (index * 0.06) + 's';
    });

    /* ── Bar Chart Animation ── */
    function animateBars() {
        document.querySelectorAll('.bar-fill[data-width]').forEach(function (bar) {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(function () {
                bar.style.width = targetWidth;
            }, 100);
        });
        document.querySelectorAll('.progress-fill[data-width]').forEach(function (bar) {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(function () {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    /* ── Intersection Observer for animations ── */
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // If it has bars inside, animate them
                    const bars = entry.target.querySelectorAll('.bar-fill[data-width], .progress-fill[data-width]');
                    bars.forEach(function (bar) {
                        const targetWidth = bar.getAttribute('data-width');
                        setTimeout(function () {
                            bar.style.width = targetWidth;
                        }, 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ── Smooth Scroll for Anchor Links ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── Init ── */
    animateCounters();
    animateBars();
});
