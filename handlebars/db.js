const Sequelize = require("sequelize")
const sequelize = new Sequelize("EstudosNodeJs", "root", "calix", { host: "localhost", dialect: "mysql" })

module.exports = { Sequelize, sequelize }