const Room = require('../models/roomModel');
const bcrypt = require('bcrypt');

exports.create_a_room = (req, res) => {
    let new_room = new Room(req.body);
    new_room.save((error, room) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(201);
        res.json(room);
      }
    })
  }

  exports.list_all_rooms = (req, res) => {
    Room.find((error, result) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json(result)
      }
    })
}