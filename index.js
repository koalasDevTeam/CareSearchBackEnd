const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors"); //specify which origins can access the API/backend
app.use(cors({ origin: "*" })); //"http://localhost:4200" * ignifica que todos tiene acceso a llamar al backend
/*  */
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

//to connect thought mongodb Atlas

/* mongoose.connect(
  `mongodb+srv://dbUser:${MONGO_DB_PASSWORD}@cluster0.zjngkqi.mongodb.net/Koala-project?retryWrites=true&w=majority`
); */

//to connect through localhost 27017
mongoose.connect(`mongodb://localhost/Koala-project`);

// to detect errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());

const usersRouter = require("./api/users/users.router");
app.use("/api/users", usersRouter);

app.listen(3000);
