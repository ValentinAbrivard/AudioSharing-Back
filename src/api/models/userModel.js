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
    default: ""
  },
  photo: {
      type: String,
      default: ""
  }
  // idRoom: {
  //     type: String
  // }
});

module.exports = mongoose.model('User', user);
