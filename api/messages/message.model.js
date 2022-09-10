// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  id_message: String,
  user_send:String,
  user_receive:String,
  date: String,
  content: String,
});

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = MessageModel;
