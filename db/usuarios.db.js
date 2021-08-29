const {DataTypes, Model, DATE} = require('sequelize');
const sequelize = require('./conexion');

//Definir el modelo  para usuarios

const Usuarios = sequelize.define('usuarios', {
    id_usuarios : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    pass: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
  
  },{
    timestamps: false,
    createAt: false,
    updateAt: false
  });

module.exports = Usuarios;

  