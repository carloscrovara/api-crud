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
  user: "php-user",
  password: "php-pass",
  database: "contactoslaborales",
});
//conectamos a la base de datos
connection.connect(function (err) {
  if (err) throw err;
  console.log("base de datos conectada");
});

//rutas
app.get("/contactos", function (req, res) {
  connection.query("SELECT * FROM listadocontactos", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/contactos/:id", function (req, res) {
  connection.query(
    "SELECT * FROM listadocontactos WHERE id=?",
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
    let params = req.body;
    console.log(params);

    connection.query('INSERT INTO listadocontactos SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
});

app.put("/contactos/edita/:id", function (req, res) {
    connection.query('UPDATE listadocontactos SET nombre=?, apellido=?, sector=?, telefono=? WHERE id=?', [req.body.nombre, req.body.apellido, req.body.sector, req.body.telefono, req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json(results); })
});

app.delete("/contactos/eliminar/:id", function (req, res) {
  
    connection.query(
        "DELETE FROM listadocontactos WHERE id=?",
        [req.params.id],
        function (error, results, fields) {
          if (error) throw error;
    
            res.json(results);
           }
      );


});

//server
app.listen(3000, function () {
  console.log("Servidor Activo");
});
