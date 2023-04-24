const fs = require('fs')

class ProductManager {
    constructor () {
        this.path = "./productos.txt";
        this.bajos = [];
    }

    static id = 0; 

    addProduct = async (id, title, description, price, thumbnail, code, stock) => {

        ProductManager.id ++;

        let newProduct = {
            id: ProductManager.id, 
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        };

        this.bajos.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(this.bajos));
    };

    respProduct = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.respProduct()
        return console.log(respuesta2)
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.respProduct()
        if (!respuesta3.find(bajos => bajos.id === id)){
            console.log('Producto no encontrado')
        } else {
            console.log(respuesta3.find(bajos => bajos.id === id))
        }
        
    };
    
    deleteProduct = async (id) => {
        let respuesta3 = await this.respProduct()
        let eliminarProducto = respuesta3.filter(bajos => bajos.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(eliminarProducto))
    };

    updateProduct = async ({ id, ...producto }) => {
       await this.deleteProduct(id);
       let productoNew = await this.respProduct()
       let prodModificado = [{ id, ...producto }, ...productoNew]
       await fs.promises.writeFile(this.path, JSON.stringify(prodModificado))
    }

}

const productos = new ProductManager

//Productos agregados al archivo
// productos.addProduct("Bajo Fender Jazz Bass", "Bajo elaborado en EEUU con mango de palo de rosa", 5000, "Imagen Fender Jazz Bass", "abc123", 45);

// productos.addProduct("Bajo Ibañez", "Bajo elaborado en EEUU con mango de palo de rosa de 5 cuerdas", 6000, "Imagen Fender Jazz Bass", "abc1234", 56);

// productos.addProduct("Bajo Fender Bass Presition", "Bajo elaborado en EEUU con mango de maple", 7000, "Imagen Fender Jazz Bass", "abc1235", 37);

// productos.getProducts()
// productos.getProductsById()
// productos.deleteProduct()
productos.updateProduct({
    id:3,
    title:"Bajo elaborado en EEUU con mango de maple",
    description:122000,
    price:"Imagen Fender Jazz Bass",
    thumbnail:"abc1235",
    code:37
})