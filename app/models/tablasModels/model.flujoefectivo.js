const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../../db/conexion')

//Definir mi Modelo con que voy a trabajar
const FlujoEfectivo = sequelize.define('flujoEfectivo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    presupuesto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'presupuestos',
            key: 'id'
        },
        allowNull: false        
    },
    ingreso: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = FlujoEfectivo;