const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/posts", (req, res) => {
    res.send("Página de posts")
})

router.get("/categorias", (req, res) => {
    res.render("admin/categorias")
})

router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {
    const NovaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(NovaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso.")
    }).catch((err) => {
        console.log("Erro ao tentar salvar o registro: " + err)
    });
})

module.exports = router