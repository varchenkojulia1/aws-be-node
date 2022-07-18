'use strict';
const productService = require('./service/products.service')

module.exports.getProductsList = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(productService.getProducts()),
  };
};

module.exports.getProductById = async (event) => {
    const id = event.pathParameters.productId;
    const product = productService.getProductById(id);

    if(!product) {
        return {
            statusCode: 400,
            body: 'No product with this ID'
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(product)
    };
};
