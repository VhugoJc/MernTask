//rutas para crear usuarios, soporta una url
const express = require('express')
const router = express.Router();//rauting
const {check} = require('express-validator');//validaciones
const usuarioController = require('../controllers/usuarioController');

//endpoint
//crear usuario
//pi/usuarios

/*lo que se ejecuta cuando se manda el request
    *para no hacer tan largo el router, se usa controlador*/

router.post('/',
[check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email válido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min: 6})
],
usuarioController.crearUsuario
);

module.exports = router;
