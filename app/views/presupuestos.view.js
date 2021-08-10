const sequelize = require('../../db/conexion');
const presupuestoController = require('../controllers/presupuestos.controller');
const middValidacion = require('../../middleware/middVerificacionDatos');
const middAuth = require('../../middleware/middVerificacion');

module.exports = async (app)=> {

   

    app.get('/index', async ( req, res ) => {
        try{
            let resultado = await presupuestoController.obtenerPresupuestos();
            res.render('index.ejs',  {results:resultado});
        }catch (err){
            res.status(400).json('Error en la pagina');
        };
    });

    app.get('/index/nuevo', async ( req, res ) => {
        try{
            res.render('newbudget');
        }catch (err){
            res.status(400).json('No se puede mostrar');
        };
    });


    app.post('/nuevoBudget', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async ( req, res) => {
        let datos = req.body;
        try {
            let resultado = await presupuestoController.nuevoPresupuesto(datos);
            if(resultado){
                res.status(200).json('ok');
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    });
    
    app.get('/verPresupuesto/:id', async ( req, res ) => {
        let id = req.params.id;
        try{
            let resultado = await presupuestoController.informeDePresupuesto(id);
            //Falta Mostrar los datos en un EJS con Render
            res.status(200).json(resultado);
        }catch (err){
            res.status(400).json({err: err.message})
        }
    })

   
    app.post('/actualizarPresupuesto/:id', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async (req, res) => {
        let id = req.params.id;
        let datos = req.body;
        try {
            let resultado = await presupuestoController.actualizarPresupuesto(id, datos);
            if(resultado){
                res.status(200).json('ok');
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    });

    app.get('/eliminar/:id', middAuth.verificacionUsuario, async ( req, res ) => {
        let idPresupuesto = req.params.id;
            try {
                let resultado = await presupuestoController.deletePresupuesto(idPresupuesto);
                if(resultado){
                    res.status(200).json('ok');
                }      
            }catch (err){
                res.status(400).json({error: error.message});
            };
    });
};