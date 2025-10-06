// document.getElementById('booking-form').addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     // Get form values
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const destination = document.getElementById('destination').value;
//     const date = document.getElementById('date').value;
  
//     // Display confirmation message
//     const confirmation = document.getElementById('confirmation');
//     confirmation.innerHTML = `
//       <h2>Booking Confirmation</h2>
//       <p>Name: ${name}</p>
//       <p>Email: ${email}</p>
//       <p>Destination: ${destination}</p>
//       <p>Date: ${date}</p>
//     `;
//     confirmation.style.display = 'block';
//   });
  

document.getElementById('booking-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(event.target);

  // Send the form data via fetch to the PHP script
  fetch('booking.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      // Display the confirmation message
      const confirmationDiv = document.getElementById('confirmation');
      if (data.error) {
          confirmationDiv.innerHTML = `<p class='error'>${data.message}</p>`;
      } else {
          confirmationDiv.innerHTML = `<p class='success'>${data.message}</p>`;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('confirmation').innerHTML = `<p class='error'>An error occurred. Please try again later.</p>`;
  });
});
