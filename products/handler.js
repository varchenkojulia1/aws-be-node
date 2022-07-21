'use strict';
const productService = require('./service/products.service')

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

module.exports.getProductsList = async () => {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(productService.getProducts()),
  };
};

module.exports.getProductById = async (event) => {
    const id = event.pathParameters.productId;
    const product = productService.getProductById(id);

    if(!product) {
        return {
            statusCode: 400,
            headers: CORS_HEADERS,
            body: 'No product with this ID'
        }
    }

    return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify(product)
    };
};
