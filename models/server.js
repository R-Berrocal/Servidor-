const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.app.set('trust proxy', 'loopback')
    this.port = process.env.PORT;
    this.paths={

      usuarios:"/api/usuarios"
    }
    
    //conectar a base de datos
    this.conectarDB();
    //middleWares
    this.middleWares();
    //Rutas de mi aplicacion
    this.routes();
  }
  async conectarDB(){
    await dbConection();
  }

  middleWares() {
    //parseo y lectura del body
    this.app.use(express.json());
    //cors
    this.app.use(cors());
    //directorio publico
    this.app.use(express.static("public"));
    
  }

  routes() {

    this.app.use(this.paths.usuarios, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;