const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');

const { check } = require('express-validator');


// Crea tareas
// api/tareas
router.post('/', 
   auth,
   [
       check('nombre','el nombre de la tarea es obligatorio').not().isEmpty(),
       check('proyecto','el proyecto es obligatorio').not().isEmpty()
   ],
   tareaController.crearTarea
);

router.get('/',
auth,
tareaController.obtenerTarea
);

router.put('/:id', 
    auth,
    tareaController.actualizarTarea
);

router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
);





module.exports = router;