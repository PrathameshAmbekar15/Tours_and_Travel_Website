document.querySelector('.right-side form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = this.querySelector('input[name="name"]').value;
  const email = this.querySelector('input[name="email"]').value;
  const message = this.querySelector('input[name="message"]').value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Message sent successfully!");
        this.reset();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while sending the message.");
    });
});