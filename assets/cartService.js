class CartService {
  constructor() {
    this.cart = {}
  }

  add(product) {
    const key = product.id

    if (this.cart[key]) {
      this.cart[key].amount++
      return
    }

    this.cart[key] = {
      title: product.title,
      price: product.price,
      image: product.image,
      amount: 1
    }

    console.log('cart', this.cart);
  }

  remove(productId) {
    delete this.cart[productId]
  }

  clear() {
    this.cart = {}
  }

  getInfo() {
    const items = Object.keys(this.cart).map(id => {
      return {
        id,
        ...this.cart[id]
      }
    })

    const totalPrice = items.reduce((sum, item) => {
      return sum += item.amount * item.price
    }, 0)

    return { items, totalPrice }
  }
}
