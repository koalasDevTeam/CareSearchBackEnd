const jwt = require("jsonwebtoken");

function islogged(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, dataStored) => {
    //dataStore lo que va dentro del payload que es el user

    if (err) return res.sendStatus(403);

    req.user = dataStored; // we leave it here teporarily for the next function

    next();
  });
}

module.exports = islogged;
