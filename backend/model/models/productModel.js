const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const listItems = sequelize.define("products", {
        product: {
            type: Sequelize.STRING,
        },
        productPrice: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        slug: {
            type: Sequelize.STRING,
        },
        category:{
            type: Sequelize.STRING,
        },
        image:{
            type: Sequelize.STRING,
        },
        brand: {
            type: Sequelize.STRING,
        },

    })
    return listItems;
}