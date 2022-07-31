'use strict';
const { getClient } = require('./utils/getClient');

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

module.exports.getProductsList = async (event) => {
    console.log(`getProductsList. Event: ${event}`)
    const client = getClient();
    await client.connect();

    try {
        const { rows } = await client.query(`
            select pm.id, pm.title, pm.description, pm.price, s.count
            from  product_model pm 
            inner join stock s 
            on pm.id = s.product_id
        `);

        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify(rows),
        };
    } catch (e) {
        console.log('error during database request', e)
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({ message: 'Server error' })
        }
    } finally {
        client.end();
    }

};

module.exports.getProductById = async (event) => {
    console.log(`getProductById. Event: ${event}`);
    const id = event.pathParameters.productId;
    const client = getClient();
    await client.connect();
    const query = `
        SELECT id, title, description, price 
        FROM product_model 
        WHERE id = '${id}'
    `;

    try {
        const { rows } = await client.query(query);

        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify(rows)
        };
    } catch (e) {
        console.log('error during database request', e);

        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({ message: 'Server error' })
        }
    } finally {
        client.end();
    }
};

module.exports.createProduct = async (event) => {
    const { title, description, price } = JSON.parse(event.body);
    console.log(`createProduct. Event: ${event}`)
    const client = getClient();
    await client.connect();

    try {
        if (!title || !description || !price) {
            return {
                statusCode: 400,
                headers: CORS_HEADERS,
                message: 'invalid data'
            }
        }
        await client.query(`
            insert into product_model(title, description, price) values
            ('${title}', '${description}', ${price})
        `);

        return {
            statusCode: 200,
            headers: CORS_HEADERS
        }
    } catch (e) {
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            message: 'something went wrong'
        }
    } finally {
        client.end();
    }
}
