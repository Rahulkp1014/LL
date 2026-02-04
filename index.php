<?php
// This PHP code will run before any HTML is sent to the browser.
require 'config.php'; // Connect to the database

// SQL query to fetch products. Let's get 4 for the "Best Sellers" section.
$sql = "SELECT id, name, price, image_url FROM products ORDER BY id DESC LIMIT 4";
$result = $conn->query($sql);

// We will store the products in an array
$products = [];
if ($result->num_rows > 0) {
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
    <title>Home | Luster Lane</title>
    <link rel="stylesheet" href="home-style.css">
</head>
<body>
    
    <?php include 'header.php'; ?> 

    <section class="hero">
        <div class="H-text">
            <h2>LUSTER LANE</h2>
            <h3>Discover timeless jewelry crafted to sparkle in every moment.</h3>
            <a href="shop.php" class="btn">Shop Now</a>
        </div>
    </section>

    <section class="collections">
        <h2>Shop by Collection</h2>
        <div class="collection-grid">
            <div class="collection-card"> <img src="media/others/rings.png" alt="Rings"> <h3>Rings</h3> </div>
            <div class="collection-card"> <img src="media/others/necklace-preview (2).png" alt="Necklaces"> <h3>Necklaces</h3> </div>
            <div class="collection-card"> <img src="media/others/earring-preview.png" alt="Earrings"> <h3>Earrings</h3> </div>
            <div class="collection-card"> <img src="media/others/Untitled (2).png" alt="Wedding Bands"> <h3>Wedding Bands</h3> </div>
        </div>
    </section>


    <section class="bestsellers">
    <h2 class="section-title">Best Sellers</h2>
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
            <p>No products found.</p>
        <?php endif; ?>

    </div>
</section>
    <footer>
        <section class="newsletter">
            <h2>Stay Updated with Luster Lane</h2>
            <p>Join our mailing list to get exclusive offers & new arrivals.</p>
            <form id="newsletter-form">
                <input type="email" id="newsletter-email" placeholder="Enter your email" aria-label="Email Address">
                <button type="submit">Subscribe</button>
            </form>
            <p id="newsletter-feedback" class="feedback-message"></p>
        </section>
        <p>© 2025 Luster Lane | All Rights Reserved</p>
    </footer>

    <script src="index.js"></script>

</body>
</html>