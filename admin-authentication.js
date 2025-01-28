document.getElementById('login-form-elem')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const adminCredentials = {
        email: 'admin@bitsmart.com',
        password: 'admin123'
    };

 
    if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('currentAdmin', email);
        alert('Login successful!');
        window.location.href = 'admin-dashboard.html'; 
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('signup-form-elem')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const existingAdmin = JSON.parse(localStorage.getItem('adminCredentials'));

    if (existingAdmin) {
        alert('Admin account already exists. Please log in.');
        window.location.href = 'admin-login.html'; 
        return;
    }

    const newAdmin = { email, username, password };
    localStorage.setItem('adminCredentials', JSON.stringify(newAdmin));

    alert('Sign up successful! Please log in.');
    window.location.href = 'admin-login.html'; 
});

document.getElementById('show-signup')?.addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login')?.addEventListener('click', function() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// getting users details 
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing data

    users.forEach((user, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>
                <button onclick="deleteUser(${index})" class="delete">Delete</button>
            </td>
        `;
    });
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1); 
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers(); 
}


document.getElementById('add-feature').addEventListener('click', function() {
    const newFeature = document.getElementById('new-feature').value.trim();
    if (!newFeature) return alert('Please enter a feature name.');

    const dashboardFeatures = JSON.parse(localStorage.getItem('dashboardFeatures')) || [];
    dashboardFeatures.push(newFeature);
    localStorage.setItem('dashboardFeatures', JSON.stringify(dashboardFeatures));
    alert('Feature added successfully!');
});
loadUsers();