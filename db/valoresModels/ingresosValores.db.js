const {DataTypes, Model} = require('sequelize')
const sequelize = require('../conexion')

const IngresosValor = sequelize.define('ingresos_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ingreso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ingresos',
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

module.exports = IngresosValor;