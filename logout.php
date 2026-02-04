<?php
// logout.php

// 1. Start the session
session_start();

// 2. Unset all of the session variables
$_SESSION = array();

// 3. Destroy the session
session_destroy();

// 4. Redirect to the homepage
header("Location: index.php");
exit;
?>