const { response, request } = require("express");
let IP = require("ip");

const User = require("../models/usuario");
const getUsuario= async(req,res)=>{
  const { nombre } = req.params;
  const usuario = await User.findOne({nombre});

  if(!usuario){
    return res.status(400).json({
      msg: `El usuario con nombre ${nombre} no existe`
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
  
  
  const { nombre,puntaje } = req.body;
  if(await User.findOne({nombre})){
    console.log(User.findOne({nombre}));
    return res.status(400).json({
      msg:`ya existe un usuario en la base de datos con el  nombre: ${nombre}`
    })
  }
  const usuario = new User({  nombre,puntaje });


  //Guardar en DB
  await usuario.save();
  res.json({
    usuario,
  });
};
const putUsuarios = async (req, res) => {
  const { id } = req.params;
 
  if(!id){
    return res.status(400).json({
      err: "El id está vacio"
    })
  }
  const user= await User.findById(id);

  if(!user){
    return res.status(404).json({
      msg: `El usuario con id ${id} no existe en la DB`
    })
  }
      
      const {nombre, puntaje }=req.body; 
      const usuario = await User.findByIdAndUpdate(id,{nombre,puntaje} );
      res.json({
        usuario
      });

};
const deleteUsuarios = async (req, res) => {
  const { id } = req.params;
 
  if(!id){
    return res.status(400).json({
      err: "El id está vacio"
    })
  }
  let user= await User.findById(id);

  if(!user){
    return res.status(404).json({
      msg: `El usuario con id ${id} no existe`
    })
  }
      
      const {nombre, puntaje }=req.body; 
      const usuario = await User.findByIdAndDelete(id,{nombre,puntaje} );
      res.json({
        
        msg:"usuario borrado correctamente",
        usuario 
      });

};
 


module.exports = {
  getUsuarios,
  getUsuario,
  postUsuarios,
  putUsuarios,
  deleteUsuarios
}
