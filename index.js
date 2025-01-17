// //recuperation des dependances

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");

// require("./database/configDB");
// // on indique que nous allons utiliser express
// app.use(express.json());
// // on accepte les requetes de toutes origines 
// app.use(
//     cors({
//     origin: "*",
// })
// );
// //on indique le chemin des routes 
// const routes = require("./routes/products");
// //on dit quon lutiise dans lapplication 
// app.use(routes)

// //on indique que l'applicaiton va ecouter sur le port 5000
// app.listen(5000, () => {
//     console.log("App listening on port 5000");
// });
const express = require("express");
const cors = require("cors");
const app = express();
const articlesRoutes = require("./routes/articles");
const paniersRoutes = require('./routes/paniers'); // Importez les routes du panier

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Olivier API !");
});

app.use("/articles", articlesRoutes);
app.use('/paniers', paniersRoutes); // Utilisez les routes du panier

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

