var http = require("http");
var calback = function (req, res)
{
    res.end("Servidor Rodando!!!");
}


http.createServer(calback).listen(1342);
console.log("Servidor em Execução")
