const Sequelize = require("sequelize")
var database = require("../mod_database")

function New(createDatabase) {
    var context = database.init()
    var model = context.define("usuario", {
        nome: { type: Sequelize.STRING },
        sobrenome: { type: Sequelize.STRING }
    })
    if (createDatabase) {
        model.sync({ force: true });
    }
    return model;
}

module.exports = {
    New
}