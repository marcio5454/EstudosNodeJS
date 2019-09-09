//express
const express = require('express')
const app = express()
const port = 3000

//include handlebars
const handlebars = require("express-handlebars")
const hbs = handlebars.create({
    helpers: {
        /*
        replace: (originalValue, oldValue, newValue) => {
            return originalValue.replace(oldValue, newValue)
        }
        */
    },
    defaultLayout: "main"
})

//include body-parser
const bodyParser = require("body-parser")

//include models
const Post = require("./models/Posts")


//config handlebars
//app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());




//rotas
app.get("/cad", (req, res) => {
    res.render("formulario")
})

app.post("/add", (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        //res.send("Post criado com sucesso")
        res.redirect("/")
    }).catch((erro) => {
        res.send("Houve um erro: " + erro)
    })
})

app.get("/", (req, res) => {
    Post.findAll({
        order: [
            ["createdAt", "desc"]
        ]
    }).then((posts) => {
        res.render("home", { posts: posts })
    })
})




//start express
app.listen(port, () => {
    console.log("Servidor rodando na porta " + port + ".")
});

//app.get('/', (req, res) => res.send('Hello World!'))
//app.listen(port, () => console.log(`Example app listening on port port!`))