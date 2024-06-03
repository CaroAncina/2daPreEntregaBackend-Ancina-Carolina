
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Función para agregar un producto al carrito
async function addToCart(event) {
    try {
        // Obtener el ID del producto desde el botón
        const productId = event.target.dataset.productId;

        // Verifica si ya existe un carrito 
        let cartId = localStorage.getItem('cartId');

        if (!cartId) {
            // Si no existe un carrito, crea uno nuevo
            const newCartResponse = await fetch('http://localhost:8080/api/carts/', {
                method: 'POST'
            });

            if (!newCartResponse.ok) {
                throw new Error('Error al crear un nuevo carrito');
            }

            const newCartData = await newCartResponse.json();
            cartId = newCartData.payload._id;

            // Guarda el ID del carrito 
            localStorage.setItem('cartId', cartId);
        }

        // Agrega el producto al carrito usando el ID del carrito
        const addToCartUrl = `http://localhost:8080/api/carts/${cartId}/product/${productId}`;
        const addToCartResponse = await fetch(addToCartUrl, {
            method: 'POST'
        });

        if (addToCartResponse.ok) {
            console.log('Producto agregado al carrito:', cartId);
            alert('Producto agregado al carrito con éxito');
        } else {
            throw new Error('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}

//Función para mostrar detalles del producto
function showDetails(productId) {
    window.location.href = `/products/${productId}`;
}
