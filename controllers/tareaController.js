const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');


exports.crearTarea = async (req,res)=>{

    //Revisar si hay errores (Validación)
    const errores = validationResult(req);//Las reglas van en el routing pero se lee en el controlador

    if(!errores.isEmpty()){//si errores no está vacío
        return res.status(400).json({errores: errores.array()})//se crea un arreglo de objetos con los errores encontrados
    }

    

    try{
        //extraer proyecto y comprobar que exista
        const{proyecto} = req.body;

        const existenteProyecto = await Proyecto.findById(proyecto);

        if(!existenteProyecto){//existe proyecto
            return res.status(404).sen('proyecto no encontrado');
        }
        //Revisar si el proyecto es del usuario
        if (existenteProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No Autorizado'
            });
        }

        //Crear tarea
        const tarea = new Tarea (req.body);
        await tarea.save();
        res.json({tarea});
        
    }catch(error){
        res.status(500).send('hubo un error')
    }


}

exports.obtenerTarea = async (req,res)=>{


    try{
        //extraer proyecto y comprobar que exista
        const{proyecto} = req.query;

        const existenteProyecto = await Proyecto.findById(proyecto);

        if(!existenteProyecto){//existe proyecto
            return res.status(404).sen('proyecto no encontrado');
        }
        //Revisar si el proyecto es del usuario
        if (existenteProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({
                msg: 'No Autorizado'
            });
        }

        //Obtener tareas por proyecto
        const tareas = await Tarea.find({proyecto});
        res.json(tareas);
        
    }catch(error){
        res.status(500).send('hubo un error')
    }


}

exports.actualizarTarea = async (req,res)=>{
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;


        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        if(nombre) nuevaTarea.nombre = nombre;
        if(estado!=null) nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true } );

        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarTarea = async (req,res)=>{
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto} = req.query;


        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Eliminar tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: "tarea Eliminada"});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


