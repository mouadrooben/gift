// Authentication Logic
const correctPassword = 'eve the moon';

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('passwordInput').value.toLowerCase();
    const errorMsg = document.getElementById('errorMsg');
    
    if (passwordInput === correctPassword) {
        // Correct password
        sessionStorage.setItem('authenticated', 'true');
        errorMsg.textContent = '✨ Welcome...';
        errorMsg.style.color = '#4caf50';
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        // Wrong password
        errorMsg.textContent = '❌ That\'s not the password... try again 💭';
        errorMsg.style.color = '#d32f2f';
        document.getElementById('passwordInput').value = '';
    }
});

// Check if already authenticated + hint popup
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    const hintPopup = document.getElementById('hintPopup');
    const hintCornerBtn = document.getElementById('hintCornerBtn');
    const hintPopupClose = document.getElementById('hintPopupClose');
    const hintPopupBackdrop = document.getElementById('hintPopupBackdrop');

    function openHintPopup() {
        if (!hintPopup) return;
        hintPopup.classList.remove('hidden');
        hintPopup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        hintPopupClose.focus();
    }

    function closeHintPopup() {
        if (!hintPopup) return;
        hintPopup.classList.add('hidden');
        hintPopup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (hintCornerBtn) hintCornerBtn.focus();
    }

    if (hintCornerBtn) hintCornerBtn.addEventListener('click', openHintPopup);
    if (hintPopupClose) hintPopupClose.addEventListener('click', closeHintPopup);
    if (hintPopupBackdrop) hintPopupBackdrop.addEventListener('click', closeHintPopup);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hintPopup && !hintPopup.classList.contains('hidden')) {
            closeHintPopup();
        }
    });
});