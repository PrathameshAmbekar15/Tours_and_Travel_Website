<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login Page</title>
<link rel="stylesheet" href="login.css">
</head>
<body>

<?php
session_start(); // Start the session

// Database connection settings
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_db_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);

    // Execute the statement
    $stmt->execute();

    // Store the result
    $stmt->store_result();

    // Bind the result variables
    $stmt->bind_result($user_id, $hashed_password);

    // Check if a row is fetched
    if ($stmt->fetch()) {
        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Password is correct, start a session
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;

            // Redirect to a protected page
            header("Location: protected_page.php");
            exit();
        } else {
            // Password is incorrect
            echo "Invalid password.";
        }
    } else {
        // Username not found
        echo "No user found with that username.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>


    
  <div class="login-container">
    <form id="login-form" action="login.php" method="post">
        <h2>Login</h2>
        <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>
        <input type="submit" class="submit" name="submit" value="Login">
    </form>
    
    
</div>

<script src="login.js"></script>
</body>
</html>
