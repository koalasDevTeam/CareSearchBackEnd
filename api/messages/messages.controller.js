// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const MessageModel = require("./message.model");

function getAll(req, res) {
  MessageModel.find({}) //find all users, puedes poner parametro o no.
    .then((messages) => {
      console.log(messages);
      return res.send(messages);
    })
    .catch((error) => {
      res.send(error);
    });
}

// Get user by ID

function getOneById(req, res) {
  MessageModel.findById(req.params.id) //mirar en el index.js como esta definido
    .then((message) => {
      return res.send(message);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

// Creating new user

function create(req, res) {
  MessageModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree
    .then((userCreated) => {
      return res.send(userCreated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

// Deleting a user

function removeOneById(req, res) {
  MessageModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      res.send(deleted);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//Updating a user

function updateOneById(req, res) {
  MessageModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // by default it anwer with the previes one, but you can specify that you want an answer with the new one.
    runValidators: true, // validate each line, and do not do whatever the user wants
  })
    .then((updated) => {
      res.send(updated);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = { getAll, getOneById, create, removeOneById, updateOneById }; // export all functions
