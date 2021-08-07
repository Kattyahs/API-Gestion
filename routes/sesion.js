var express = require('express');
const {Sesion} = require('../db')
var router = express.Router();
const fetch = require("node-fetch");
/* GET home page. */

router.get('/', async function(req, res, next) {
    const sesion = await Sesion.findAll();
    res.json(sesion)
});
router.post('/', async function(req, res, next) {

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    let proyectVerification = await fetch('https://api-gestion-production-fob3.up.railway.app/proyectos/verify/'+req.body.id_Proyecto, options);
    
    if(proyectVerification.status==200){
        const machine = await Sesion.create(req.body);
        res.json(machine)
    }else{
        res.status(404).send({failed: "No existe el proyecto indicado"})
    }

    
});
router.delete('/:sesionId', async function(req, res, next) {
    let response = await Sesion.destroy({
        where: {id_Sesion :req.params.sesionId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la sesion especificada"})
    }else{
        res.status(200).send({success: "se ha borrado la maquina"})
    }
    
});
router.put('/:sesionId/:stateSesion', async function(req, res, next) {
    let response = await Sesion.update({cumplida:req.params.stateSesion},{
        where: {id_Sesion :req.params.sesionId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la sesion especificada"})
    }else{
        res.status(200).send({success: "se ha actualizado el estado de la sesion"})
    }
});
router.get('/:sesionId', async function(req, res, next) {
    const reservas = await Sesion.findAll({
        where: {id_Sesion : req.params.sesionId}
    });
    if(reservas==0){
        res.status(404).send({failed: "No existe la reserva especificada"})
    }else{
        res.json(reservas)
    }
});



module.exports = router;
