<?php
session_start();

// ✅ Database connection
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "ys_database";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// ✅ Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ✅ Get form data safely
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo "<script>alert('Please fill in all fields.'); window.history.back();</script>";
    exit();
}

// ✅ Prepare and execute query
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// ✅ Check user existence
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // ✅ Verify password using password_verify()
    if (password_verify($password, $row['password'])) {

        // ✅ Store user info in session
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['firstname'] = $row['firstname'];
        $_SESSION['lastname'] = $row['lastname'] ?? ''; // support if lastname exists

        // ✅ Redirect to dashboard (index.php)
        echo "<script>
                alert('Welcome back, " . htmlspecialchars($row['firstname']) . "!');
                window.location.href = '../fyp/index.php';
              </script>";
        exit();
    } else {
        echo "<script>alert('Invalid password. Please try again.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Username not found.'); window.history.back();</script>";
}

// ✅ Clean up
$stmt->close();
$conn->close();
?>
