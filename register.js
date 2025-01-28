document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-form-elem')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('User already exists. Please login.');
            window.location.href = 'register.html'; 
            return;
        }

        const newUser = { email, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Sign up successful! Please log in.');
        window.location.href = 'register.html'; 
    });

    document.getElementById('login-form-elem')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const storedUser = users.find(user => user.email === email && user.password === password);

        if (storedUser) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', email);
            window.location.href = 'user-profile.html'; 
        } else {
            alert('Invalid email or password');
        }
    });

    document.getElementById('show-signup')?.addEventListener('click', function() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
    });

    document.getElementById('show-login')?.addEventListener('click', function() {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
    if (window.location.pathname.includes('user-profile.html')) {
        const loggedIn = localStorage.getItem('loggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (!loggedIn || !currentUser) {
            window.location.href = 'register.html';
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const storedUser = users.find(user => user.email === currentUser);

        if (storedUser) {
            document.getElementById('username').textContent = `Username: ${storedUser.username}`;
            document.getElementById('email').textContent = `Email: ${storedUser.email}`;
        }
    }

});
