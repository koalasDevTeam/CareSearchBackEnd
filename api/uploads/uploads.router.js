const router = require("express").Router();
const islogged = require("../../middlewares/islogged");
const uploadImageFile = require("./uploads.controller");

const UserModel = require("../users/user.model");




router.post('/:id', uploadImageFile(), async(req, res) => {

    console.log(req.file);
    await res.send('ok');
    return UserModel.findByIdAndUpdate(req.user, { img: req.file.path });
});

module.exports = router;