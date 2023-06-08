const dbConfig = require("./../config/config");

const {
    Sequelize,
    DataTypes
} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./models/productModel')(sequelize, DataTypes);
db.users = require('./models/userModel')(sequelize, DataTypes);
db.carts = require('./models/addToCart')(sequelize, DataTypes);
db.favs = require('./models/fav')(sequelize, DataTypes);

// relation
db.users.hasMany(db.products);
db.products.belongsTo(db.users);

/* end role */

db.sequelize.sync({
    force: false
}).then(() => {
    console.log("yes re-sync done");
});


module.exports = db;