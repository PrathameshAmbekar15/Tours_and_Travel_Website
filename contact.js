document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("mame").value;
    const password = document.getElementById("email").value;
  
    // Simple validation
    if (username.trim() === '' || password.trim() === '') {
      alert("Please enter both username and password.");
      return;
    }
  
    // Add further validation or authentication logic here
    
    // If validation is successful, you can redirect the user or perform other actions
    alert("Message received successful!");
  });