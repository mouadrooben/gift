// ============================================
// THEME SELECTOR FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const themeModal = document.getElementById('themeModal');
    const themeCards = document.querySelectorAll('.theme-card');
    const themeOverlay = document.querySelector('.theme-modal');
    
    // Load saved theme or show modal
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
        themeModal.classList.add('hidden');
    } else {
        themeModal.classList.remove('hidden');
    }
    
    // Theme card click handlers
    themeCards.forEach(card => {
        card.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('selectedTheme', theme);
            themeModal.classList.add('hidden');
        });
    });
    
    // Close modal when clicking outside (on overlay) but NOT on the content
    if (themeOverlay) {
        themeOverlay.addEventListener('click', function(e) {
            // Only close if clicking on the overlay itself, not the content
            if (e.target === themeOverlay) {
                themeModal.classList.add('hidden');
            }
        });
    }
});

function applyTheme(themeName) {
    // Remove ALL theme classes first
    document.body.classList.remove(
        'theme-dark-red', 
        'theme-red-white', 
        'theme-beige-brown',
        'theme-green-black'
    );
    
    // Add selected theme class (only if not default)
    if (themeName !== 'default') {
        document.body.classList.add('theme-' + themeName);
    }
}

// Optional: Add theme switcher button to navbar
function addThemeSwitcherButton() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.getElementById('themeSwitcherBtn')) {
        const themeBtn = document.createElement('li');
        themeBtn.innerHTML = '<a href="#" id="themeSwitcherBtn" class="nav-link">🎨 Themes</a>';
        navMenu.appendChild(themeBtn);
        
        document.getElementById('themeSwitcherBtn').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('themeModal').classList.remove('hidden');
        });
    }
}

// Call this when page loads
window.addEventListener('load', addThemeSwitcherButton);