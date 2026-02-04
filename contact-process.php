<?php
// contact-process.php

// 1. Include the database configuration
require 'config.php';

// 2. Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 3. Collect and sanitize input data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // 4. Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.php?status=error");
        exit;
    }

    // 5. Prepare and execute the SQL INSERT statement
    $sql = "INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bind_param("ssss", $name, $email, $subject, $message);
        
        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            // Redirect back to contact page with a success message
            header("Location: contact.php?status=success");
        } else {
            // Redirect with a database error message
            header("Location: contact.php?status=dberror");
        }
        $stmt->close();
    } else {
        header("Location: contact.php?status=dberror");
    }

    $conn->close();

} else {
    // Not a POST request, redirect back to the form
    header("Location: contact.php");
}
?>