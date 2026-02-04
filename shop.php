<?php
// Connect to the database
require 'config.php';

// The new query to get ALL products, ordered by name
$sql = "SELECT id, name, price, image_url FROM products ORDER BY name ASC";
$result = $conn->query($sql);

$products = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop All | Luster Lane</title>
    <link rel="stylesheet" href="home-style.css"> 
</head>
<body>
    
    <?php include 'header.php'; ?>

    <main style="padding: 40px 5%;">
        <h1 style="text-align: center; margin-bottom: 40px; font-family: 'Playfair Display', serif;">All Products</h1>

        <div class="grid">
           <?php foreach ($products as $product): ?>
    <div class="product-card" 
         data-id="<?php echo htmlspecialchars($product['id']); ?>" 
         data-name="<?php echo htmlspecialchars($product['name']); ?>" 
         data-price="<?php echo htmlspecialchars($product['price']); ?>" 
         data-image="<?php echo htmlspecialchars($product['image_url']); ?>">
        
        <div class="product-image-container">
            <img src="<?php echo htmlspecialchars($product['image_url']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
        </div>
        
        <h3><?php echo htmlspecialchars($product['name']); ?></h3>
        <p>$<?php echo number_format($product['price'], 2); ?></p>
        <button class="btn add-to-cart-btn">Add to Cart</button>
    </div>
<?php endforeach; ?>

            <?php if (empty($products)): ?>
                <p style="text-align: center; width: 100%;">No products are available at this time.</p>
            <?php endif; ?>
        </div>
    </main>

    <script src="index.js"></script>

    <?php include 'footer.php'; ?>

</body>
</html>