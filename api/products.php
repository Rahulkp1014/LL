<?php
require '../config.php';
header('Content-Type: application/json');

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
$sql = "SELECT id, name, price, image_url FROM products ORDER BY name ASC";
if ($limit > 0) {
    // For Best Sellers, we might order by id DESC and limit
    $sql = "SELECT id, name, price, image_url FROM products ORDER BY id DESC LIMIT $limit";
}

$result = $conn->query($sql);
$products = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();
echo json_encode(['success' => true, 'data' => $products]);
?>
