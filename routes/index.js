const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const User = require("../database/models/user.model");

// Exemple de route pour la déconnexion
router.get('/deconnecter', (req, res) => {
  // Logique de déconnexion (effacer les cookies, etc.)
  res.redirect('/');
});

router.get('/deconnecter', (req, res) => {
  res.render('deconnexion', { page: 'deconnexion' });
});

// Utilisez une base de données ou un autre moyen de stocker les publications
const contenuPublie = [];

// Afficher la page d'accueil avec les publications
router.get('/', (req, res) => {
  console.log(contenuPublie);
  res.render('home', { page: 'home', contenuPublie });
});

// Afficher la page de connexion
router.get("/afficher-connexion", (req, res) => {
  res.render("login", {});
});

// Afficher la page d'inscription
router.get("/afficher-inscription", (req, res) => {
  res.render("register", {});
});

// Gérer la soumission du formulaire de connexion
router.post("/connecter", (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .exec()
    .then((document) => {
      if (document && document.password === body.password) {
        res.render("home", { user: document, contenuPublie });
      } else {
        res.render("login", {
          errors: ["Le mot de passe est incorrect!"],
        });
      }
    })
    .catch((err) => {
      const errorsKeys = Object.keys(err.errors);
      const mesErreurs = [];
      errorsKeys.forEach((key) => {
        mesErreurs.push(err.errors[key].message);
      });
      res.render("login", { errors: mesErreurs });
    });
});

const postInscription = async (req, res, next) => {
  const { nom, prenom, email, password } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await email.findOne({ email });

    if (existingUser) {
      return res.render("register", { errors: ["Email déjà utilisé par un autre utilisateur."] });
    }

    // Vérifier si tous les champs sont remplis
    if (!nom || !prenom || !email || !password) {
      return res.render("register", { errors: ["Veuillez remplir tous les champs."] });
    }

    // Créer un nouvel utilisateur
    const newUser = new email({ nom, prenom, email, password });

    // Enregistrer le nouvel utilisateur
    await newUser.save();

    // Rediriger vers la page de connexion
    res.redirect("/afficher-connexion");
  } catch (err) {
    // Vérifier si err a une propriété errors
    const errorsKeys = err && err.errors ? Object.keys(err.errors) : [];
    const mesErreurs = [];

    errorsKeys.forEach((key) => {
      mesErreurs.push(err.errors[key].message);
    });

    res.render("register", { errors: mesErreurs });
  }
};




// Utilisation de la route
router.post("/enregistrer", postInscription);

// Route pour publier du contenu
router.get('/post/publier', (req, res) => {
  res.render('post', { page: 'post' });
});

router.post('/post/publier', [
  // Validation des champs
  body('contenu').notEmpty().withMessage('Le contenu ne peut pas être vide'),
], (req, res) => {
  // Gestion des erreurs de validation
  const errors = validationResult(req);
  console.log('Validation errors:', errors.array());

  if (!errors.isEmpty()) {
    return res.render('post', { page: 'post', errors: errors.array() });
  }

  const { contenu } = req.body;
  console.log('Contenu de la publication:', contenu);

  // Ajouter la publication à la liste des publications
  const nouvellePublication = { contenu };

  // Si une image a été téléchargée, ajoutez également l'URL de l'image à la publication
  if (req.file) {
    nouvellePublication.imageURL = `/chemin/vers/dossier/images/${req.file.filename}`;
    console.log('Image téléchargée. URL de l\'image:', nouvellePublication.imageURL);
  }

  contenuPublie.push(nouvellePublication);

  // Rediriger l'utilisateur vers la page d'accueil avec les publications mises à jour
  res.redirect('/');
});

// ... (autres routes)

module.exports = router;
