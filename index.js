let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Conectado ao DB com sucesso!"));

app.use(express.static(__dirname + "/public"));

// ===========================================================================================================

const Schema = mongoose.Schema;

const filmeSchema = new Schema({
  filme: String,
  nota: Number,
});

const Filme = mongoose.model("Filme", filmeSchema);

app
  .route("/")
  .get((req, res) => {
    res.sendFile(__dirname + "/index.html");
  })
  .post((req, res) => {
    let { nome, nota } = req.body;
    let filme = new Filme({ filme: nome, nota: nota });

    filme.save((err, data) => {
      if (err) console.log(err);
      console.log(data);
    });

    res.redirect("/");
  });

app.get("/filmes", (req, res) => {
  Filme.find({}, (err, documents) => {
    res.json(documents);
  });
});

app.post("/filmes/:id", (req, res) => {
  Filme.findByIdAndDelete(req.params.id, (err, removed) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (!removed) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.redirect("/");
  });
});

app.listen(8001, console.log("Servidor rodando com sucesso!"));
