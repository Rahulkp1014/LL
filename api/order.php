<?php
require '../config.php';
session_start();
header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'An unknown error occurred.'];

$data = json_decode(file_get_contents('php://input'), true);

$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($data['name'] ?? '');
$address = htmlspecialchars($data['address'] ?? '');
$city = htmlspecialchars($data['city'] ?? '');
$zip = htmlspecialchars($data['zip'] ?? '');
$cart = $data['cart'] ?? [];

if (empty($email) || empty($name) || empty($address) || empty($city) || empty($zip) || empty($cart)) {
    $response['message'] = 'Please fill out all fields.';
    echo json_encode($response);
    exit;
}

$conn->begin_transaction();

try {
    $total_amount = 0;
    foreach ($cart as $item) {
        $total_amount += $item['price'] * $item['quantity'];
    }

    $shipping_address = "$address, $city, $zip";
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    $stmt = $conn->prepare("INSERT INTO orders (user_id, customer_name, customer_email, shipping_address, total_amount) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("isssd", $user_id, $name, $email, $shipping_address, $total_amount);
    $stmt->execute();

    $order_id = $conn->insert_id;

    $stmt_items = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price_per_item) VALUES (?, ?, ?, ?)");

    foreach ($cart as $item) {
        $product_id = intval($item['id']);
        $quantity = intval($item['quantity']);
        $price = floatval($item['price']);
        $stmt_items->bind_param("iiid", $order_id, $product_id, $quantity, $price);
        $stmt_items->execute();
    }

    $conn->commit();

    $response['success'] = true;
    $response['message'] = 'Order placed successfully!';

}
catch (mysqli_sql_exception $exception) {
    $conn->rollback();
    $response['message'] = 'Database error: Could not process order.';
}

$conn->close();
echo json_encode($response);
?>
