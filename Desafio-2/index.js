import { promises as fs } from 'fs'

// Constante de mi ruta de archivo 
const Path = './products.txt'

// Crear mi archivo txt
const newFile = async (path) => {
    await fs.writeFile(path, '')
    await fs.appendFile(path, '[]')
}

// Llamo a la funcion para crear el archivo 
await newFile(Path)

// Product Manager 
class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    async addProduct(product) {
        const productTXT = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(productTXT)

       if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock 
       ) {
        return('Provide required properties')
       }

        const validateCode = this.products.find((ele) => ele.code === product.code)
        if (validateCode) {
            return ('The product exist')
        }

        this.products.push(product)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }


    async getProducts() {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        return console.log(this.products)
    }


    async getProductById(id) {
        const product = this.products.find(producto => producto.id == id)

        product !== undefined
            ? console.log(product.title)
            : console.log('No existe')
    }



    async updateProduct(id) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        const product = this.products.find(producto => producto.id == id)

        product !== undefined
            ? product.stock--
            : console.log('Product not found')

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }


    async deleteProduct(id) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        const filteredProducts = this.products.filter(producto => producto.id !== id)

        this.products = filteredProducts

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }
}


class Product {
    constructor(title, description, price, thumbnail, code, stock) {
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

const product1 = new Product("Lemon Pie", "Descrpition of Lemon Pie", 1500, "lemonpie.jpg", "L12", 11)
const product2 = new Product("Cheesecake", "Descrpition of Cheesecake", 1800, "cheesecake.jpg", "C12", 32)
const product3 = new Product("Oreo Cake", "Descrpition of Oreo Cake", 1350, "oreocake.jpg", "O120", 29)
const product4 = new Product("Alfajor", "Descrpition of Alfajor", 520, "alfajor.jpg", "A12", 6)

const ProductManager = new ProductManager(Path)


await ProductManager.getProducts()

await ProductManager.addProduct(product1)
await ProductManager.addProduct(product2)
await ProductManager.addProduct(product3)
await ProductManager.addProduct(product4)

await ProductManager.updateProduct(4)
await ProductManager.getProducts()
await ProductManager.deleteProduct(1)
await ProductManager.getProducts()


