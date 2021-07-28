var express = require('express');
const {Proyecto} = require('../db')
var router = express.Router();

/* GET home page. */

router.get('/', async function(req, res, next) {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos)
});
module.exports = router;
