function updateTotal() {
    let cartItems = document.querySelectorAll('.cart-item .price');
    let total = 0;
    cartItems.forEach(item => {
        total += parseFloat(item.textContent.replace('$', ''));
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}



let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}


window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}



let closeButtons = document.querySelectorAll('.cart-item .fas.fa-times');
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        let cartItem = this.parentElement;
        cartItem.remove();
        updateTotal()
    });
});



let cartButtons = document.querySelectorAll('.products .fas.fa-shopping-cart');
cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the product details
        let productBox = this.closest('.box');
        let productImageSrc = productBox.querySelector('.image img').src;
        let productTitle = productBox.querySelector('.content h3').textContent;
        let productPrice = productBox.querySelector('.content .price').childNodes[0].textContent;

        // Create a new cart item
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Add inner HTML to the cart item
        cartItem.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${productImageSrc}" alt="">
            <div class="content">
                <h3>${productTitle}</h3>
                <div class="price">${productPrice}</div>
            </div>
        `;
        let cartContainer = document.querySelector('.cart-items-container');        
        let checkoutButton = cartContainer.querySelector('.btn');
        let orderTotal = cartContainer.querySelector('.order-total');
        cartContainer.insertBefore(cartItem, orderTotal);
        updateTotal()

        cartItem.querySelector('.fa-times').addEventListener('click', function() {
            cartItem.remove();
            updateTotal()
        });
    });
});




let AddTocartButtons = document.querySelectorAll('.menu .btn');
AddTocartButtons.forEach(button => {
    button.addEventListener('click', function() {
        //e.preventDefault(); // Prevent the default action (e.g., navigating to a different page)

        // Find the product details
        let productBox = this.closest('.box');
        let productImageSrc = productBox.querySelector('img').src;
        let productTitle = productBox.querySelector('h3').textContent;
        let productPrice = productBox.querySelector('.price').childNodes[0].textContent;

        // Create a new cart item
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Add inner HTML to the cart item
        cartItem.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${productImageSrc}" alt="">
            <div class="content">
                <h3>${productTitle}</h3>
                <div class="price">${productPrice}</div>
            </div>
        `;

        // Get the cart items container
        let cartContainer = document.querySelector('.cart-items-container');
        
        // Find the "Order Total" div and "Checkout Now" button
        let orderTotal = cartContainer.querySelector('.order-total');
        let checkoutButton = cartContainer.querySelector('.btn');

        // Insert the new cart item before the "Order Total" div
        cartContainer.insertBefore(cartItem, orderTotal);

        // Update the total price
        updateTotal();

        // Add functionality to remove the item when the close button is clicked
        cartItem.querySelector('.fa-times').addEventListener('click', function() {
            cartItem.remove();
            // Update the total price after removal
            updateTotal();
        });
    });
});
