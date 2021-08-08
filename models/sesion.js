module.exports = (sequelize,type) => {
    return sequelize.define('sesiones',{
        id_Sesion:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_Proyecto:{
            type: type.INTEGER,
            allowNull: false
        },
        cumplida:{
            type: type.BOOLEAN,
            allowNull: false
        },
        tipo_maquina:{
            type: type.INTEGER,
            allowNull: false
        }
    })
}   