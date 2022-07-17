import { products } from './products.js'

export function getProducts() {
    return products;
}

export function getProductById(id) {
    return products.find((product) => product.id === id);
}
