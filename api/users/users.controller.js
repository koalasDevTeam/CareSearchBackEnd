// Este fichero se encarga de la logica.

//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const { has } = require("cheerio/lib/api/traversing");
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
  return UserModel.findOne({ email: req.body.email }).then(async (user) => {
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o contrasen~a sincorrectos" });
    }
    try {
      console.log(await bcrypt.compare(req.body.pass, user.pass));
      if (await bcrypt.compare(req.body.pass, user.pass)) {
        user = removeUserPassword([user])[0];
        return res.status(200).send(user);
      } else {
        return res.status(401).send();
      }
    } catch {
      return res.status(500).send();
    }
    /* return (user.email = req.body.email); */
  });

  /* .then((user) => {
      user = user ? removeUserPassword([user])[0] : user;
      if (user) return res.status(200).send(user);
      else res.status(401).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  console.log(user);
  if (user == null) {
    res.status(401).send("Cannot find user");
  } */

  // }

  // console.log(salt);
  // console.log(hashedPassword);
  // //req.body.pass = hashedPassword;
  // return UserModel.findOne({ email: req.body.email, pass: hashedPassword }) //cojo UserModel y le doy el body q quiero que cree
  //   .then((user) => {
  //     user = user ? removeUserPassword([user])[0] : user;
  //     if (user) return res.status(200).send(user);
  //     else res.status(401).send(user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   });
  // } catch {
  //   return res.status(500).send();
  // }
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
