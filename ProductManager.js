class ProductManager {

    constructor() {
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, thumbnail, code, stock) {

        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code) {
                console.log(`El código ${code} está repetido`)
            }
        }

        const keysProductos = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        if(!Object.values(keysProductos).includes(undefined)) {

            ProductManager.id++;
            return this.products.push({
                ...keysProductos,
                id:ProductManager.id 
            });
        } else {
            console.log(`No puedo acceder!! Se necesitan todas los campos completos!!`)
        }

    }

    getProduct() {
        return this.products;
    }

    exists (id) {
      return this.products.find((producto) => producto.id === id)  
    }

    getProductById(id) {
        !this.exists(id) ? console.log('No found') : console.log(this.exists(id));
        }
}

const productos = new ProductManager();
console.log(productos.getProduct());


//Productos para agregar
productos.addProduct('remera rockera1', 'remera negra con imagenes de queen', 9000, 'imagen remera queen', 'abc123', 8);
productos.addProduct('remera rockera2', 'remera negra con imagenes de kiss', 8000, 'imagen remera kiss', 'abc124', 13);
productos.addProduct('remera rockera3', 'remera negra con imagenes de metalica', 10000, 'imagen remera metalica', 'abc125', 6);

console.log(productos.getProduct());


//Producto con código repetido
productos.addProduct('remera rockera123', 'remera negra con imagenes de Backstreet Boys', 10000, 'imagen remera Backstreet Boys', 'abc125', 459);


//Productos por ID(a partir del 4 no se va a encontrar!!!)
productos.getProductById(4);