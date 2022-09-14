// Este fichero se encarga de la logica.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  return UserModel.findById(req.params.id) //take a look at index.js to understand how is define
    .then((user) => {
      user = user ? removeUserPassword([user])[0] : user;

      return res.send(user);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

function islogin(req, res) {
  return UserModel.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o contrasen~a sincorrectos" }); // wrong email
    }
    try {
      if (await bcrypt.compare(req.body.pass, user.pass)) {
        user = removeUserPassword([user])[0];

        user = JSON.stringify(user); // it doens't let you to modify the _id, that's why i do what is next
        user = JSON.parse(user);
        user._id = user._id.toString();

        let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //to create a new token

        return res.status(200).send(token);
      } else {
        return res
          .status(401)
          .send({ message: "Usuario o contrasen~a son incorrectos" }); //wrong password
      }
    } catch (err) {
      return res
        .status(401)
        .send({ message: "Usuario o contrasen~a son incorrectos" });
    }
  });
}

// Creating new user

async function register(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.pass, salt);
    console.log(salt);
    console.log(hashedPassword);
    req.body.pass = hashedPassword;
    return UserModel.create(req.body) //you give UserModel the body you want
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
  /* if (!req.body.dni) {
    res.status(500).send({ error_message: "DNI is missing" });
    return;
  } else if (!req.body.city) {
    res.status(500).send({ error_message: "City is missing" });
    return; */
  /* else if (!req.body.full_info) {
    res.status(500).send({ error_message: " full_info: is missing" });
    return; */
  /*   } else if (!req.body.datebirth) {
    res.status(500).send({ error_message: " datebirth: is missing" });
    return;
  } */
  console.log(req.user._id);
  return UserModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
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
  req.body.user_Status = true;
  return UserModel.findByIdAndUpdate(req.user._id, req.body, {
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

module.exports = {
  getAll,
  getOneById,
  register,
  removeOneById,
  updateOneById,
  islogin,
}; // export all functions
