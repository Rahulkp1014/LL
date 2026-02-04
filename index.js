// index.js
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('lusterLaneCart')) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    function addToCart(product, button) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('lusterLaneCart', JSON.stringify(cart));
        updateCartCount();

        // Give user feedback on the button
        button.textContent = 'Added!';
        button.disabled = true; // Disable the button
        setTimeout(() => {
            button.textContent = 'In Cart';
        }, 1000);
    }

    // NEW function to check the state of buttons when the page loads
    function updateButtonStates() {
        addToCartButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id;
            const itemInCart = cart.find(item => item.id === productId);

            if (itemInCart) {
                button.textContent = 'In Cart';
                button.disabled = true;
            }
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                image: productCard.dataset.image
            };
            addToCart(product, event.target);
        });
    });

    updateCartCount();
    updateButtonStates(); // Check buttons on page load
});

// index.js

// --- NEWSLETTER FORM VALIDATION ---
document.addEventListener('DOMContentLoaded', () => {
    // This part of the script runs after the main cart logic
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const feedbackElement = document.getElementById('newsletter-feedback');

    // A simple regex to check for a valid email format
    function isValidEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            // 1. Prevent the form from actually submitting and reloading the page
            event.preventDefault();

            // 2. Get the email value and trim whitespace
            const email = emailInput.value.trim();

            // 3. Reset previous states
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback-message';
            emailInput.classList.remove('error');

            // 4. Run validation checks
            if (email === '') {
                feedbackElement.textContent = 'Please enter your email address.';
                feedbackElement.classList.add('error');
                emailInput.classList.add('error');
            } else if (!isValidEmail(email)) {
                feedbackElement.textContent = 'Please enter a valid email address.';
                feedbackElement.classList.add('error');
                emailInput.classList.add('error');
            } else {
                // 5. If validation is successful
                feedbackElement.textContent = 'Thank you for subscribing!';
                feedbackElement.classList.add('success');
                emailInput.value = ''; // Clear the input field
                
                // Optional: Revert the message after a few seconds
                setTimeout(() => {
                    feedbackElement.textContent = '';
                    feedbackElement.className = 'feedback-message';
                }, 5000);
            }
        });
    }
});