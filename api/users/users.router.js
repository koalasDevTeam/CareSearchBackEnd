// Este fichero se encarga de definir las urls, los verbo. Este fichero no va a crear ni borrar cosas, se encargara de traer de otro fichero(controller) todas las funciones

const router = require("express").Router();
const controller = require("./users.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.post("/", controller.create);
router.delete("/:id", controller.removeOneById);
router.put("/:id", controller.updateOneById);

module.exports = router;
