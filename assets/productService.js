class ProductService {

  constructor(products = []) {
    this.products = products
  }

  filterBy(search = '') {
    if (!search.trim()) return this.products

    return this.products.filter(product => {
      return product.title.toLowerCase().includes(search.toLowerCase())
    })
  }

  getById(id) {
    return this.products.find(product => product.id === +id)
  }
}
