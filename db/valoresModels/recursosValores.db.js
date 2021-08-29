const {DataTypes, Model} = require('sequelize')
const sequelize = require('../conexion')


const RecursosValues = sequelize.define('recursos_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recurso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'recursos',
            key: 'id'
        },
        allowNull: false        
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = RecursosValues;