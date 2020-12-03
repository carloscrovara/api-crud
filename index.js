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
app.get("/", function(req,res){
    res.json("llegué hasta acá");
})


//server
app.listen(3000, function(){
    console.log("Servidor Activo")
})