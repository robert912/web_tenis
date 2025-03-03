
    $(document).ready(function() {
        let carrito = [];
        cargarCarrito()
        $('.agregar-al-carrito').click(function() {
            let producto = $(this).data('producto');
            let precio = $(this).data('precio');
            carrito.push({ producto, precio });
            actualizarCarrito();
        });
    
        function actualizarCarrito() {
            $('#carrito').empty();
            let total = 0;
            carrito.forEach(item => {
                $('#carrito').append(`<li>${item.producto} - $${item.precio}</li>`);
                total += item.precio;
            });
            $('#total').text(`Total: $${total}`);
            guardarCarrito()
        }

        function guardarCarrito() {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        
        function cargarCarrito() {
            let carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                carrito = JSON.parse(carritoGuardado);
                actualizarCarrito();
            }
        }
    });
