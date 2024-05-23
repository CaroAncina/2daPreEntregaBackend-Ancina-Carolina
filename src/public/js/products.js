function showProductDetails(productId) {
    window.location.href = `/products/${productId}`;
}

function addToCart(productId) {
    fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => {
        if (response.ok) {
            alert('Producto agregado al carrito');
        } else {
            alert('Error al agregar el producto al carrito');
        }
    })
    .catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
        alert('Error al agregar el producto al carrito');
    });
}
