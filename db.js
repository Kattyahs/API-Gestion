const {Sequelize} = require('sequelize')

//const MaquinaModel = require('./models/maquinas')

const sequelize = new Sequelize('kS3X4pMly6','kS3X4pMly6','mkBxfIDBjE',{
    host:'remotemysql.com',
    dialect:'mysql',

})


//const Maquina = MaquinaModel(sequelize,Sequelize)
sequelize.sync({force:false})
.then(()=>{
    console.log('Tablas sincronizadas');
})
/*
module.exports = {
    Maquina
}*/