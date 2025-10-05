<!-- <?php
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "userdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Registration
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['Name']) && isset($_POST['Email']) && isset($_POST['Password'])) {
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $password = password_hash($_POST['Password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        header("Location: success.html"); // Redirect to a success page
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Login
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['Email']) && isset($_POST['Password']) && !isset($_POST['Name'])) {
    $email = $_POST['Email'];
    $password = $_POST['Password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo "Login successful";
            header("Location: welcome.html"); // Redirect to a welcome page
        } else {
            echo "Invalid password";
        }
    } else {
        echo "No user found with this email";
    }
}

$conn->close();
?> -->


<?php
// Establishing connection to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "userdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetching user input
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate inputs
    if (empty($username) || empty($email) || empty($password)) {
        echo "All fields are required.";
        exit;
    }

    // Hash the password before storing it
    // $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // SQL query to insert data into database
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        // Success message and JavaScript for redirection
        echo "<script>
                alert('New record created successfully');
                window.location.href = 'sign.html'; // Redirect to login page
              </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
} else {
    // If the request method is not POST, redirect to signup page
    header("Location: signup.html");
}

$conn->close();
?>