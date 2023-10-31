import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    async    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
            this.currentId = this.calculateNextId();
        } catch (error) {
            this.products = [];
            this.currentId = 1;
        }
    }

async  saveProducts() {
        fs.writeFileSync(
            this.path,
            JSON.stringify(this.products, null, 2),
            "utf-8"
        );
    }

async    addProduct(product) {
        product.id = this.currentId++;
        this.products.push(product);
        this.saveProducts();
    }

    async    getProducts() {
        return this.products;
    }

    // async    getProductById(id) {
    //     return this.products.find((product) => product.id === id);
    // }

    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);
    
        if (!product) {
            throw new Error('Producto no encontrado');
        }
    
        return product;
    }

    async    updateProduct(id, newData) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...newData };
            this.saveProducts();
            return this.products[index];
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    calculateNextId() {
        if (this.products.length === 0) {
            return 1;
        }

        const maxId = Math.max(...this.products.map((product) => product.id));
        return maxId + 1;
    }
}

export default ProductManager;