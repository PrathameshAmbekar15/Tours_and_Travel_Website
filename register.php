<?php
// Establishing connection to the database
$servername = "localhost";
$email = "root";
$password = "";
$dbname = "signup_db";

$conn = new mysqli($servername, $email, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetching user input
$email = $_POST['email'];
$password = $_POST['password'];

// SQL query to check if user exists
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    session_start();
    $_SESSION['indexId'] = $_POST['email'];
    header("location:tours.html");

} else {

    echo "<script>alert('Invalid email or password');</script>";
}

$conn->close();
?>