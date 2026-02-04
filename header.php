<?php
// Start the session on every page where this header is included.
session_start();
?>
<header>
    <h1><a href="index.php" style="text-decoration: none; color: #b8860b;">Luster Lane</a></h1>
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="shop.php">Shop</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>
            <li>
                <a href="cart.html">
                    Cart 🛒 <span id="cart-count">0</span>
                </a>
            </li>
            
            <?php
            // Check if the user is logged in by looking for the session variable.
            if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
                // If logged in, show a welcome message and a logout link.
                echo '<li class="welcome-user">Welcome, ' . htmlspecialchars($_SESSION['user_name']) . '!</li>';
                echo '<li><a href="logout.php" class="logout-btn">Logout</a></li>';
            } else {
                // If not logged in, show the Login/Signup link.
                echo '<li><a href="login.html">Login/Signup</a></li>';
            }
            ?>
        </ul>
    </nav>
</header>