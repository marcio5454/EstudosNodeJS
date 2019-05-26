const db = require("../db")

const Postagem = db.sequelize.define("postagem", {
    titulo: db.Sequelize.STRING,
    texto: db.Sequelize.TEXT
})

module.exports = Postagem

//Postagem.sync({ force: true })