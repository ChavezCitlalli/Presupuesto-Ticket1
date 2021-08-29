const express = require('express');
const app = express();

const sequelize = require('../../db/conexion');
const PresupuestoController = require('../controllers/presupuestos.controller');
const presupuestoController = new PresupuestoController();


const { ParamsMiddlewares, PresupuestoMiddlewares, AuthMiddlewares } = require('../../middleware');

const paramsMiddlewares = new ParamsMiddlewares();
const presupuestoMiddlewares = new PresupuestoMiddlewares();
const authMiddlewares = new AuthMiddlewares();



app.get('/index',authMiddlewares.validateToken, async ( req, res ) => {
        let resultado = await presupuestoController.obtenerPresupuestos();
        res.render('index.ejs',  {results:resultado})  });


app.get('/index/nuevo',authMiddlewares.validateToken, async ( req, res ) => {
    try{
        res.render('newbudget');
    }catch (err){
        res.status(400).json('No se puede mostrar');
    };
});


app.post('/nuevoBudget',authMiddlewares.validateToken,
    presupuestoMiddlewares.checkPresupuesto, async ( req, res) => {
    await presupuestoController.nuevoPresupuesto(res,req)});


app.get('/verPresupuesto/:id',authMiddlewares.validateToken,
    paramsMiddlewares.checkId, async ( req, res ) => {
    await presupuestoController.informeDePresupuesto(res,req)})
        //Falta Mostrar los datos en un EJS con Render
   


app.post('/actualizarPresupuesto/:id',authMiddlewares.validateToken,paramsMiddlewares.checkId,async (req, res) => {
        let resultado = await presupuestoController.actualizarPresupuesto(req,res);
        if(resultado){
            res.status(200).json('ok');
        }
});

app.delete('/presupuesto/:id', authMiddlewares.validateToken,paramsMiddlewares.checkId, async ( req, res ) => {
    let resultado = await presupuestoController.deletePresupuesto({req,res});
    if(resultado){
        res.send(resultado)
        res.status(200).json('ok')
    }         
});

module.exports = app;













// const sequelize = require('../../db/conexion');
// const presupuestoController = require('../controllers/presupuestos.controller');
// const middValidacion = require('../../middleware/middVerificacionDatos');
// const middAuth = require('../../middleware/middVerificacion');

// module.exports = async (app)=> {

   

//     app.get('/index', async ( req, res ) => {
//         try{
//             let resultado = await presupuestoController.obtenerPresupuestos();
//             res.render('index.ejs',  {results:resultado});
//         }catch (err){
//             res.status(400).json('Error en la pagina');
//         };
//     });

//     app.get('/index/nuevo', async ( req, res ) => {
//         try{
//             res.render('newbudget');
//         }catch (err){
//             res.status(400).json('No se puede mostrar');
//         };
//     });


//     app.post('/nuevoBudget', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async ( req, res) => {
//         let datos = req.body;
//         try {
//             let resultado = await presupuestoController.nuevoPresupuesto(datos);
//             if(resultado){
//                 res.status(200).json('ok');
//             }
//         } catch (error) {
//             res.status(400).json({error: error.message});
//         };
//     });
    
//     app.get('/verPresupuesto/:id', async ( req, res ) => {
//         let id = req.params.id;
//         try{
//             let resultado = await presupuestoController.informeDePresupuesto(id);
//             //Falta Mostrar los datos en un EJS con Render
//             res.status(200).json(resultado);
//         }catch (err){
//             res.status(400).json({err: err.message})
//         }
//     })

   
//     app.post('/actualizarPresupuesto/:id', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async (req, res) => {
//         let id = req.params.id;
//         let datos = req.body;
//         try {
//             let resultado = await presupuestoController.actualizarPresupuesto(id, datos);
//             if(resultado){
//                 res.status(200).json('ok');
//             }
//         } catch (error) {
//             res.status(400).json({error: error.message});
//         };
//     });

//     app.get('/eliminar/:id', middAuth.verificacionUsuario, async ( req, res ) => {
//         let idPresupuesto = req.params.id;
//             try {
//                 let resultado = await presupuestoController.deletePresupuesto(idPresupuesto);
//                 if(resultado){
//                     res.status(200).json('ok');
//                 }      
//             }catch (err){
//                 res.status(400).json({error: error.message});
//             };
//     });
// };