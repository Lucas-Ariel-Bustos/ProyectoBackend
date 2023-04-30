import fs from 'fs';
// const fs = require('fs')
// import { promises as fs } from "fs";

export default class ProductManager {
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

// const productos = new ProductManager();

//Productos agregados al archivo
// productos.addProduct("Bajo Fender Jazz Bass", "Bajo elaborado en EEUU con mango de palo de rosa", 5000, "Imagen Fender Jazz Bass", "abc123", 45);

// productos.addProduct("Bajo Ibañez", "Bajo elaborado en EEUU con mango de palo de rosa de 5 cuerdas", 6000, "Imagen Fender Jazz Bass", "abc124", 56);

// productos.addProduct("Bajo Fender Bass Presition", "Bajo elaborado en EEUU con mango de maple", 7000, "Imagen Fender Bass Presition", "abc125", 37);

// productos.addProduct("Bajo Fernandes Bass Presition", "Bajo elaborado en México con mango de maple", 7500, "Imagen Fernandes Bass Presition", "abc126", 31);

// productos.addProduct("Bajo Javier Lopez Series", "Bajo elaborado en Mendoza, Argentina, con mango de palo de rosa", 7999, "Imagen Javier Lopez Series", "abc127", 6);

// productos.addProduct("Bajo Javier Lopez Deluxe", "Bajo elaborado en Mendoza, Argentina, con mango de maple", 8500, "Imagen Javier Lopez Deluxe", "abc128", 12662159);

// productos.addProduct("Bajo F-Bass Zonda Clasic", "Bajo elaborado en Mendoza, Argentina, con mango de palo de rosa", 9999, "Imagen F-Bass Zonda Clasic", "abc129", 8);

// productos.addProduct("Bajo Squier Jazz Bass", "Bajo elaborado en China, con mango de palo de rosa", 5500, "Imagen Squier Jazz Bass", "abc130", 21);

// productos.addProduct("Bajo Squier Bass Presition", "Bajo elaborado en China, con mango de maple", 6700, "Imagen Squier Bass Presition", "abc131", 28);

// productos.addProduct("Bajo SDGR", "Bajo elaborado en China, con mango de maple", 4500, "Imagen F-Bass Zonda Clasic", "abc132", 20);

// productos.getProducts()
// productos.getProductsById()
// productos.deleteProduct()
// productos.updateProduct({
//     id:3,
//     title:"Bajo elaborado en EEUU con mango de maple",
//     description:122000,
//     price:"Imagen Fender Jazz Bass",
//     thumbnail:"abc1235",
//     code:37
// })