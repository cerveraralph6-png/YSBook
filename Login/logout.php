<?php
session_start();

// Remove all session data
session_unset();
session_destroy();

// Optional: Show a logout message, then redirect
echo "<script>
    alert('You have been logged out successfully.');
    window.location.href = '../Login/login.html';
</script>";
exit();
?>
