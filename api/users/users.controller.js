// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const UserModel = require("./user.model");

function removeUserPassword(arrayOfUsers) {
  return arrayOfUsers.map((user) => {
    user.pass = undefined;
    return user;
  });
}

function removeSensitiveData(arrayOfUsers) {
  return arrayOfUsers.map((user) => {
    user.dni = undefined;
    user.direction = undefined;
    user.datebirth = undefined;
    return user;
  });
}

function getAll(req, res) {
  return UserModel.find({}) //find all users, puedes poner parametro o no.
    .then((users) => {
      users = users.filter((user) => user.worker === true); // bringing just  workers
      users = removeUserPassword(users);
      users = removeSensitiveData(users);
      return res.send(users);
    })
    .catch((error) => {
      return res.send(error);
    });
}

function getOneById(req, res) {
  return UserModel.findById(req.params.id) //mirar en el index.js como esta definido
    .then((user) => {
      user = user ? removeUserPassword([user])[0] : user;

      return res.send(user);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}
//get one

function findOne(req, res) {
  return UserModel.findOne({ email: req.body.email, pass: req.body.pass }) //cojo UserModel y le doy el body q quiero que cree
    .then((user) => {
      user = user ? removeUserPassword([user])[0] : user;
      if (user) return res.status(200).send(user);
      else res.status(401).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
}

// Creating new user

function create(req, res) {
  return UserModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree
    .then((userCreated) => {
      return res.send(userCreated);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

//Updating a user

function updateOneById(req, res) {
  return UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // by default it anwer with the previes one, but you can specify that you want an answer with the new one.
    runValidators: true, // validate each line, and do not do whatever the user wants
  })
    .then((updated) => {
      return res.send(updated);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
// Deleting a user

function removeOneById(req, res) {
  return UserModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      return res.send(deleted);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

module.exports = {
  getAll,
  getOneById,
  create,
  removeOneById,
  updateOneById,
  findOne,
}; // export all functions
