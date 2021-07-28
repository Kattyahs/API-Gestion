module.exports = (sequelize,type) => {
    return sequelize.define('sesiones',{
        idSesion:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProyecto:{
            type: type.INTEGER,
            allowNull: false
        },
        cumplida:{
            type: type.BOOLEAN,
            allowNull: false
        }
    })
}   