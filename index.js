// Crear productos en (Product) e insertarlos en (ProductManager)

class ProductManager {
    constructor () {
        this.products = []
    }

    addProduct(product) {
        if (this.products.find(producto => producto.code == product.code)) {
            console.log("Existe") // Producto 
        } else {
            // No existe 
        }
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        const product = this.products.find(producto => producto.id == id)

        if (product) { // Si existe
            return product
        }
        console.log("No existe")
    }
}


class Product {
    constructor (title, description, price, thumbnail, code, stock) {
        this.title = title 
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.increment()
    }

    static increment() {
        if (this.idIncrement) {  // Si existe esta propiedad 
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }

        return this.idIncrement
    }
}

// Creando productos 

const product1 = new Product("Lemon Pie", "Descrpition of Lemon Pie", 1500, "lemonpie.jpg","L12", 11)
const product2 = new Product("Cheesecake", "Descrpition of Cheesecake", 1800, "cheesecake.jpg","C12", 32)
const product3 = new Product("Oreo Cake", "Descrpition of Oreo Cake", 1350, "oreocake.jpg","O120", 29)
const product4 = new Product("Alfajor", "Descrpition of Alfajor", 520, "alfajor.jpg","A12", 6)


console.log(product1)
console.log(product2)
console.log(product3)
console.log(product4)
