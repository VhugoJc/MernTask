const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

const { check } = require('express-validator');


// Crea proyectos
// api/proyectos
router.post('/', 
   auth,
   [
       check('nombre','el nombre del proyecto es obligatorio').not().isEmpty()
   ],
    proyectoController.crearProyecto
);

//traer los proyectos del usuario autenticado
router.get('/', 
   auth,
    proyectoController.obtenerProyectos
);


//Actualizacion del proyecto
router.put('/:id', 
   auth,[
    check('nombre','el nombre del proyecto es obligatorio').not().isEmpty()
   ],
    proyectoController.actualizarProyecto
);


//Eliminar del proyecto
router.delete('/:id', 
   auth,
    proyectoController.eliminarProyecto
);

module.exports = router;