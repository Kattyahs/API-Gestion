var express = require('express');
var router = express.Router();

const {Reserva} = require('../db')

router.get('/', async function(req, res, next) {
    const reservas = await Reserva.findAll();
    res.json(reservas)
});

module.exports = router;