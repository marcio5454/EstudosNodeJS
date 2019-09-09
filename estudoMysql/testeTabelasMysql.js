const Sequelize = require("sequelize")
const sequelize = new Sequelize("teste", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
})

const Postagem = sequelize.define("postagens", {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

//Postagem.create({ titulo: "Primeira Postagem", conteudo: "postado!" })

const Usuario = sequelize.define("usuario", {
    nome: { type: Sequelize.STRING },
    sobrenome: { type: Sequelize.STRING },
    idade: { type: Sequelize.INTEGER },
    email: { type: Sequelize.STRING }
})

//Usuario.create({ nome: "Marcio", sobrenome: "Alves", idade: 37, email: "marcio.5454@gmail.com" })