<?php
require '../config.php';
session_start();
header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Invalid action.'];

$data = json_decode(file_get_contents('php://input'), true);
if (!$data && isset($_GET['action'])) {
    $data = ['action' => $_GET['action']];
}

$action = $data['action'] ?? '';

if ($action === 'login') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        $response['message'] = 'Please fill in all fields.';
    }
    else {
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
                $_SESSION['user_role'] = $user['role'];

                $response['success'] = true;
                $response['message'] = 'Login successful!';
                $response['user'] = [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'role' => $user['role']
                ];
            }
            else {
                $response['message'] = 'Incorrect email or password.';
            }
        }
        else {
            $response['message'] = 'Incorrect email or password.';
        }
        $stmt->close();
    }
}
elseif ($action === 'signup') {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        $response['message'] = 'Please fill in all fields.';
    }
    else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
        }
        else {
            $password_hash = password_hash($password, PASSWORD_BCRYPT);
            $insert_stmt = $conn->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
            $insert_stmt->bind_param("sss", $name, $email, $password_hash);

            if ($insert_stmt->execute()) {
                $new_user_id = $conn->insert_id;
                $_SESSION['user_id'] = $new_user_id;
                $_SESSION['user_name'] = $name;
                $_SESSION['logged_in'] = true;
                $_SESSION['user_role'] = 'customer';

                $response['success'] = true;
                $response['message'] = 'Account created successfully!';
                $response['user'] = [
                    'id' => $new_user_id,
                    'name' => $name,
                    'role' => 'customer'
                ];
            }
            else {
                $response['message'] = 'Error creating account.';
            }
            $insert_stmt->close();
        }
        $stmt->close();
    }
}
elseif ($action === 'logout') {
    $_SESSION = array();
    session_destroy();
    $response['success'] = true;
    $response['message'] = 'Logged out successfully.';
}
elseif ($action === 'session') {
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        $response['success'] = true;
        $response['message'] = 'User is logged in.';
        $response['user'] = [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'role' => $_SESSION['user_role'] ?? 'customer'
        ];
    }
    else {
        $response['success'] = false;
        $response['message'] = 'User is not logged in.';
    }
}

$conn->close();
echo json_encode($response);
?>
