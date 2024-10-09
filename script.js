document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889")
        .then(response => response.json())
        .then(data => {
            let cartHTML = '';
            let subtotal = 0;

            data.items.forEach(item => {
                const itemTotal = (item.price * item.quantity) / 100;
                subtotal += itemTotal;

                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="details">
                            <h3>${item.title}</h3>
                            <p>Price: ₹${(item.price / 100).toFixed(2)}</p>
                            <label for="quantity-${item.id}">Qty: </label>
                            <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
            });

            cartContainer.innerHTML = cartHTML;
            subtotalElement.textContent = ₹${subtotal.toFixed(2)};
            totalElement.textContent = ₹${subtotal.toFixed(2)};
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });

            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('change', updateQuantity);
            });
        });
    function removeItem(event) {
        const itemId = event.target.getAttribute('data-id');
        const cartItem = document.getElementById(quantity-${itemId}).closest('.cart-item');
        cartItem.remove();
        recalculateTotal();
    }
    function updateQuantity(event) {
        recalculateTotal();
    }
    function recalculateTotal() {
        let subtotal = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const quantityInput = item.querySelector('input[type="number"]');
            const price = parseFloat(item.querySelector('p').textContent.replace('Price: ₹', ''));
            const quantity = parseInt(quantityInput.value);
            subtotal += price * quantity;
        });

        subtotalElement.textContent = ₹${subtotal.toFixed(2)};
        totalElement.textContent = ₹${subtotal.toFixed(2)};
    }
});
