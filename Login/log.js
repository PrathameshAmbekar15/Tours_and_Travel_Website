document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Perform your login logic here
    // For demonstration, let's just show an error message
    if (username === 'admin' && password === 'admin') {
      // Login successful, redirect or show success message
      alert('Login successful!');
    } else {
      // Login failed, show error message
      document.getElementById('error-message').innerText = 'Invalid username or password.';
    }
  });
  