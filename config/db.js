const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const conectarDB = async () =>{

    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,//se agregó ya que causabe error en la Indexación
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })//url a conectar, objeto de configuracion
        console.log('DB Conectada')
    }catch(error){
        console.log("error encontrado");
        process.exit(1);
    }
}
module.exports = conectarDB;//"export"

