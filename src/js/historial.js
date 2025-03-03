(() => {
    let listProductHTML = document.querySelector('.listProduct');

    const addDataToHTML = () => {
        // remove datas default from HTML

        // add new datas
        if (products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item', 'col-md-3', 'col-sm-12', 'product-card');
                newProduct.innerHTML =
                    `<img src="${product.image}" alt="product">
                    <span class="category-badge mb-2 d-inline-block">Electronics</span>
                    <h2>${product.name}</h2>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">$${product.price}</span>
                        <button class="btn addCart">
                            <i class="bi bi-cart-plus fa-lg addCart"></i>
                        </button>
                    </div>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        let addCartButton = positionClick.closest('.addCart');
        if (addCartButton) {
            let id_product = addCartButton.closest('.item').dataset.id;
            addToCart(id_product);
        }
    })

    const initApp = () => {
        // get data product
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                addDataToHTML();

                // get data cart from memory
                if (localStorage.getItem('cart')) {
                    cart = JSON.parse(localStorage.getItem('cart'));
                    addCartToHTML();
                }
            })
    }
    initApp();

})();
