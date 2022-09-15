const router = require("express").Router();
const controller = require("./uploads.controller");
const islogged = require("../../middlewares/islogged");
const multer = require('multer');


router.post("/uploads", upload.single('dataForm'), (req, res) => {
    res.send({ data: 'Imagen cargada' })
});

module.exports = router;