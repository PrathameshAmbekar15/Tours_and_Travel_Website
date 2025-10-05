document.getElementById('login-form').addEventListener('submit', function(event) {
  // event.preventDefault();
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();

  // Basic validation
  if (!username || !password) {
      alert('Please fill in both fields.');
  } else {
      // If validation passes, log the values and submit the form
      console.log('Username:', username);
      console.log('Password:', password);

      // You can submit the form programmatically
      this.submit();
  }
});
