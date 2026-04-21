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

// Check if already authenticated
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        window.location.href = 'index.html';
    }
});