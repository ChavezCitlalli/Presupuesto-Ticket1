const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../../db/conexion')

const DirectosValor = sequelize.define('costos_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    directo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'costos_directos',
            key: 'id'
        },
        allowNull: false        
    },
    valor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = DirectosValor;