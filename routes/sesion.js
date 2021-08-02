var express = require('express');
const {Sesion} = require('../db')
var router = express.Router();

/* GET home page. */

router.get('/', async function(req, res, next) {
    const sesion = await Sesion.findAll();
    res.json(sesion)
});
router.post('/', async function(req, res, next) {
    const machine = await Sesion.create(req.body);
    res.json(machine)
});
router.delete('/:sesionId', async function(req, res, next) {
    let response = await Sesion.destroy({
        where: {idSesion :req.params.sesionId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la sesion especificada"})
    }else{
        res.status(200).send({success: "se ha borrado la maquina"})
    }
    
});
router.put('/:sesionId/:stateSesion', async function(req, res, next) {
    let response = await Sesion.update({cumplida:req.params.stateSesion},{
        where: {idSesion :req.params.sesionId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la sesion especificada"})
    }else{
        res.status(200).send({success: "se ha actualizado el estado de la sesion"})
    }
});
router.get('/:sesionId', async function(req, res, next) {
    const reservas = await Sesion.findAll({
        where: {idSesion : req.params.sesionId}
    });
    if(reservas==0){
        res.status(404).send({failed: "No existe la reserva especificada"})
    }else{
        res.json(reservas)
    }
});
module.exports = router;
