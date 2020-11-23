const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let room = new Schema({
    nomderoom : {
        type : String,
        Required: "Le nom de la rom est requise"
    },
    iduseradmin : {
        type : String,
        Required: "Un créateur de room est recquis"
    },
    live : {
        type : Boolean,
        default : false
    },
    users : {
        type : [String],
    }
});

module.exports = mongoose.model('Room', room);
