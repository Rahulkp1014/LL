document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic (no changes here)
    const loginTabBtn = document.getElementById('login-tab-btn');
    const signupTabBtn = document.getElementById('signup-tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    function switchTab(activeTab, inactiveTab, activeForm, inactiveForm) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        activeForm.classList.add('active');
        inactiveForm.classList.remove('active');
    }
    loginTabBtn.addEventListener('click', () => switchTab(loginTabBtn, signupTabBtn, loginForm, signupForm));
    signupTabBtn.addEventListener('click', () => switchTab(signupTabBtn, loginTabBtn, signupForm, loginForm));

    
    const loginFeedback = document.getElementById('login-feedback');
    const signupFeedback = document.getElementById('signup-feedback');

    // LOGIN FORM
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            action: 'login', // <-- Tell the backend what to do
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        };

        fetch('auth.php', { // <-- Send to the new file
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            loginFeedback.textContent = data.message;
            if (data.success) {
                loginFeedback.classList.add('success');
                setTimeout(() => { window.location.href = 'index.php'; }, 1500);
            } else {
                loginFeedback.classList.remove('success');
            }
        });
    });

    // SIGNUP FORM
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            signupFeedback.textContent = 'Passwords do not match.';
            return;
        }

        const formData = {
            action: 'signup', // <-- Tell the backend what to do
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            password: password
        };

        fetch('auth.php', { // <-- Send to the new file
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            signupFeedback.textContent = data.message;
            if (data.success) {
                signupFeedback.classList.add('success');
                setTimeout(() => { window.location.href = 'index.php'; }, 1500);
            } else {
                signupFeedback.classList.remove('success');
            }
        });
    });
});