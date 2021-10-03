const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../midleware/validar-campos");

const router = Router();
const { getUsuarios, postUsuarios, getUsuario, putUsuarios } = require("../controllers/user");

router.get("/", getUsuarios);
router.get("/:ip",getUsuario)
router.post(
  "/",
  [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("puntaje", "EL puntaje es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postUsuarios
);
router.put("/:ip",[
  check("ip","no puede estar vacia"),
  validarCampos
],putUsuarios)
module.exports = router;
