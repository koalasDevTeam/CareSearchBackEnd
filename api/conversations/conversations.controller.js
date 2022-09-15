// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const ConversationModel = require("./conversations.model");

//get all conversations of both users
function getAll(req, res) {
  const user1 = req.query.user1;
  const user2 = req.query.user2;


  return ConversationModel.find({
  $and: [{ user_1: user1 }, { user_2: user2 }],
  }) //find all users, puedes poner parametro o no.

    .then((messages) => {
      console.log(messages)
      return res.send(messages);
    })
    .catch((error) => {
      return res.send(error);
    });
}

//get all conversation of an user
function getAnyAll(req, res) {
  const user1 = req.query.user1;
  const user2 = req.query.user2;

  //console.log(req.user._id);// Lo ideal es q el mildware anterior haya guardado en req.user el user actual logeado

  return ConversationModel.find({
  $or: [{ user_1: user1 }, { user_2: user2 }],
  }) //find all users, puedes poner parametro o no.

    .then((messages) => {
      console.log(messages)
      return res.send(messages);
    })
    .catch((error) => {
      return res.send(error);
    });
}


// Get user by ID

function getOneById(req, res) {
  return ConversationModel.findById(req.params.id) //mirar en el index.js como esta definido
    .then((message) => {
      return res.send(message);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

// Creating new user

function create(req, res) {
  return ConversationModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree

    .then((userCreated) => {
      return res.send(userCreated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}
//Updating a conversation


function updateOneById(req, res) {
  return ConversationModel.findByIdAndUpdate(req.params.id, req.body)
    .then((updated) => {
      console.log(updated)
      return res.send(updated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}


// Deleting a user

function removeOneById(req, res) {
  return ConversationModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      return res.send(deleted);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}



module.exports = { getAll, getOneById, create, removeOneById, updateOneById }; // export all functions
