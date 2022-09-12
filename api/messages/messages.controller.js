// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const MessageModel = require("./message.model");

function getAll(req, res) {
  const userId = req.query.userId;
  console.log(req.query.userId);
  //console.log(req.user._id);// Lo ideal es q el mildware anterior haya guardado en req.user el user actual logeado

  return MessageModel.find({
    $or: [{ user_receive: userId }, { user_send: userId }],
  }) //find all users, puedes poner parametro o no.
    .then((messages) => {
      //console.log(messages);
      return res.send(messages);
    })
    .catch((error) => {
      return res.send(error);
    });
}

// Get user by ID

function getOneById(req, res) {
  return MessageModel.findById(req.params.id) //mirar en el index.js como esta definido
    .then((message) => {
      return res.send(message);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

// Creating new user

function create(req, res) {
  return MessageModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree
    .then((userCreated) => {
      return res.send(userCreated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

// Deleting a user

function removeOneById(req, res) {
  return MessageModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      return res.send(deleted);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

//Updating a user

function updateOneById(req, res) {
  return MessageModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // by default it anwer with the previes one, but you can specify that you want an answer with the new one.
    runValidators: true, // validate each line, and do not do whatever the user wants
  })
    .then((updated) => {
      return res.send(updated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

module.exports = { getAll, getOneById, create, removeOneById, updateOneById }; // export all functions
