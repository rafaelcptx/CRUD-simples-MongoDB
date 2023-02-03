let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:8001/Filmes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Conectado ao DB com sucesso!"));

app.use(express.static(__dirname + "/public"));

app
  .route("/")
  .get((req, res) => {
    res.sendFile(__dirname + "/index.html");
  })
  .post((req, res) => {
    let { filme, nota } = req.body;

    console.log(filme);
    console.log(nota);
  });

app.listen(8001, console.log("Servidor rodando com sucesso!"));
