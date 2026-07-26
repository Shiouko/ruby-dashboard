/* ═══════════════════════════════════════
   RUBY DASHBOARD — SHARED JS
   ═══════════════════════════════════════ */

// Clock
function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}
updateClock();
setInterval(updateClock, 1000);

// Greeting
(function () {
    const el = document.querySelector('.topbar-greeting');
    if (!el) return;
    const h = new Date().getHours();
    const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    el.textContent = g + ', Amir \u2666';
})();

// Active nav highlight
(function () {
    const links = document.querySelectorAll('.sidebar-nav a[data-page]');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const isActive = (page === 'index' && (current === 'index.html' || current === '')) ||
                         (page !== 'index' && current.includes(page));
        if (isActive) link.classList.add('active');
    });
})();

// Avatar fallback
(function () {
    const img = document.querySelector('.sidebar-avatar img');
    const fallback = document.querySelector('.sidebar-avatar .avatar-fallback');
    if (!img || !fallback) return;
    img.addEventListener('error', () => {
        img.style.display = 'none';
        fallback.style.display = 'flex';
    });
})();
