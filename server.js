const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');

//PARA INICIAR LA BASE DATOS
const {  Usuarios, CostosAdministrativos, CostosDirectos, FlujoEfectivo, Ingresos,
    Presupuestos, Recursos, IngresosValor, CostoAValor, DirectosValor,RecursosValor } = require ('./db/index');

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(cors());

//configuracion global
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

app.use(require('./app/views/index'));

//Iniciar el Servidor
async function inicioServidor() {
    try {
 /////////// solo para crear las tablas al inicio (facilitar la creacion de las tablas) 
        await Usuarios.sync({alter:true});
        await Presupuestos.sync({alter:true});
        await Ingresos.sync({alter:true});
        await Recursos.sync({alter:true});
        await CostosAdministrativos.sync({alter:true});
        await CostosDirectos.sync({alter:true});
        await FlujoEfectivo.sync({alter:true});
        await IngresosValor.sync({alter:true});
        await DirectosValor.sync({alter:true});
        await CostoAValor.sync({alter:true});
        await RecursosValor.sync({alter:true});
    

        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!');
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`);
        })
    }catch (err){
        console.log('No se pudo conectar con la DB');
    }
}
//iniciando servidor
inicioServidor();


