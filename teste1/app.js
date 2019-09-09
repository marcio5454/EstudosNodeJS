const app = require("express")()
const port = 12345


function get(action, params) {
    var page = action[action.length - 1] == "/" ? action + "index.html" : action + ".html";
    var act = action;
    if (params != null) {
        if (action[action.length - 1] == "/") {
            act = action.substr(0, action.length - 1)
        }
        act = act + params;
    }
    app.get(act, function(req, res) {
        res.sendFile(__dirname + "/views/" + page)
    })
}

get("/")

get("/index")

get("/teste/", "/:a/:b")

get("/teste/", "?:nome?:idade")

get("/teste/novo")

app.listen(port, function() {
    console.log("Rodando na porta " + port + ".")
})