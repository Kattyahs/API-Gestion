var express = require('express');
const {Proyecto} = require('../db')
var router = express.Router();

/* GET home page. */

/*router.get('/', async function(req, res, next) {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos)
});*/
//C
router.post('/', async function(req, res, next) {
    const proyecto = await Proyecto.create(req.body);
    res.json(proyecto)
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
        res.status(404).send({failed: "No existe la maquina especificada"})
    }else{
        res.status(200).send({success: "se ha actualizado el estado de la maquina"})
    }
});
//D
router.delete('/:proyectoId', async function(req, res, next) {
    let response = await Proyecto.destroy({
        where: {id :req.params.proyectoId}
    });
    if(response==0){
        res.status(404).send({failed: "No existe la maquina especificada"})
    }else{
        res.status(200).send({success: "se ha borrado la maquina"})
    }
    
});
//Read + Maker

router.get('/search/Maker/:idMaker', async function(req, res, next) {
    const proyectos = await Proyecto.findAll({
        where: {id_maker : req.params.idMaker}
    });
    res.json(proyectos)
});




module.exports = router;
