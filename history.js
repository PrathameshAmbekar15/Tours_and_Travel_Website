document.addEventListener('DOMContentLoaded', () => {
    // Fetch registered users
    const usersTableBody = document.getElementById('usersTableBody');
    fetch('/api/all-users')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(users => {
            if (users.length === 0) {
                usersTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No users found.</td></tr>';
                return;
            }
            usersTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                usersTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            usersTableBody.innerHTML = `<tr><td colspan="3" class="error-msg">Error loading users: ${error.message}</td></tr>`;
        });

    // Fetch bookings
    const tableBody = document.getElementById('bookingsTableBody');
    fetch('/api/bookings')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(bookings => {
            if (bookings.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="no-data">No bookings found.</td></tr>';
                return;
            }
            tableBody.innerHTML = '';
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.destination}</td>
                    <td>${booking.date}</td>
                    <td>${new Date(booking.created_at).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            tableBody.innerHTML = `<tr><td colspan="6" class="error-msg">Error loading history: ${error.message}</td></tr>`;
        });

    // Fetch contact messages
    const contactTableBody = document.getElementById('contactsTableBody');
    fetch('/api/contact')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(contacts => {
            if (contacts.length === 0) {
                contactTableBody.innerHTML = '<tr><td colspan="5" class="no-data">No messages found.</td></tr>';
                return;
            }
            contactTableBody.innerHTML = '';
            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                    <td>${new Date(contact.created_at).toLocaleString()}</td>
                `;
                contactTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
            contactTableBody.innerHTML = `<tr><td colspan="5" class="error-msg">Error loading messages: ${error.message}</td></tr>`;
        });
});
