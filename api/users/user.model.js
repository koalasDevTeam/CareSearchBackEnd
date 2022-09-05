// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_Status: Boolean,
  city: String,
  datebirth: String,
  direction: String,
  dni: String,
  email: String,
  full_info: String,
  id: String,
  img: String,
  job: String,
  name: String,
  pass: String,
  price: String,
  schedule: String,
  score: Number,
  worker: Boolean,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
