const {DataTypes, Model} = require('sequelize');
const sequelize = require('../conexion');
const RecursoValor = require('../valoresModels/recursosValores.db');


const Recursos = sequelize.define('recursos', {
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
    costo: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: true,        
    },    
}, {
    timestamps: false
});

Recursos.hasMany(RecursoValor, {
    foreignKey: {
        name: 'recurso_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = Recursos;