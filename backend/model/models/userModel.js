const database = require('../index');

module.exports = (sequelize, Sequelize) => {
    const listItems = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING, 
        }
    })
    return listItems;
}
