let productService;
const cartService = new CartService();
const htmlService = new HTMLService();
const productsContainer = document.getElementById('productsList');
const filterInput = document.getElementById('filterInput');
const cartToggler = document.getElementById('cartToggler');
const shoppingBasket = document.getElementById('shoppingBasket');
const addAlert = document.getElementById('addAlert');

filterInput.addEventListener('input', event => {
    const value = event.target.value;
    if (value.length >= 3) {
        const filtered = productService.filterBy(value);
        renderProducts(filtered);
    } else {
        renderProducts(productService.products);
    }
});

productsContainer.addEventListener('click', event => {
    if (event.target && event.target?.dataset?.productId) {
        cartService.add(productService.getById(+event.target.dataset.productId));
        renderCart();
        addAlert.style.visibility = 'visible';
        setTimeout(() => {
            addAlert.style.visibility = 'hidden';
        }, 600);
    }
})

shoppingBasket.addEventListener('click', event => {
    if (event.target && event.target?.dataset?.eventType) {
        const type = event.target.dataset.eventType;
        if (type === 'clear-all') {
            cartService.clear();
        } else {
            if (type === 'clear-item') {
                cartService.remove(+event.target.dataset.productId);
            }
        }
        renderCart();
    }
})

cartToggler.addEventListener('click', event => {
    shoppingBasket.classList.toggle('cart-open');
})



function renderProducts(products) {
    productsContainer.innerHTML = htmlService.paintProducts(products);
}

function renderCart() {
    shoppingBasket.innerHTML = htmlService.paintCart(cartService.getInfo())
}

async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    productService = new ProductService(data);
    renderProducts(productService.products);
}


getProducts();
renderCart();
