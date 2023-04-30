import express from "express";
import ProductManager from "./component/ProductManager02.js";

const app = express()
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const respProduct = productos.respProduct();


app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await respProduct)
    let allProduct = await respProduct;
    let productLimit = allProduct.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProduct = await respProduct;
    let productsById = allProduct.find(bajos => bajos.id === id);
    res.send(productsById);
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express for local host ${server.address().port}`)
});
server.on('error', (error) => console.log(`Error del servidor ${error}`));