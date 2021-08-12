var express = require('express');
const {Proyecto} = require('../db')
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */

router.get('/', async function(req, res, next) {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos)
});
//C
router.post('/', async function(req, res, next) {
    const options = {method: 'GET', headers: {Accept: 'application/json'}};


    let personVerification = await fetch('http://ec2-3-13-79-51.us-east-2.compute.amazonaws.com:8081/assistant/rut?rut='+req.body.id_maker, options);
    
    if(personVerification.status == 200){
 
        const projectCreation = await Proyecto.create(req.body);
        res.json(projectCreation)
        

    }else{
        res.status(404).send({failed: "No existe la persona indicada"})
    }

   
});
//R
router.get('/', async function(req, res, next) {
    const proyecto = await Proyecto.findAll();
    res.json(proyecto)
});
//U
router.put('/:proyectoId', async function(req, res, next) {
    let response = await Proyecto.update(req.body,{
        where: {id :req.params.proyectoId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe el proyecto especificado"})
    }else{
        res.status(200).send({success: "se ha actualizado el proyecto especificado"})
    }
});
//D
router.delete('/:proyectoId', async function(req, res, next) {
    let response = await Proyecto.destroy({
        where: {id :req.params.proyectoId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe el proyecto especificado"})
    }else{
        res.status(200).send({success: "se ha borrado el proyecto especificado"})
    }
    
});
//Read + Maker

router.get('/:idMaker', async function(req, res, next) {
    const proyectos = await Proyecto.findAll({
        where: {id_maker : req.params.idMaker}
    });
    res.json(proyectos)
});

router.get('/verify/:idProyecto', async function(req, res, next) {
    const proyectos = await Proyecto.findAll({
        where: {id : req.params.idProyecto}
    });
    if(proyectos.length == 0){
        res.status(404).send({failed: "No existe el proyecto"})
    }else{
        res.status(200).send({success: "Si existe el proyecto"})
    }

});


module.exports = router;
