// carregando módulos
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const routeAdmin = require("./routes/admin")
const routeUsuario = require("./routes/usuario")

const mongoose = require("mongoose")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagens")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")

const passport = require("passport")
require("./config/auth")(passport)

const db = require("./config/db")

// configurações

//sessão
app.use(session({
    secret: "cursonode",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//middleware
app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()
    })
    //body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
    //handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
    //mongoose
mongoose.Promise = global.Promise
console.log(db.mongoURI)
mongoose.connect(db.mongoURI, { useNewUrlParser: true }).then(() => {
        console.log("conectado ao mongodb")
    }).catch((err) => {
        console.log("Ocorreu um erro ao tentar se conectar ao mongodb: " + err)
    })
    //middleware
app.use((req, res, next) => {
    //console.log("oi, eu sou um middelware.")
    next()
})


//rotas
app.get("/", (req, res) => {
    Postagem.find().populate("categoria").sort({ data: "desc" }).then((result) => {
        res.render("index", { postagens: result })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno: " + err.message);
        res.redirect("/404")
    })
})
app.get("/404", (req, res) => {
    res.send("Erro 404!")
})

app.get("/posts", (req, res) => {
    res.send("Lista de Posts")
})

app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).then((result) => {
        if (result) {
            res.render("postagem/index", { postagem: result })
        } else {
            req.flash("error_msg", "Esta postagem não existe.");
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno: " + err.message);
        res.redirect("/")
    })
})


app.get("/categorias", (req, res) => {
    Categoria.find().then((result) => {
        if (result) {
            res.render("categorias/index", { categorias: result })
        } else {
            req.flash("error_msg", "Esta postagem não existe.");
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno: " + err.message);
        res.redirect("/")
    })
})


app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).then((result) => {
        if (result) {
            Postagem.find({ categoria: result.id }).then((posts) => {
                res.render("categorias/postagens", { categoria: result, postagens: posts })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar as postagens: " + err.message);
                res.redirect("/categorias")
            })
        } else {
            req.flash("error_msg", "Esta categoria não existe.");
            res.redirect("/categorias")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno: " + err.message);
        res.redirect("/categorias")
    })
})


app.use("/admin", routeAdmin)
app.use("/usuarios", routeUsuario)
app.use(express.static(path.join(__dirname + "/public")))

//outros
//const port = 3000
const port = process.env.port || 3000
app.listen(port, () => {
    console.log("Servidor rodando na porta " + port + ".")
})