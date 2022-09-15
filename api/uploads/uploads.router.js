const router = require("express").Router();
const controller = require("./uploads.controller");
const islogged = require("../../middlewares/islogged");
const multer = require('multer');
const uploads = require("/.uploads.controller");


router.post("/uploads", uploads.single('dataForm'), (req, res) => {
    res.send({ data: 'Imagen cargada' })
});

module.exports = router;