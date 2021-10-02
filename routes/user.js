const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../midleware/validar-campos");

const router = Router();
const { getUsuarios, postUsuarios } = require("../controllers/user");

router.get("/", getUsuarios);
router.post(
  "/",
  [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("puntaje", "EL puntaje es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postUsuarios
);

module.exports = router;
