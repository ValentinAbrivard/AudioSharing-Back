const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.get_a_user = (req, res) => {
    let {user_id} = req.params;
    User.findById(user_id, (error, user) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(user);
        }
    })
}

exports.delete_a_user = (req, res) => {
    let {user_id} = req.params;
    User.findById(user_id, (error, user) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(user);
        }
    }).remove().exec();
}

exports.user_login = (req, res) => {
  let {body} = req;
  // let body = req.body
  console.log("login");
  User.findOne({nomdecompte: body.nomdecompte})

  .then(user => {
    let hash = user.password;
    var result = bcrypt.compareSync(body.password, hash); // true
    if(result){
      res.status(200);
      res.json(user);
      console.log("LOGIN ----------");
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

exports.update_user = (req, res) => {
  let {user_id} = req.params;
  console.log(user_id);
  console.log(req.body);
  User.findByIdAndUpdate(user_id, req.body, {new: true}, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
}

exports.create_a_token_from_user = (req, res) => {
    User.findOne({nomdecompte: req.body.nomdecompte})
    .then(user => {
      let tokendata = {
        userid: user._id,
        username : user.nomdecompte
      };
      jwt.sign(tokendata, process.env.JWT_KEY, {expiresIn: '30 days'}, (error, token) => {
          if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
          }
          else {
            res.json(token);
            console.log("TOKEN ----------");
            console.log(token);
          }
        })
    })
  };
