'use strict';

module.exports.getProductsList = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(),
  };
};

module.exports.getProductById = async (event) => {
    const id = event;
    return {
        statusCode: 200,
        body: JSON.stringify({event}),
    };
};
