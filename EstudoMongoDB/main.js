const mongoose = require("mongoose");
const database = "EstudoNodeJS"
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/" + database, { useNewUrlParser: true }).then((result) => {
    console.log("Banco de dados mongodb \"" + database + "\" conectado.")
}).catch((err) => {
    console.log("Erro ao tentar se conectar ao banco de dados mongodb \"" + databse + "\": " + err)
});

const UsuarioSchema = mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: true },
    email: { type: String, require: true },
    idade: { type: Number, require: true },
    pais: { type: String }
})

mongoose.model("usuario", UsuarioSchema)


var usuario = mongoose.model("usuario")
new usuario({
    nome: "marcio",
    sobrenome: "Alves",
    email: "marcio.5454@gmail.com",
    idade: 37,
    pais: "Brasil"
}).save().then(() => {
    console.log("usuario criado com sucesso.")
}).catch((err) => {
    console.log("houve um erro ao tentar salvar o usuário: " + err)
})


