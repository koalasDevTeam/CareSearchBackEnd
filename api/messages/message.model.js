// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  id_message: String,
  name: String,
  date: String,
  title: String,
  content: String,
  message: String,
});

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = MessageModel;
