const express = require('express');
const conectarDB = require ('./config/db');






//crear el servidor 
const app = express();

//conectar a base de datos
conectarDB();

//Habilitar cors


//habilitar express.json para datos que coloque el user
app.use(express.json({extended: true}));

//construir el puerto de la app
const port = process.env.port|| 4000;//puede ser cualquiera menos el 3000 del cliente
//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));



//dEFINIR PAGINA PRONCIPAL
app.get('/', (req, res)=>{
    res.send('hola mundo')
});

//arrancar app/seervidor
app.listen(port, '0.0.0.0', () =>{//puerto y dominio
    
    console.log(`Servidor conectado en puerto ${port}` ); 
});


