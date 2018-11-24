const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const Message = require('../models/message');
const Autent = require('../models/Autent');

//peticiones de usuario
router.post('/signup', (req, res) => {
  User.find({username: req.body.username})
  .exec()
  .then(user => {
      if(user.length >= 1){
          return res.status(409).json({message: 'nombre de usuario ya existente'});
      }else{         
        bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) { res.status(500).json({error: err});
              }else{
                  const user = new User({
                      _id: new mongoose.Types.ObjectId(),
                      username: req.body.username,
                      password: hash,
                      nombre: req.body.nombre,
                      apellido: req.body.apellido,
                      puesto: req.body.puesto,
                      correo: req.body.correo
                  })
                  user.save().then(result => {
                      res.status(201).json({
                          message: 'usuario creado',
                          user: user
                      });
                  })
                  .catch(err => {
                      res.status(500).json({
                          error: err
                      });
                  })
              }
          })
      }
  })
  .catch(err =>{
      error: err
  });
});

router.post('/login',(req,res) =>{
  User.find({username: req.body.username})
  .then(user => {
      if (user.length < 1) {
          return res.status(401).json({mensaje: 'Usuario o Contraseña no válido'});
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(err) {
              return res.status(401).json({
                  mensaje: 'usuario o contraseña no válido'
              });
          }
          if(result){            
              const token = jwt.sign({
                  username: user[0].username
              }, "este-es-un-token",
              {
                  expiresIn: "2h"
              });
              return res.status(200).json({token: token});
          }
           res.status(401).json({message: 'usuario o contraseña no válido'});
      } )
  })
  .catch(err => {
      res.status(500).json({ error: err});
  });
});

router.delete('/deleteCount/:username', (req, res)=>{
  User.findOneAndDelete({username:req.params.username})
  .then(doc => {
    res.status(200).json(doc);})
  .catch(err =>{
      res.status(500).json({error:err});
    }
  );
});

router.get("/profile/:username", (req,res) =>{
  User.findOne({username:req.params.username})
  .then(doc => {
    res.status(200).json(doc);})
  .catch(err =>{
      res.status(500).json({error:err});
    }
  );
});

router.get("/users", Autent, (req,res) =>{
  User.find()
  .then(docs => {
    res.status(200).json(docs);
  })
  .catch(err =>{
    res.status(500).json({error:err});
  });
});

//peticiones de mensajes

router.get("/conversation", Autent, (req, res)=>{
Message.find()
.select('emisor receptor mensaje -_id')
.then(docs =>{
    res.status(200).json(docs);
  }
)
.catch(err => {
res.status(500).json({error:err});
});
});

router.post("/newMessage", Autent, (req,res) =>{
const message = new Message({
  _id: new mongoose.Types.ObjectId(),
  emisor: req.body.emisor,
  receptor: req.body.receptor,
  mensaje: req.body.mensaje
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