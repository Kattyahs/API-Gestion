var express = require('express');
var router = express.Router();

const {Reserva} = require('../db')

router.post('/', async function(req, res, next) {
    const reservas = await Reserva.create(req.body);
    res.json(reservas)
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

router.get('/search/id/:reservaId', async function(req, res, next) {
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