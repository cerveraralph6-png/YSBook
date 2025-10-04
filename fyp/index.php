<?php
session_start();

// ✅ Redirect to login if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ../Login/login.html");
    exit();
}

// ✅ Get session data
$firstname = $_SESSION['firstname'];
$lastname = isset($_SESSION['lastname']) ? $_SESSION['lastname'] : '';
$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FYP Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Navbar -->
  <div id="nav">
    <h1>MyFYP</h1>
    <button onclick="logout()">Logout</button>
  </div>

  <div class="container">
    <!-- Main Feed -->
    <div class="main-content">
      <div class="post-box">
        <textarea id="postText" rows="3" placeholder="What's on your mind?"></textarea>
        <input type="file" id="mediaInput" accept="image/*,video/*">
        <button onclick="createPost()">Post</button>
      </div>
      <div class="feed" id="feed"></div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
      <div class="profile-box">
        <img src="/default.jpg" alt="Profile Picture">
        <h2><?php echo htmlspecialchars($firstname . ' ' . $lastname); ?></h2>
        <p>@<?php echo htmlspecialchars($username); ?></p>
        <p>📍 Philippines</p>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
