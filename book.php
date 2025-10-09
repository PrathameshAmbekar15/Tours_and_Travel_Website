<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "trip_booking";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $destination = trim($_POST["destination"]);
    $departure_date = trim($_POST["departure-date"]);
    $return_date = trim($_POST["return-date"]);

    // Validate inputs
    if (empty($name) || empty($email) || empty($destination) || empty($departure_date) || empty($return_date)) {
        echo "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
    } else {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO bookings (name, email, destination, depart_date, return_date) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $email, $destination, $departure_date, $return_date);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Booking successfully recorded.";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }
}

// Close connection
$conn->close();
?>