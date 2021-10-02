const mongoose = require("mongoose");

const dbConection = async () => { 
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,     
        })
        console.log('Base de datos online');     
    } catch (error) {
        console.log(error)
        throw  new Error('No se pudo conectar la base de datos');       
    }
};


module.exports = {
  dbConection
};