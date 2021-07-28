var express = require('express');
const {Sesion} = require('../db')
var router = express.Router();

/* GET home page. */

router.get('/', async function(req, res, next) {
    const sesion = await Sesion.findAll();
    res.json(sesion)
});
module.exports = router;
