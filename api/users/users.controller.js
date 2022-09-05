// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const UserModel = require("./user.model");

function getAll(req, res) {
  UserModel.find({}) //find all users, puedes poner parametro o no.
    .then((users) => {
      console.log(users);
      return res.send(users);
    })
    .catch((error) => {
      res.send(error);
    });
}

// Get user by ID

function getOneById(req, res) {
  UserModel.findById(req.params.id) //mirar en el index.js como esta definido
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

// Creating new user

function create(req, res) {
  UserModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree
    .then((userCreated) => {
      return res.send(userCreated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

// Deleting a user

function removeOneById(req, res) {
  UserModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      res.send(deleted);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

//Updating a user

function updateOneById(req, res) {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {
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
