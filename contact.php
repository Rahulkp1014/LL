<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | Luster Lane</title>
    <link rel="stylesheet" href="home-style.css">
    <link rel="stylesheet" href="contact-style.css">
</head>
<body>

    <?php include 'header.php'; ?>

    <main class="contact-container">
        <div class="contact-header">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Please fill out the form below or contact us directly.</p>
        </div>

        <div class="contact-body">
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> 123 Jewelry Lane, Surat, Gujarat, India</p>
                <p><strong>Email:</strong> support@lusterlane.com</p>
                <p><strong>Phone:</strong> +91 123 456 7890</p>
                <div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.51171373212!2d72.71808349999999!3d21.132024599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae793151b9%3A0xe21fee62fc1d40!2sC.K%20Pithawalla%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1759403715102!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <div class="contact-form">
                <form action="contact-process.php" method="POST">
                    <h3>Send us a Message</h3>
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Your Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </div>
    </main>
    
    <?php include 'footer.php'; ?>

</body>
</html>