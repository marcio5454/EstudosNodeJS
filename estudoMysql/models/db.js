//config mysql
const Sequelize = require("sequelize")
const sequelize = new Sequelize("postapp", "root", "12345", { host: "localhost", dialect: "mysql" })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}