const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function() {
    console.log("Conectado ao bancod e dados com sucesso!")
}).catch(function(erro) {
    console.log("falha ao se conectar:" + erro)
})