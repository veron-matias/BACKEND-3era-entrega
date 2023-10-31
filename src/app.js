import express from "express"
import ProductManager from './productManager.js';
const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }))

const manager = new ProductManager('./products.json');
//endpoint
app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const products = await manager.getProducts();

        if (limit > 0) {
            res.send({ result: 'MOSTRANDO', data: products.slice(0, limit) });
        } else {
            res.send({ result: 'MOSTRANDO:', data: products });
        }
    } catch (error) {
        res.send({ result: 'Error', message: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await manager.getProductById(productId);
        res.send({ result:'Mostrando: ', data: product });
    } catch (error) {
        res.send({ result:'Error', message:'producto no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor express activo en puerto ${PORT}`)

});
