let express = require("express");
let bodyParser = require("body-parser");
//express
let app = express();
//body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//mysql
let mysql = require("mysql2");

//generar conexion con base de datos
let connection = mysql.createConnection({
  host: "localhost", //127.0.0.1
  user: "root",
  password: "pepito123",
  database: "contactos",
});
//conectamos a la base de datos
connection.connect(function (err) {
  if (err) throw err;
  console.log("base de datos conectada");
});

//rutas
app.get("/contactos", function (req, res) {
  connection.query("SELECT * FROM gente", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/contactos/:id", function (req, res) {
  connection.query(
    "SELECT * FROM gente WHERE id=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length == 0) {
        res.json("no hay contacto");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/contactos/alta", function (req, res) {
  res.json("crear contacto");
});

app.put("/contactos/edita/:id", function (req, res) {
  res.json("editar contacto");
});

app.delete("/contactos/eliminar/:id", function (req, res) {
  res.json("eliminar contacto");
});

//server
app.listen(3000, function () {
  console.log("Servidor Activo");
});
