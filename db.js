const {Sequelize} = require('sequelize')

const proyectoModel = require('./models/proyecto')
const ReservaModel = require('./models/reserva')
const sesionModel = require('./models/sesion')

const sequelize = new Sequelize('kS3X4pMly6','kS3X4pMly6','mkBxfIDBjE',{
    host:'remotemysql.com',
    dialect:'mysql',

})


const Proyecto = proyectoModel(sequelize,Sequelize)
const Reserva = ReservaModel(sequelize, Sequelize)
const Sesion = sesionModel(sequelize,Sequelize)

sequelize.sync({force:false})
.then(()=>{
    console.log('Tablas sincronizadas');
})

module.exports = {
    Proyecto,
    Reserva,
    Sesion
    
}