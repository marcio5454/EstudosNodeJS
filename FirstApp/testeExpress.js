//const express = require("express");
//const app = express();
const app = require("express")();
const port = 12345


var Usuario = require("./models/usuario")

var usuario = Usuario.New(false)

app.get("/", function(req, res) {
    /*
    res.send("<html>" +
        "<h2>Servidor rodando na porta " + port + "</h2>" +
        "<br>" +
        "<a href=\"sobre\">sobre</a>" +
        "</html>")
        */
    res.sendFile(__dirname + "/index.html")
})

app.get("/sobre", function(req, res) {
    res.send("<h1>Pagina Sobre</h1> <h2>aplicacao de teste!</h2>" +
        "<br>" +
        "<a href=\"/\">index</a>")
})

app.get("/ola?:cargo?:nome", function(req, res) {
    res.send("olá, " + req.query.nome + "." +
        "<br>" +
        "Seu cargo é " + req.query.cargo)
})

app.get("/ola/:cargo/:nome", function(req, res) {
    res.send("olá, " + req.params.cargo + "  " + req.params.nome)
})


function show(action, folder) {
    app.get("/" + action, function(req, res) {
        res.sendFile(__dirname + "/" + (folder ? action + "/index" : action) + ".html")
    })
}

show("teste");

show("about", true);



var callback = function() {
    console.log("Servidor em execução na porta " + port + "!")
}



app.listen(port, callback);