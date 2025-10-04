<?php
$servername = "localhost";
$dbusername = "root";   // default XAMPP username
$dbpassword = "";       // default XAMPP password is empty
$dbname = "ys_database";  // database name you created

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$birthday = $_POST['birthday'];
$campus = $_POST['campus'];
$localchurch = $_POST['localchurch'];
$member = $_POST['member'];
$leader = $_POST['leader'];
$username = $_POST['username'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];

// Check password match
if ($password !== $confirmpassword) {
    echo "<script>alert('Passwords do not match!'); window.history.back();</script>";
    exit();
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO users (firstname, lastname, birthday, campus, localchurch, member, leader, username, password)
        VALUES ('$firstname', '$lastname', '$birthday', '$campus', '$localchurch', '$member', '$leader', '$username', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo "<script>
            alert('Sign Up Successful! Please log in.');
            window.location.href = '../Login/login.html'; // go to login page
          </script>";
} else {
    echo "<script>
            alert('Error: " . $conn->error . "');
            window.history.back();
          </script>";
}

$conn->close();
?>
