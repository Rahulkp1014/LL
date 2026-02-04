// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartTbody = document.getElementById('cart-tbody');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTable = document.querySelector('.cart-items table');
    const cartSummary = document.querySelector('.cart-summary');
    const cartCountElement = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('lusterLaneCart')) || [];

    function saveCart() {
        localStorage.setItem('lusterLaneCart', JSON.stringify(cart));
    }

    function renderCart() {
        cartTbody.innerHTML = '';
        if (cart.length === 0) {
            handleEmptyCart();
            updateCartTotals(); // Ensure count is 0
            return;
        }

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('cart-item-row');
            row.dataset.id = item.id;
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td class="product-info">
                    <span class="product-title">${item.name}</span>
                </td>
                <td class="product-price">$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="qty-input"></td>
                <td class="product-line-total">$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn">×</button></td>
            `;
            cartTbody.appendChild(row);
        });
        updateCartTotals();
        handleEmptyCart();
    }
    
    function updateCartTotals() {
        let subtotal = 0;
        cart.forEach(item => { subtotal += item.price * item.quantity; });

        document.getElementById('summary-subtotal').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('summary-total').textContent = '$' + subtotal.toFixed(2);
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) { // Check if the element exists
             cartCountElement.textContent = totalItems;
        }
    }
    
    function handleEmptyCart() {
        const isCartEmpty = cart.length === 0;
        cartTable.classList.toggle('hidden', isCartEmpty);
        cartSummary.classList.toggle('hidden', isCartEmpty);
        emptyCartMessage.classList.toggle('hidden', !isCartEmpty);
    }

    cartTbody.addEventListener('change', (event) => {
        if (event.target.classList.contains('qty-input')) {
            const row = event.target.closest('.cart-item-row');
            const itemId = row.dataset.id;
            const newQuantity = parseInt(event.target.value);
            const itemInCart = cart.find(item => item.id === itemId);
            if (itemInCart) { itemInCart.quantity = newQuantity; }
            saveCart();
            renderCart();
        }
    });

    cartTbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const row = event.target.closest('.cart-item-row');
            const itemId = row.dataset.id;
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            renderCart();
        }
    });

    renderCart();
});