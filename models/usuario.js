const { Schema, model } = require("mongoose");
const usuarioSchema = Schema({
  ip: {
    type: String,
    required: [true, "El ip es obligatorio"],
    unique:true
  },
  nombre:{
    type: String,
    required: [true,"El nombre es obligatorio"]
  },
  puntaje: {
    type: String,
    required: [true, "El puntaje es obligatorio"],
  },

});
usuarioSchema.methods.toJSON=function(){
   const {__v,_id, ...user}=this.toObject();
   user.uid= _id;
   return user;
}
module.exports = model("User", usuarioSchema);