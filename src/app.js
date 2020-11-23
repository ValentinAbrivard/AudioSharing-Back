const express = require('express');
const server = express();
const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');
const path = require('path');
mongoose.connect('mongodb://mongo/apinodeipssi');
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());

server.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

const userRoute = require('./api/routes/userRoute');
userRoute(server);

const roomRoute = require('./api/routes/roomRoute');
roomRoute(server);


server.listen(port, hostname);