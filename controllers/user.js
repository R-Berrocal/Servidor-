const { response, request } = require("express");
let IP = require("ip");

const User = require("../models/usuario");

const getUsuarios = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  

  const [total, usuarios] = await Promise.all([
    User.countDocuments(req.query),
    User.find(req.query).limit(Number(limit)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
const postUsuarios = async (req = request, res = response) => {
  const ip=IP.address();
  const ipExiste= await User.findOne({ip});
  if(ipExiste){
    return res.status(400).json({
      msg: `El ip ${ip} ya existe en la base de datos`
    })
  }
  const { nombre,puntaje } = req.body;
  
  const usuario = new User({ ip, nombre,puntaje });


  //Guardar en DB
  await usuario.save();
  res.json({
    usuario,
  });
};

module.exports = {
  getUsuarios,
  postUsuarios,
};
