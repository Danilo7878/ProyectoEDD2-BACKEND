const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

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

router.get('/users/:Id', (req, res)=>{
  const id = req.params.Id
  User.findById(id)
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json(doc);
      } else {
        res.status(404).json({message:"Not found"})
      }
      res.status(200).json(doc);
    })
    .catch(err => {
    res.status(500).json({error: err});
    });
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
module.exports = router;