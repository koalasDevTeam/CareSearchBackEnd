// Este fichero se encarga de definir las urls, los verbo. Este fichero no va a crear ni borrar cosas, se encargara de traer de otro fichero(controller) todas las funciones

const router = require("express").Router();
const controller = require("./messages.controller");
const islogged = require("../../middlewares/islogged");

router.get("/", islogged, controller.getAll);
router.get("/:id", islogged, controller.getOneById);
router.post("/", controller.create);
router.put("/:id", islogged, controller.updateOneById);
router.delete("/:id", islogged, controller.removeOneById);

module.exports = router;
