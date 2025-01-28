document.addEventListener('DOMContentLoaded', function() {

    // **Signup Form Handling**
    document.getElementById('signup-form-elem')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Retrieve all users from localStorage, or initialize as an empty array if no users are stored
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists in the users array
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('User already exists. Please login.');
            window.location.href = 'register.html'; // Redirect to login page
            return;
        }

        // If no existing user, save the new user data to the users array
        const newUser = { email, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Sign up successful! Please log in.');
        window.location.href = 'register.html'; // Redirect to login after successful sign up
    });

    // **Login Form Handling**
    document.getElementById('login-form-elem')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Retrieve all users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user in the array
        const storedUser = users.find(user => user.email === email && user.password === password);

        if (storedUser) {
            // Successful login, set the logged-in flag and redirect to the profile page
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', email);
            window.location.href = 'user_profile.html'; // Redirect to the profile page after login
        } else {
            alert('Invalid email or password');
        }
    });

    // **Toggle between Signup and Login Forms**
    document.getElementById('show-signup')?.addEventListener('click', function() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
    });

    document.getElementById('show-login')?.addEventListener('click', function() {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });

    // **Display User Profile on Profile Page**
    if (window.location.pathname.includes('user_profile.html')) {
        const loggedIn = localStorage.getItem('loggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (!loggedIn || !currentUser) {
            // If user is not logged in, redirect to login page
            window.location.href = 'register.html';
        }

        // Retrieve all users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user in the array
        const storedUser = users.find(user => user.email === currentUser);

        // Display the user's details on the profile page
        if (storedUser) {
            document.getElementById('username').textContent = `Username: ${storedUser.username}`;
            document.getElementById('email').textContent = `Email: ${storedUser.email}`;
        }
    }

});
