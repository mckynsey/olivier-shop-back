//recuperation des dependances

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("./database/configDB");
// on indique que nous allons utiliser express
app.use(express.json());
// on accepte les requetes de toutes origines 
app.use(
    cors({
    origin: "*",
})
);
//on indique que l'applicaiton va ecouter sur le port 5000
app.listen(5000, () => {
    console.log("App listening on port 5000");
});

