// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_Status: Boolean,
  city: {
    type: String,
  },
  datebirth: String,
  direction: String,
  dni: {
    type: String,
    /*  required: true, */
    maxLength: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  full_info: {
    type: String,
    maxLength: 4000,
  },
  id: String,
  img: String,
  job: String,
  name: {
    type: String,
    maxLength: 20,
    required: true,
  },
  pass: {
    type: String,
    /*  required: true, */
    maxLength: 18,
    minLength: 6,
  },
  price: String,
  schedule: String,
  score: Number,
  worker: Boolean,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
