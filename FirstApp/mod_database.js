const Sequelize = require("sequelize")


var init = function() {
    var sequelize = new Sequelize("TesteNodeJs", "root", "calix", {
        host: "localhost",
        dialect: "mysql"
    });

    sequelize.authenticate().then(
        function() {
            console.log("Conectado com sucesso");
        }
    ).catch(
        function(erro) {
            console.log("Erro ao tentar conectar no banco de dados:")
            console.log(erro)
        }
    )
    return sequelize;
}


module.exports = {
    init
}