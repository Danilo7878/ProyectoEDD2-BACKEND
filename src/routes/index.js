const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Message = require('../models/message');

//peticiones de usuario
router.post('/signup', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    puesto: req.body.puesto,
    correo: req.body.correo
  });
  user
  .save().then(result => {
    res.status(201).json({createdUser:user});
  })
  .catch(err => {
    res.status(500).json({error:err});
  });
});

router.get('/login',(req,res) =>{

});

router.delete('/deleteCount', (req, res)=>{

});

router.get("/users", (req,res) =>{
  User.find
  .exec()
  .then(docs => {
    res.status(200).json({users:docs});
  })
  .catch(err =>{
    res.status(500).json({error:err});
  });
});

//peticiones de mensajes

router.get("/Conversation", (req, res)=>{
const emisor = req.body.emisor;
const receptor = req.body.receptor;
Message.find($or[{"emisor":emisor, "receptor":receptor},{"emisor":receptor,"receptor":emisor}]).exec()
.then(docs =>{
  if (!(docs.length === 0)){
    res.status(200).json({messages:docs});
  }else{
    res.status(404).json({messages:"not found messages"});
  }
})
.catch(err => {
res.status(500).json({error:err});
});
});

router.post("/NewMessage", (req,res) =>{
const message = new Message({
  _id: mongoose.Types.ObjectId,
  emisor: req.body.emisor,
  receptor: req.body.receptor,
  message: req.body.message
});
message
.save()
.then(result => {
  res.status(201).json({SentMessage:message});
})
.catch(err => {
  res.status(500).json({error:err});
});
});

module.exports = router;