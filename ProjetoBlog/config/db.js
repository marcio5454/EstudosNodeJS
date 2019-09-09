var uri = "mongodb://localhost/blogapp"
if (process.env.NODE_ENV == "production") {
    uri = "mongodb://endereço web"
}

module.exports = { mongoURI: uri }