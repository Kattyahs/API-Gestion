module.exports = (sequelize,type) => {
    return sequelize.define('proyecto',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_maker:{
            type: type.INTEGER,
            allowNull: false
        },
        nombre:{
            type: type.STRING,
            allowNull: false
        
        },
        descripcion: type.STRING,

    })
}   