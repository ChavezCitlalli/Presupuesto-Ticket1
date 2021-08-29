const {DataTypes, Model} = require('sequelize');
const sequelize = require('../conexion');
const costoAValor= require('../valoresModels/costosAdministrativosValores.db');

const CostosAdministrativos = sequelize.define('costos_administrativos', {
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

CostosAdministrativos.hasMany(costoAValor, {
    foreignKey: {
        name: 'admin_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = CostosAdministrativos;