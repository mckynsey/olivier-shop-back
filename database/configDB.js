//recuperation de la dependance 
const mysql = require('mysql2');

//creation de la connexion a la base de donnees avec identifiants
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sebo3@XXX',
    database: 'olivo-shop',
});

//connexion a la base de donnees
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});
module.exports = connection;