// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const { has } = require("cheerio/lib/api/traversing");
const UserModel = require("./user.model");

function logged(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, dataStored) => {
    //dataStore lo que va dentro del payload que es el user
    //console.log(err);
    if (err) return res.sendStatus(403);
    req.user = dataStored; // we leave it here teporarily for the next function

    next();
  });
}

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
  console.log(req.user);
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
  return UserModel.findOne({ email: req.body.email }).then(async (user) => {
    //console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o contrasen~a sincorrectos" }); // wrong email
    }
    try {
      //console.log(await bcrypt.compare(req.body.pass, user.pass));
      if (await bcrypt.compare(req.body.pass, user.pass)) {
        user = removeUserPassword([user])[0];
        if (!process.env.ACCESS_TOKEN_SECRET) {
          console.log("ACCESS_TOKEN_SECRET is missing");
          return res
            .status(500)
            .send({ message: "ACCESS_TOKEN_SECRET is missing" });
        } else {
          //console.log(user);
          //console.log(user._id.toString());
          user = JSON.stringify(user); // no me deja modificar _id, por eso hago lo siguiente
          user = JSON.parse(user);
          user._id = user._id.toString();

          console.log(user);
          let token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET); //to create a new token

          //console.log(token);
          //console.log(process.env.ACCESS_TOKEN_SECRET);
          return res.status(200).send(token);
        }
      } else {
        console.log("wrong password");
        return res
          .status(401)
          .send({ message: "Usuario o contrasen~a son incorrectos" }); //wrong password
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Usuario o contrasen~a son incorrectos" });
    }
  });
}

// Creating new user

async function create(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.pass, salt);
    console.log(salt);
    console.log(hashedPassword);
    req.body.pass = hashedPassword;
    return UserModel.create(req.body) //cojo UserModel y le doy el body q quiero que cree
      .then((userCreated) => {
        userCreated = removeUserPassword([userCreated])[0];
        return res.send(userCreated);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(err);
      });
  } catch {
    res.status(500).send();
  }
}

//Updating a user

function updateOneById(req, res) {
  if (!req.body.dni) {
    res.status(500).send({ error_message: "DNI is missing" });
    return;
  } else if (!req.body.city) {
    res.status(500).send({ error_message: "City is missing" });
    return;
  } else if (!req.body.full_info) {
    res.status(500).send({ error_message: " full_info: is missing" });
    return;
  } else if (!req.body.datebirth) {
    res.status(500).send({ error_message: " datebirth: is missing" });
    return;
  }
  return UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // by default it anwer with the previes one, but you can specify that you want an answer with the new one.
    runValidators: true, // validate each line, and do not do whatever the user wants
  })
    .then((updated) => {
      updated = removeUserPassword([updated])[0];
      return res.send(updated);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
// Deleting a user

/* function removeOneById(req, res) {
  return UserModel.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      return res.send(deleted);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
} */

module.exports = {
  getAll,
  getOneById,
  create,
  /*  removeOneById, */
  updateOneById,
  findOne,
  logged,
}; // export all functions
