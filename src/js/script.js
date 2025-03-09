document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 'inicio';
    const content = document.getElementById('content');
    const menuLinks = document.querySelectorAll('.menu-link');
    let listCartHTML = document.querySelector('.listCart');
    let iconCart = document.querySelector('.icon-cart');
    let iconCartSpan = document.querySelector('.icon-cart span');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let cartTab = document.querySelector('.cartTab');
    let products = [];
    let cart = [];
    // const pageTitle = document.querySelector('.page-title');
    iconCart.addEventListener('click', () => {
        cartTab.classList.toggle('show');
    })
    closeCart.addEventListener('click', () => {
        cartTab.classList.toggle('show');
    })

    window.addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                quantity: 1
            }];
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
    window.addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    window.addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        if(cart.length > 0){
            cart.forEach(item => {
                totalQuantity = totalQuantity +  item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;
    
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];
                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="infoProducto">
                        <div class="name">${info.name}</div>
                        <div class="totalPrice">$${info.price * item.quantity}</div>
                    </div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                    <div>
                        <a href="#" class="delete-btn"><i class="fa-solid fa-trash-can"></i></a>
                    </div>
                `;
            })
        }
        iconCartSpan.innerText = totalQuantity;
    }
    
    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if(positionClick.classList.contains('plus')){
                type = 'plus';
            }
            changeQuantityCart(product_id, type);
        } else if (positionClick.classList.contains('fa-trash-can')) {
            let product_id = positionClick.closest('.item').dataset.id;
            removeFromCart(product_id);
        }
    });

    window.changeQuantityCart = (product_id, type) => {
        let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            let info = cart[positionItemInCart];
            switch (type) {
                case 'plus':
                    cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                    break;
            
                default:
                    let changeQuantity = cart[positionItemInCart].quantity - 1;
                    if (changeQuantity > 0) {
                        cart[positionItemInCart].quantity = changeQuantity;
                    }else{
                        cart.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToHTML();
        addCartToMemory();
    }

    window.removeFromCart = (product_id) => {
        let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            cart.splice(positionItemInCart, 1);
        }
        addCartToHTML();
        addCartToMemory();
    }
    
    const initApp = () => {
        // get data product
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;   
            // get data cart from memory
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
    }
    initApp();

    // Función para cargar el contenido de la página
    loadPage = async function(page) {
        console.log(page)
        if (page === null || page === 'salir'){return 0}
        try {
            // Simulamos la carga de contenido
            const response = await fetch(`src/pages/${page}.html`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                content.innerHTML = html;
            // pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            const scriptUrl = `src/js/${page}.js?v=${VERSION_JS}`;
            loadScript(scriptUrl)
                .then(() => {
                    console.log(`Script de ${page} cargado`);
                })
                .catch((error) => {
                    console.error('Error al cargar el script de inicio:', error);
                })
        } catch (e) {
            console.error('Error al cargar la página:', e);
            content.innerHTML = '<p>Error al cargar el contenido. Por favor, intenta de nuevo.</p>';
        }
    }

    function removeScript(url) {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            existingScript.remove();
        }
    }

    function loadScript(url) {
        removeScript(url)
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Manejar clics en los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page && page != null && page != 'null')
                sessionStorage.setItem('page',page);
            loadPage(page);
            // Actualizar clase activa
            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    // Cargar la página de inicio por defecto
    currentPage = sessionStorage.getItem('page');
    loadPage(currentPage? currentPage : 'inicio');
});

function formatearValorPesos(numero) {
    var value = numero.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return value;
}