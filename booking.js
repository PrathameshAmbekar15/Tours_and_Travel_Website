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


document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    const bookingData = { name, email, destination, date };

    // Send the form data via fetch to the Node.js script
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
        .then(response => response.json())
        .then(data => {
            // Display the confirmation message
            const confirmationDiv = document.getElementById('confirmation');
            if (data.error) {
                confirmationDiv.innerHTML = `<p class='error' style='color: red;'>${data.error}</p>`;
            } else {
                confirmationDiv.innerHTML = `<p class='success' style='color: green;'>${data.message}</p>
          <div style='margin-top: 10px;'>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Date:</strong> ${date}</p>
          </div>`;
            }
            confirmationDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('confirmation').innerHTML = `<p class='error' style='color: red;'>An error occurred. Please try again later.</p>`;
            document.getElementById('confirmation').style.display = 'block';
        });
});
