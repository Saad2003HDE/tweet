const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  nom: {
    type: String,
    minlength: [2, "Votre nom doit contenir au moins 2 caractères."],
    required: [true, "Le nom est requis."],
  },
  prenom: {
    type: String,
    minlength: [2, "Votre prénom doit contenir au moins 2 caractères."],
    required: [true, "Le prénom est requis."],
  },
  email: {
    type: String,
    required: [true, "L'email est requis."],
    unique: [true, "Un compte lié à cet email existe déjà."],
  },
  password: {
    type: String,
    minlength: [8, "Votre mot de passe doit contenir au moins 8 caractères!"],
    required: [true, "Le mot de passe est obligatoire."],
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  // Champ pour représenter l'état de l'abonnement
  subscribed: { type: Boolean, default: false },
  // Liste des abonnements de l'utilisateur
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const User = mongoose.model("user", userSchema);

module.exports = User;
