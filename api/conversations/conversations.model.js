// Fichero que nos dice mongoose que nos tenemos que crear
var mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
  id_converation: String,
  user_1: String,
  user_2: String,
  messages: String,
});

const ConversationModel = mongoose.model("conversation", ConversationSchema);

module.exports = ConversationModel;
