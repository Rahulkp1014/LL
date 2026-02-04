document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('lusterLaneCart')) || [];
    const summaryItemsDiv = document.getElementById('summary-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');
    const feedbackEl = document.getElementById('form-feedback');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // 1. Render the order summary from the cart
    function renderSummary() {
        summaryItemsDiv.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            summaryItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            placeOrderBtn.disabled = true;
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('summary-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">Quantity: ${item.quantity}</span>
                </div>
                <span class="item-price">$${itemTotal.toFixed(2)}</span>
            `;
            summaryItemsDiv.appendChild(itemDiv);
        });

        subtotalEl.textContent = '$' + subtotal.toFixed(2);
        totalEl.textContent = '$' + subtotal.toFixed(2);
    }

    // 2. Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        feedbackEl.textContent = '';
        
        const formData = {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            cart: cart // The most important part - the items being purchased
        };

        // Simple validation
        for (const key in formData) {
            if (key !== 'cart' && !formData[key]) {
                feedbackEl.textContent = 'Please fill out all fields.';
                return;
            }
        }
        
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Processing...';

        // 3. Send data to the server
        fetch('process-order.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                feedbackEl.textContent = 'Order placed successfully! Thank you.';
                feedbackEl.classList.add('success');
                // Clear the cart from local storage
                localStorage.removeItem('lusterLaneCart');
                // Redirect to a thank you page after a delay
                setTimeout(() => { window.location.href = 'index.php'; }, 3000);
            } else {
                feedbackEl.textContent = data.message || 'There was an error placing your order.';
                placeOrderBtn.disabled = false;
                placeOrderBtn.textContent = 'Place Order';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            feedbackEl.textContent = 'A network error occurred. Please try again.';
            placeOrderBtn.disabled = false;
            placeOrderBtn.textContent = 'Place Order';
        });
    });

    renderSummary();
});