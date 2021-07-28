module.exports = (sequelize,type) => {
    return sequelize.define('reserva',{
        id_reserva:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_sesion:{
            type: type.INTEGER,
            allowNull: false
        },
        timestamp:{
            type: type.DATE,
            allowNull: false
        
        },
        id_maquina:{
            type: type.INTEGER,
            allowNull: false
        
        }
    })
}   