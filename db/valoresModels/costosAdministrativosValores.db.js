const {DataTypes, Model} = require('sequelize')
const sequelize = require('../conexion')


const CostoAValor = sequelize.define('costos_admin_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'costos_administrativos',
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

module.exports = CostoAValor;