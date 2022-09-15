// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const messages = mongoose.Schema({
  content: String,
  date: String,
  img_user_send: String,
  name_user_send: String,
  user_receive: String,
  user_send: String,
});

const ConversationSchema = mongoose.Schema({
  id_converation: String,
  user_1: String,
  user_2: String,
  messages: [messages],
});

const ConversationModel = mongoose.model("conversation", ConversationSchema);

module.exports = ConversationModel;
