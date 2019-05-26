const express = require("express")
const app = express()
const port = 3000

const handlebars = require("express-handlebars")
app.set("view engine", "handlebars")



const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Postagem = require("./models/Postagem")

app.engine("handlebars", handlebars({ defaultLayout: "main" }))


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/postagem", (req, res) => {
    Postagem.findAll({
        order: [
            ["titulo", "asc"]
        ]
    }).then((postagens) => {
        res.render("postagem/postagens", { posts: postagens })
    })
})

app.get("/postagem/cad?:id", (req, res) => {

    res.render("postagem/postagem_cad")
})

app.get("/postagem/del?:id", (req, res) => {
    Postagem.destroy({ where: { "id": req.query.id } }).then(() => {
        res.redirect("/postagem")
    }).catch((err) => {
        res.send("erro!")
    })
})

app.post("/postagem/save", (req, res) => {
    //res.send({ postagem: { id: req.body.id, titulo: req.body.titulo, conteudo: req.body.conteudo } })
    //new Postagem({ id: req.body.id, titulo: req.body.titulo, conteudo: req.body.conteudo } ).save
    var dados = {
        titulo: req.body.titulo,
        texto: req.body.texto
    }
    if (req.body.id == "") {
        Postagem.create(dados).then((result) => {
            console.log("registro salvo com sucesso!")
        }).catch((err) => {
            console.log("erro na gravação do registro: " + err)
        });
    } else {
        Postagem.save(dados)
    }
    res.redirect("/postagem")

})



app.listen(port, () => {
    console.log("aplicativo \"handlesbars\" conectado")
})