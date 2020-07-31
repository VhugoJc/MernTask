const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = function (req, res, next){
    //leer token del header
    const token = req.header('x-auth-token');
    //revisar que haya token
    if(!token){
        return res.status(401).json({msg: 'no hay token, permiso no valido'});
    }
    //validar token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();//para que se vaya al siguiente middleware
    }catch(error){
        res.status(401).json({ msg: 'token no valido'});
    }
}