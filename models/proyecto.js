module.exports = (sequelize,type) => {
    return sequelize.define('proyecto',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_maker:{
            type: type.INTEGER,
            allowNull: true
        },
        nombre:{
            type: type.STRING,
            allowNull: true
        
        },
        descripcion: type.STRING,

    })
}   