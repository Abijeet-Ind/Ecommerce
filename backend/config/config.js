module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    port: 3306,

    // set your database name here => DB: "database name"
    DB: "e_commerce",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};