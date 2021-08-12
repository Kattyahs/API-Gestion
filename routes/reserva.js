var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const {Reserva} = require('../db')

/*router.post('/', async function(req, res, next) {
    const reservas = await Reserva.create(req.body);
    res.json(reservas)
});*/

router.post('/', async function(req, res, next) {

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    let sesionVerification = await fetch('https://api-gestion-production-fob3.up.railway.app/sesiones/verify/'+req.body.id_sesion, options);
    
    if(sesionVerification.status==200){
        if(req.body.hora_ingreso.length == 8 && req.body.hora_termino.length == 8 ){
            const reserva = await Reserva.create(req.body);
            res.json(reserva)
        }else{
            res.status(404).send({failed: "Mal formato fecha"})
        }
        
    }else{
        res.status(404).send({failed: "No existe la sesión indicado"})
    }

    
});
router.put('/:reservaId', async function(req, res, next) {
    let response = await Reserva.update(req.body,{
        where: {id_reserva :req.params.reservaId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la reserva especificada"})
    }else{
        res.status(200).send({success: "se ha actualizado la reserva"})
    }
});

router.delete('/:reservaId', async function(req, res, next) {
    let response = await Reserva.destroy({
        where: {id_reserva :req.params.reservaId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la reserva especificada"})
    }else{
        res.status(200).send({success: "se ha borrado la reserva"})
    }
    
});

router.get('/', async function(req, res, next) {
    const reservas = await Reserva.findAll();
    res.json(reservas)
});

router.get('/:reservaId', async function(req, res, next) {
    const reservas = await Reserva.findAll({
        where: {id_reserva : req.params.reservaId}
    });
    if(reservas==0){
        res.status(404).send({failed: "No existe la reserva especificada"})
    }else{
        res.json(reservas)
    }
});

module.exports = router;