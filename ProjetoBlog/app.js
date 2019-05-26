// carregando módulos
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const routeAdmin = require("./routes/admin")
    //const monggose = require("mongoose")
const path = require("path")


// configurações
//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
    //handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
    //mongoose


//rotas
app.use("/admin", routeAdmin)
app.use(express.static(path.join(__dirname + "/public")))

//outros
const port = 3000
app.listen(port, () => {
    console.log("Servidor rodando na porta " + port + ".")
})