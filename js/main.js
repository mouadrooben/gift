// ============================================
// MAIN SITE FUNCTIONALITY
// ============================================

// Check Authentication
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'login.html';
    }
});

// ============================================
// NAVIGATION
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('authenticated');
    window.location.href = 'login.html';
});

// ============================================
// CATEGORY NAVIGATION (NEW)
// ============================================

const categoryCards = document.querySelectorAll('.category-card');
const categorySections = document.querySelectorAll('.category-section');

categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        showCategory(category);
    });
});

function showCategory(categoryName) {
    // Hide all sections
    categorySections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(categoryName);
    if (selectedSection) {
        selectedSection.classList.add('active');
        selectedSection.classList.remove('hidden');
        
        // Scroll to section smoothly
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show first category by default
window.addEventListener('load', function() {
    showCategory('letters');
});

// ============================================
// LETTERS FUNCTIONALITY
// ============================================

const letterContent = {
    happy: {
        title: 'When You\'re Happy 😊',
        message: 'You light up the world with your smile! Keep this feeling close to your heart. You deserve all the happiness in the world. Cherish these moments, because they\'re what make life beautiful. 💚'
    },
    sad: {
        title: 'When You\'re Sad 💙',
        message: 'It\'s okay to feel down sometimes. Your feelings are valid and beautiful. Remember: you\'re stronger than you think, and this moment won\'t last forever. I\'m here for you, always. Even in the darkness, there\'s always a light waiting for you. 🌙'
    },
    miss: {
        title: 'When You Miss Me 🌙',
        message: 'No matter the distance, you\'re always in my heart. Every moment we share lives forever in my memory. Think of me, and know that I\'m thinking of you too. Distance is just a number; our connection is infinite. 💚✨'
    }
};

document.querySelectorAll('.letter-card').forEach(card => {
    card.addEventListener('click', function() {
        const letterType = this.getAttribute('data-letter');
        const content = letterContent[letterType];
        
        showLetterModal(content.title, content.message);
    });
});

function showLetterModal(title, message) {
    const modal = document.getElementById('messageModal');
    document.getElementById('modalTitle').textContent = title;
    
    // Clear previous animation
    const msgElement = document.getElementById('modalMessage');
    msgElement.textContent = '';
    msgElement.classList.remove('typing-animation');
    
    // Trigger animation
    setTimeout(() => {
        msgElement.textContent = message;
        msgElement.classList.add('typing-animation');
    }, 10);
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('messageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
});

document.getElementById('messageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// OPEN WHEN FUNCTIONALITY
// ============================================

const openWhenMessages = {
    'cant-sleep': {
        title: '✨ You Can\'t Sleep',
        message: 'Count the stars instead of sheep. Each one is a wish waiting to come true. Rest your mind, let your heart be light. Sleep will come when you need it most. Sweet dreams are coming your way. 🌟'
    },
    'overthinking': {
        title: '🧠 You\'re Overthinking',
        message: 'Your mind is beautiful but sometimes it needs to rest. Not every thought needs to be solved. Sometimes the best answer is to simply breathe and let it go. You\'re doing better than you think. 🍃'
    },
    'need-smile': {
        title: '😊 You Need to Smile',
        message: 'Your smile is precious and rare. Remember the last time you laughed genuinely? That person you love wants to see you smile again. Life is too short not to find joy in the little things. Smile for yourself, not for anyone else. 💚'
    },
    'lonely': {
        title: '🤍 You Feel Lonely',
        message: 'You\'re never truly alone. I\'m here, thinking about you, caring about you. Loneliness is temporary, but your worth is eternal. Reach out, connect, share your feelings. The world needs your light. 💫'
    },
    'stressed': {
        title: '🌿 You\'re Stressed',
        message: 'Breathe in slowly... and out slowly. Everything that feels urgent right now will pass. You\'ve overcome every challenge before this one. Take a moment for yourself. You deserve to rest. The world can wait. 🌲'
    },
    'celebrate': {
        title: '🎉 You Want to Celebrate',
        message: 'YES! You did it! Every small victory is worth celebrating. Be proud of yourself, because I\'m incredibly proud of you. You\'re becoming the person you\'ve always wanted to be. Let\'s celebrate YOU! 🎊💚'
    }
};

document.querySelectorAll('.open-when-card').forEach(card => {
    card.addEventListener('click', function() {
        const msgKey = this.getAttribute('data-message');
        const content = openWhenMessages[msgKey];
        
        showMessageModal(content.title, content.message);
    });
});

function showMessageModal(title, message) {
    const modal = document.getElementById('messageModal');
    document.getElementById('modalTitle').textContent = title;
    
    // Clear previous animation
    const msgElement = document.getElementById('modalMessage');
    msgElement.textContent = '';
    msgElement.classList.remove('typing-animation');
    
    // Trigger animation
    setTimeout(() => {
        msgElement.textContent = message;
        msgElement.classList.add('typing-animation');
    }, 10);
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// ============================================
// SECRET BUTTON & POPUP (UPDATED)
// ============================================

const secretBtn = document.getElementById('secretBtn');
const secretPopup = document.getElementById('secretPopup');
const popupClose = document.querySelector('.popup-close');
const popupOverlay = document.querySelector('.popup-overlay');
const revealBtn = document.getElementById('revealBtn');
const surpriseContent = document.getElementById('surpriseContent');

secretBtn.addEventListener('click', function() {
    secretPopup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

popupClose.addEventListener('click', function() {
    secretPopup.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Reset surprise content for next time
    setTimeout(() => {
        surpriseContent.classList.add('hidden');
        revealBtn.style.display = 'block';
    }, 300);
});

popupOverlay.addEventListener('click', function() {
    secretPopup.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Reset surprise content for next time
    setTimeout(() => {
        surpriseContent.classList.add('hidden');
        revealBtn.style.display = 'block';
    }, 300);
});

// Reveal surprise button
revealBtn.addEventListener('click', function() {
    surpriseContent.classList.remove('hidden');
    revealBtn.style.display = 'none';
});

// ============================================
// BACKGROUND MUSIC
// ============================================

const bgMusicToggle = document.getElementById('bgMusicToggle');
const bgMusic = document.getElementById('bgMusic');

bgMusicToggle.addEventListener('change', function() {
    if (this.checked) {
        bgMusic.volume = 0.1;
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInSection 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ============================================
// DRAWING CARDS ANIMATION
// ============================================

const drawingCards = document.querySelectorAll('.drawing-card');

drawingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});