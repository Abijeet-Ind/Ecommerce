const database = require('./../index');

module.exports = (sequelize, Sequelize) => {
    const bought = sequelize.define("order", {
        userId:{
            type: Sequelize.STRING,
        },
        address:{
            type: Sequelize.STRING,
        },
        productId:{
            type: Sequelize.STRING
        },
        areaDescription:{
            type:Sequelize.STRING
        }
    })
    return bought;
}