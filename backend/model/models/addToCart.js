const database = require("../index");

module.exports = (sequalize, Sequelize) => {
    const addToCart = sequalize.define("cart", {
        productId: {
            type: Sequelize.STRING,
        },
        userId:{
            type: Sequelize.STRING,
        }
    })
    return addToCart;
}