const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const addToCart = sequelize.define("favourite", {
        productId: {
            type: Sequelize.STRING,
        },
        userId:{
            type: Sequelize.STRING,
        }
    })
    return addToCart;
}