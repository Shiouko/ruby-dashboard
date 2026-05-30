/* Ruby Dashboard — Navigation Script */

document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // Check if this is the current page
        if (href === page || 
            (page === '' && href === 'index.html') ||
            (page === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Update last updated timestamp if element exists
    const timestampEl = document.getElementById('last-updated');
    if (timestampEl) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        timestampEl.textContent = now.toLocaleDateString('en-US', options);
    }
});
