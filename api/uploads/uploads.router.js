const router = require("express").Router();
const islogged = require("../../middlewares/islogged");
const uploadImageFile = require("./uploads.controller");



router.post('/', uploadImageFile(), (req, res) => {
    console.log(req.file);
    res.send('ok');
});

module.exports = router;