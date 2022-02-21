const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', '05112002', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;