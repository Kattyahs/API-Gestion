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
    
    let tipeMachineVerification = await fetch('http://3.235.42.11:3000/tipo_maquina/'+req.body.tipo_maquina, options)    
    
    
    if(tipeMachineVerification.status==200){
        const options2 = {method: 'GET', headers: {Accept: 'application/json'}};
        let projectVerification = await fetch('https://api-gestion-production-fob3.up.railway.app/proyectos/verify/'+req.body.id_Proyecto, options2);
        
        if(projectVerification.status==200){
            let sessionCreation = await Sesion.create(req.body)
            res.json(sessionCreation)
            
        }else{
            res.status(404).send({failed: "No existe el proyecto indicado"})
        }
             

    }
    else{
       res.status(404).send({failed: "No existe el tipo de maquina indicado"})
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
router.get('/verify/:idSesion', async function(req, res, next) {
    const sesiones = await Sesion.findAll({
        where: {id_Sesion : req.params.idSesion}
    });
    if(sesiones.length == 0){
        res.status(404).send({failed: "No existe el proyecto"})
    }else{
        res.status(200).send({success: "Si existe el proyecto"})
    }

});


module.exports = router;
