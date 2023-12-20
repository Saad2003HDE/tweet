const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require('body-parser');
const navigation = require("./routes");

require("./database");

const app = express();
const utilisateurs = []; // Assurez-vous d'avoir initialisé vos variables utilisateurs et contenuPublie
const contenuPublie = [];


// Configurer le moteur de modèle Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, "public")));

// Analyser le corps des requêtes en JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser le middleware de journalisation avec Morgan
app.use(morgan("dev"));

// Utiliser le middleware de navigation (si nécessaire)
app.use(navigation);

// Démarrer le serveur sur le port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
