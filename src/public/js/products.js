function showProductDetails(pid) {
    window.location.href = `/products/${pid}`;
}

function addToCart(cid, pid) {
    console.log('cid:', cid);
    fetch(`/api/carts/${cid}/products/${pid}`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
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
