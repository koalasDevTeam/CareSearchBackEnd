const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors"); //specify which origins can access the API/backend
app.use(cors({ origin: "*" })); //"http://localhost:4200" * ignifica que todos tiene acceso a llamar al backend
/*  */
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
if (!process.env.ACCESS_TOKEN_SECRET) {
    console.log("ACCESS_TOKEN_SECRET is missing");
    /* res.status(500).send({ message: "ACCESS_TOKEN_SECRET is missing" }); */
    process.exit(1);
}

//to connect thought mongodb Atlas

/* mongoose.connect(
  `mongodb+srv://dbUser:${MONGO_DB_PASSWORD}@cluster0.zjngkqi.mongodb.net/Koala-project?retryWrites=true&w=majority`
); */

//to connect through localhost 27017
mongoose.connect(`mongodb://localhost/Koala-project`);

// to detect errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected successfully");
});

app.use(express.json()); // it must be here always, on top of all funsctions to be able to read json, otherwise you will not be able to see the post
//users
const usersRouter = require("./api/users/users.router");
app.use("/api/users", usersRouter);
//messages
const messagesRouter = require("./api/messages/messages.router");
app.use("/api/messages", messagesRouter);
app.listen(3000);