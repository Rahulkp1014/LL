<?php
session_start();

// This is the security guard.
// If the user is not logged in, or if they are not an admin, redirect them to the login page.
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || $_SESSION['user_role'] !== 'admin') {
    header("Location: login.html"); // Redirect to login page
    exit; // Stop the script from running further
}

// If the script gets past the check above, it means the user is a logged-in admin.
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Luster Lane</title>
    <link rel="stylesheet" href="admin-style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>

    <div class="dashboard-container">
        <aside class="sidebar">
            <h2>Luster Lane <br><span>Admin</span></h2>
            <nav>
                <ul>
                    <li class="active"><a href="admin.php">Dashboard</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Messages</a></li>
                    <li><a href="#">Users</a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <a href="logout.php">Logout</a>
            </div>
        </aside>

        <main class="main-content">
            <header>
                <h1>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
            </header>
            <section class="dashboard-overview">
                <h2>Overview</h2>
                <div class="stat-cards">
                    <div class="card">
                        <h3>Total Products</h3>
                        <p>--</p>
                    </div>
                    <div class="card">
                        <h3>Total Orders</h3>
                        <p>--</p>
                    </div>
                    <div class="card">
                        <h3>New Messages</h3>
                        <p>--</p>
                    </div>
                </div>
            </section>
        </main>
    </div>

</body>
</html>