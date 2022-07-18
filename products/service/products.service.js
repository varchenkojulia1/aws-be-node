const { products } = require('./products');

function getProducts() {
    return products;
}

function getProductById(id) {
    return products.find((product) => product.id === id);
}

module.exports = { getProducts, getProductById };
