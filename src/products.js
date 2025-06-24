let products = [
    {
        "id": 1,
        "name": "Gelas",
        "price": 10.000,
        "photo_url": "https://image1ws.indotrading.com/s3/productimages/webp/co205354/p923533/w600-h600/5e50fba5-3882-4d5c-8ff0-a367df004d46.png"
    },
];

function getAllProducts() {
    return products;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function createProduct(product) {
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = { id: lastId + 1, ...product };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, updatedProduct) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
}

function deleteProduct(id) {
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    return products.length !== initialLength;
}

module.exports = {
    products,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};