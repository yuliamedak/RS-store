class HTMLService {
    paintProduct(product) {
        return`
        <div class="col-sm-6">
                <div class="card border-primary mb-3">
                    <div class="card-header">${product.title}</div>
                    <div class="card-body">
                        <div class="img">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <p>Rate: ${product.rating.rate}</p>
                            <p class="card-title">Price: <span class="text-info price-info">${product.price}$</span></p>
                        </div>
                        <p class="card-text">${product.description}</p>
                        <button 
                            type="button" 
                            class="btn btn-info add-to-cart-btn d-block" 
                            data-product-id="${product.id}"
                            >
                        Add to cart</button>
                    </div>
                </div>
            </div>
        `
    }

    paintProducts(products = []) {
        return products.map(this.paintProduct).join('')
    }

    paintCart({items, totalPrice}) {
        if (items.length === 0) {
            return '<p class="text-center">Add your first product</p>'
        }

        return `
        <ul class="shopping-list list-unstyled">
            ${items.map(this.paintCartItem).join('')}
        </ul>
        <hr/>
        <div class="d-flex align-items-center justify-content-between">
            <h2>Total price: <span class="text-info">${totalPrice.toFixed(2)}$</span></h2>
            <button type="button" class="btn btn-outline-danger" data-event-type="clear-all">Clear all</button>
        </div>
        `
    }

    paintCartItem(item) {
        return `
        <li class="d-flex align-items-center list-item">
                <div class="img">
                    <img src="${item.image}">
                </div>
                <div class="title">${item.title}</div>
                <div class="amount">${item.price} х ${item.amount}</div>
                <button 
                type="button" 
                class="btn btn-outline-danger btn-clear" 
                data-event-type="clear-item"
                data-product-id="${item.id}"
                >Clear</button>
            </li>
        `
    }
}
