const { response, request } = require("express");
let IP = require("ip");

const User = require("../models/usuario");
const getUsuario= async(req,res)=>{
  const { ip } = req.params;
  const usuario = await User.findOne({ip});

  if(!usuario){
    return res.status(400).json({
      msg: `El usuario con ip ${ip} no existe`
    })
  }

  res.json({
    usuario,
  });
}
const getUsuarios = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  

  const [total, usuarios] = await Promise.all([
    User.countDocuments(req.query),
    User.find(req.query).limit(Number(limit)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios:usuarios.sort(((a,b)=>b.puntaje-a.puntaje)),
  });
};
const postUsuarios = async (req = request, res = response) => {
  const ip=IP.address();
  const ipExiste= await User.findOne({ip});
  if(ipExiste){
    return res.status(400).json({
      msg: `El usuario con ip ${ip} ya existe en la base de datos`
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
const putUsuarios = async (req, res) => {
  const { ip } = req.params;
 
  if(!ip){
    return res.status(400).json({
      err: "El ip está vacio"
    })
  }
  let user= await User.findOne({ip});

  if(!user){
    return res.status(400).json({
      msg: `El usuario con ip ${ip} no existe`
    })
  }
      
      const {nombre, puntaje }=req.body; 
      const usuario = await User.findOneAndUpdate({ip},{nombre,puntaje} );
      res.json({
        usuario
      });

};
const deleteUsuarios = async (req, res) => {
  const { ip } = req.params;
 
  if(!ip){
    return res.status(400).json({
      err: "El ip está vacio"
    })
  }
  let user= await User.findOne({ip});

  if(!user){
    return res.status(400).json({
      msg: `El usuario con ip ${ip} no existe`
    })
  }
      
      const {nombre, puntaje }=req.body; 
      const usuario = await User.findOneAndDelete({ip},{nombre,puntaje} );
      res.json({
        
        usuario,
        msg:"usuario borrado correctamente"
      });

};
 


module.exports = {
  getUsuarios,
  getUsuario,
  postUsuarios,
  putUsuarios,
  deleteUsuarios
}
