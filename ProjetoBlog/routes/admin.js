const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagens")
const Postagem = mongoose.model("postagens")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", eAdmin, (req, res) => {
    res.render("admin/index")
})


router.get("/posts", eAdmin, (req, res) => {
    res.send("Página de posts")
})


router.get("/categorias", eAdmin, (req, res) => {
    Categoria.find().sort({ date: "desc" }).then((result) => {
        res.render("admin/categorias", { categorias: result })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})


router.get("/categorias/add", eAdmin, (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", eAdmin, (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido!" })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido!" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno!" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    } else {

        const NovaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(NovaCategoria).save().then(() => {
            var mensagem = "Categoria salva com sucesso!"
            console.log(mensagem)
            req.flash("success_msg", mensagem)
            res.redirect("/admin/categorias")
        }).catch((err) => {
            var erro = "Erro ao tentar salvar a categoria: " + err
            console.log(erro)
            req.flash("error_msg", erro)
        });
    }
})


router.get("/categorias/edit/:id", eAdmin, (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((result) => {
        if (result == null) {
            req.flash("error_msg", "esta categoria não existe")
            res.redirect("/admin/categorias")
        } else {
            res.render("admin/editcategorias", { categoria: result })
        }
    }).catch((err) => {
        req.flash("error_msg", "Erro ao tentar editar uma categoria: " + err.message)
        res.redirect("/admin/categorias")
    })
})


router.post("/categorias/edit", eAdmin, (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido!" })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido!" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno!" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    } else {

        Categoria.findOne({ _id: req.body.id }).then((result) => {
            result.nome = req.body.nome
            result.slug = req.body.slug

            result.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso")
                res.redirect("/admin/categorias")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
                res.redirect("/admin/categorias")
            })

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria." + err.message)
            res.redirect("/admin/categorias")
        })
    }
})


router.post("/categorias/deletar", eAdmin, (req, res) => {
    console.log("deletar categoria")
    Categoria.remove({ _id: req.body.id }).then(() => {
        var texto = "Categoria deletada com sucesso!"
        console.log(texto)
        req.flash("success_msg", texto)
        res.redirect("/admin/categorias")
    }).catch((err) => {
        var texto = "Houve um erro ao deletar a categoria"
        console.log(texto)
        req.flash("error_msg", texto)
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", eAdmin, (req, res) => {
    Postagem.find().populate("categoria").sort({ data: "desc", hora: "desc" }).then((result) => {
        res.render("admin/postagens", { postagens: result })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens: " + err.message)
        res.redirect("/admin")
    })
})

router.get("/postagens/add", eAdmin, (req, res) => {
    Categoria.find().then((result) => {
        res.render("admin/addpostagem", { categorias: result });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário: " + err.message)
        res.redirect("/admin")
    })
})


router.post("/postagens/nova", eAdmin, (req, res) => {
    var erros = []
    if (req.body.categoria == 0) {
        erros.push({ texto: "Categoria inválida! registre uma categoria." })
    }

    if (erros.length) {
        res.render("admin/addpostagem", { erros: erros })
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem: " + err.message)
            res.redirect("/admin/postagens/add")
        })
    }
})

router.get("/postagens/edit/:id", eAdmin, (req, res) => {
    Postagem.findOne({ _id: req.params.id }).then((resultPostagem) => {

        Categoria.find().then((resultCategorias) => {
            let categs = []
            resultCategorias.forEach(cat => {
                let item = { id: cat.id, nome: cat.nome }
                item.selected = cat.id == resultPostagem.categoria
                categs.push(item)
            })
            res.render("admin/editpostagens", { categorias: categs, postagem: resultPostagem })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias: " + err.message)
            res.redirect("/admin/postagens")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição: " + err.message)
        res.redirect("/admin/postagens")
    })
})

router.post("/postagem/edit", eAdmin, (req, res) => {

    Postagem.findOne({ _id: req.body.id }).then((result) => {
        result.titulo = req.body.titulo
        result.slug = req.body.slug
        result.descricao = req.body.descricao
        result.conteudo = req.body.conteudo
        result.categoria = req.body.categoria

        result.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a edição")
            res.redirect("/admin/postagens")
        })
    }).catch((err) => {
        req.flash("error_msg", "Erro interno: " + err.message)
        res.redirect("/admin/postagens")
    })

})


router.get("/postagens/deletar/:id", eAdmin, (req, res) => {
    Postagem.remove({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Postagem deletada")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", "Erro interno: " + err.message)
        res.redirect("/admin/postagens")
    })
})

module.exports = router