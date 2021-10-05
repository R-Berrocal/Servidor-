const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../midleware/validar-campos");

const router = Router();
const {
  getUsuarios,
  postUsuarios,
  getUsuario,
  putUsuarios,
  deleteUsuarios,
} = require("../controllers/user");

router.get("/", getUsuarios);
router.get("/:id" ,[check("id","No es un id de mongo").isMongoId(),validarCampos], getUsuario);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("puntaje", "EL puntaje es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postUsuarios
);
router.put(
  "/:id",
  [check("id", "no puede estar vacia"),
   check("id","No es un id de mongo").isMongoId(), validarCampos],
  putUsuarios
);

router.delete("/:id", 
[
  check("id", "no puede estar vacia"),
  check("id","No es un id de mongo").isMongoId(),validarCampos
],deleteUsuarios);
module.exports = router;
