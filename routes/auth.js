//rutas para autebticar usuarios, soporta una url
const express = require('express')
const router = express.Router();//rauting
const {check} = require('express-validator');//validaciones
const authController = require ('../controllers/authController');
const auth = require('../middleware/auth');


//endpoint
//crear usuario
//pi/usuarios

/*lo que se ejecuta cuando se manda el request
    *para no hacer tan largo el router, se usa controlador*/

router.post('/',
 authController.autentificarUsuario
);

router.get('/',
auth,
authController.usuarioAutenticado)
module.exports = router;
