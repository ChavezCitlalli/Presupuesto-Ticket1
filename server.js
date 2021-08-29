const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');
const routePresupuestos = require('./app/views/presupuestos.view');
const routeUsuarios = require('./app/views/usuarios.view');
const login = require ('./app/views/login.view')

const {  Usuarios } = require ('./db/index')

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(cors());
//app.use(midd.limiter);

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//middleware para captura de errores globales.
app.use((err, req, res, next)=> {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    console.log(err);
    if (!err){
        return next();
    }
    return res.status(500).json('Se produjo un error inesperado')
});

//Iniciar el Servidor
async function inicioServidor() {
    try {
        await Usuarios.sync({alter:true});
        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!');
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`);
        })
    }catch (err){
        console.log('No se pudo conectar con la DB');
    }
}

inicioServidor();

routePresupuestos(app);
routeUsuarios(app);
login(app);

