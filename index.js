let express = require("express");
let bodyParser = require("body-parser");
//express
let app = express();
//body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//rutas



app.get("/contactos", function(req, res){
    res.json("todos los contactos");
})

app.get("/contactos/:id", function(req, res){
    res.json("traer un contacto");
})

app.post("/contactos/alta", function(req, res){
    res.json("crear contacto");
})

app.put("/contactos/edita/:id", function(req, res){
    res.json("editar contacto");
})

app.delete("/contactos/eliminar/:id", function(req, res){
    res.json("eliminar contacto")
})

//server
app.listen(3000, function(){
    console.log("Servidor Activo")
})