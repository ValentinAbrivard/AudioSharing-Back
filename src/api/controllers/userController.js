const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Room = require('../models/roomModel');

exports.list_all_users = (req, res) => {
    User.find((error, result) => {
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


exports.create_a_user = (req, res) => {
    let new_user = new User(req.body);
    let new_room = new Room(req.body);
    let password = req.body.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    new_user.password = hash;
    //association de la roomID au user
    new_user.idRoom =  new_room._id;
    //Sauvegarde du nouveau user
    new_user.save((error, user) => {
      if (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      } else {
        res.status(201);
        new_room.iduseradmin = new_user._id;
        new_room.nomderoom = new_user.nomdecompte;
        new_room.save((error, room) => {
            if(error){
                res.status(500);
                console.log(error);
                res.json({message: "Erreur serveur."})
            }
            else{
                res.status(201);
                //res.json(room);
            }
        })
        res.json(user);
      }
    })
}


exports.user_login = (req, res) => {
    let {body} = req;
    // let body = req.body
  
    User.findOne({nomdecompte: body.nomdecompte})
    
    .then(user => {
      let hash = user.password;
      var result = bcrypt.compareSync(body.password, hash); // true
      if(result){
        res.status(200);
        res.json(user)
        let userData = {
          nomdecompte: user.nomdecompte,
        }
        
      }
      else{
        res.status(500);
        res.json({message: "Error serveur identifiants"})
      }
    })
    .catch(error => {
      res.status(403);
      res.json({message: "identifiants incorrects."})
    })
  }