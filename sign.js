// scripts.js

document.getElementById('signUp').addEventListener('click', () => {
    document.getElementById('container').classList.add("right-panel-active");
});

document.getElementById('signIn').addEventListener('click', () => {
    document.getElementById('container').classList.remove("right-panel-active");
});

// Sign Up logic
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const Name = document.getElementById('regName').value;
    const Email = document.getElementById('regEmail').value;
    const Password = document.getElementById('regPassword').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name, Email, Password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Registration successful! Please sign in.');
                document.getElementById('container').classList.remove("right-panel-active");
            }
        })
        .catch(err => console.error('Error:', err));
});

// Sign In logic
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const Email = document.getElementById('loginEmail').value;
    const Password = document.getElementById('loginPassword').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email, Password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Login successful!');
                window.location.href = 'tours.html'; // Redirect to home page
            }
        })
        .catch(err => console.error('Error:', err));
});
