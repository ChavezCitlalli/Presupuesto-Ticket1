const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../../db/conexion');
const CostosDirectos = require('./model.costosDirectos');
const Ingresos = require('./model.ingresos');
const CostosAdministrativos = require('./model.costosAdministrativos');
const FlujoEfectivo = require('./model.flujoefectivo');
const Recursos = require('./model.recursos');

const Presupuestos = sequelize.define('presupuestos', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proyecto: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mes: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
  },{
    timestamps: true,
    
});

Presupuestos.hasMany(Ingresos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});
Presupuestos.hasMany(FlujoEfectivo, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});
Presupuestos.hasMany(CostosDirectos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});
Presupuestos.hasMany(CostosAdministrativos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});
Presupuestos.hasMany(Recursos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.INTEGER,
      allowNull: false
  },
  onDelete: 'CASCADE'
});


module.exports = Presupuestos;
