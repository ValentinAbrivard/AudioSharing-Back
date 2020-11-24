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

exports.get_a_room = (req, res) => {
    let {room_id} = req.params;
    Room.findById(room_id, (error, room) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(room)
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

exports.delete_a_room = (req, res) => {
    let {room_id} = req.params;
    Room.findById(room_id, (error, room) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(room);
        }
    }).remove().exec();
}

exports.add_user_in_room = (req, res) => {
    let {room_id} = req.params;
    let {user_id} = req.params;
    Room.findById(room_id, (error, room) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else {
            room.users.push(user_id);
            room.save((error, room) => {
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
    })
}

exports.delete_user_in_room = (req, res) => {
    let {room_id} = req.params;
    let {user_id} = req.params;
    Room.findById(room_id, (error, room) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else {
            let index = room.users.indexOf(user_id);
            console.log(room.users[index]);
            room.users.splice(index, 1);
            room.save((error, room) => {
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
    })
}

exports.change_name_room = (req, res) => {
  let {room_id} = req.params;
  Room.findByIdAndUpdate(room_id, req.body, {new: true}, (error, room) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json(room);
    }
  })
}

exports.live_room = (req, res) => {
  let {room_id} = req.params;
  Room.findById(room_id, (error, room) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      if (room.live) {
        room.live = false;
      } else {
        room.live = true;
      }
      room.save((error, room) => {
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
  })
}
