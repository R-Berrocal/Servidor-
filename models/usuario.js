const { Schema, model } = require("mongoose");
const usuarioSchema = Schema({
 
  nombre:{
    type: String,
    required: [true,"El nombre es obligatorio"],
    unique: true
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