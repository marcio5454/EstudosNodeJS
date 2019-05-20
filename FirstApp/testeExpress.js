//const express = require("express");
//const app = express();
const app = require("express")();
const port = 12345


app.get("/", function(req, res){
    res.send("<html>" + 
    "<h2>Servidor rodando na porta " + port + "</h2>" + 
    "<br>" + 
    "<a href=\"sobre\">sobre</a>" + 
    "</html>")
})

app.get("/sobre", function(req, res){
    res.send("<h1>Pagina Sobre</h1> <h2>aplicacao de teste!</h2>" + 
    "<br>" + 
    "<a href=\"/\">index</a>")
})

app.get("/ola?:cargo?:nome", function(req, res){
    res.send("olá, " + req.query.cargo + " " + req.query.nome)
})

app.get("/ola/:cargo/:nome", function(req, res){
    res.send("olá, " + req.params.cargo +"  " + req.params.nome)
})


var callback = function (){
    console.log("Servidor em execução na porta " + port + "!")
}


app.listen(port, callback);

