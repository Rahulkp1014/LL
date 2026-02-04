<?php
// auth.php

require 'config.php';
session_start();
header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Invalid action.'];

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'login') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        $response['message'] = 'Please fill in all fields.';
    } else {
        // UPDATED: Added 'role' to the SELECT statement
        $stmt = $conn->prepare("SELECT id, name, password_hash, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['logged_in'] = true;
                // NEW: Save the user's role to the session
                $_SESSION['user_role'] = $user['role']; 
                
                $response['success'] = true;
                $response['message'] = 'Login successful! Redirecting...';
            } else {
                $response['message'] = 'Incorrect email or password.';
            }
        } else {
            $response['message'] = 'Incorrect email or password.';
        }
        $stmt->close();
    }

} elseif ($action === 'signup') {
    // Signup logic remains the same
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($name) || empty($email) || empty($password)) {
        $response['message'] = 'Please fill in all fields.';
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
        } else {
            $password_hash = password_hash($password, PASSWORD_BCRYPT);
            // NOTE: The 'role' column will automatically default to 'customer' as we set it up
            $insert_stmt = $conn->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
            $insert_stmt->bind_param("sss", $name, $email, $password_hash);

            if ($insert_stmt->execute()) {
                $new_user_id = $conn->insert_id;
                $_SESSION['user_id'] = $new_user_id;
                $_SESSION['user_name'] = $name;
                $_SESSION['logged_in'] = true;
                $_SESSION['user_role'] = 'customer'; // New users are always customers
                $response['success'] = true;
                $response['message'] = 'Account created successfully! Logging you in...';
            } else {
                $response['message'] = 'Error creating account.';
            }
            $insert_stmt->close();
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
?>