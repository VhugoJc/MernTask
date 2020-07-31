const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, res) =>{


    //Revisar si hay errores (Validación)
    const errores = validationResult(req);//Las reglas van en el routing pero se lee en el controlador

    if(!errores.isEmpty()){//si errores no está vacío
        return res.status(400).json({errores: errores.array()})//se crea un arreglo de objetos con los errores encontrados
    }
    
    const {password, email} = req.body;

    try{
        let usuario = await Usuario.findOne({email});//con findone de mongo verifica si ya existe

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }


        usuario = new Usuario(req.body);//crear nuevo usuario
        //hashear pasword
        const salt = await bcryptjs.genSalt(10);//generar salt
        usuario.password = await bcryptjs.hash(password,salt);//reescribir pasword hasheada

        await usuario.save();//guardar
        //crear y firmar JWT
        const payload = {//informacion que va a guardar el JWT
            usuario:{
                id: usuario.id
            }
        };

        //firmar Token
        jwt.sign(payload, process.env.SECRETA, 
            {expiresIn: 3600}, (error, token) =>{//Expira el login en una hora
                if(error) throw error;
                res.status(200).json({token});
            });


        


    }catch(error){
        console.log(error);
        res-status(400).send('hubo un error');
    }
    
}