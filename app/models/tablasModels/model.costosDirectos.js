const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../../db/conexion');
const DirectosValor = require('../valoresModels/model.costosDirectosValores');

const CostosDirectos = sequelize.define('costos_directos', {
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
    concepto: {
        type: DataTypes.STRING(30),
        allowNull: true,        
    },        
}, {
    timestamps: false
});

CostosDirectos.hasMany(DirectosValor, {
    foreignKey: {
        name: 'directo_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = CostosDirectos;