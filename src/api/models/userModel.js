const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
  nomdecompte: {
    type: String,
    required: "Le Nom de compte est requis"
  },
  password: {
    type: String,
    required: "Le mot de passe est requis"
  },
  description: {
    type: String,
  },
  photo: {
      type: String,
  }
});

module.exports = mongoose.model('User', user);