const express = require('express');
const app = express();

const UsuarioController = require('../controllers/usuarios.controller');
const usuarioController = new UsuarioController();

const { ParamsMiddlewares, UserMiddlewares, AuthMiddlewares } = require('../../middleware');

const paramsMiddlewares = new ParamsMiddlewares();
const userMiddlewares = new UserMiddlewares();
const authMiddlewares = new AuthMiddlewares();



// renderiza la pagina para Registrarse 
app.get('/signup', async (req, res) => {res.render('signup')})
        

//Nuevo Usuario
app.post('/save',userMiddlewares.checkPostUser, async (req,res) => {
     await usuarioController.newUsuario(req,res)});

     
    // ruta para modificar usuario
app.get  ('/usuario/:id',authMiddlewares.validateToken,paramsMiddlewares.checkId,async (req,res) => {
    await usuarioController.getUsuarioId(req,res)});


//EDITAR LA INFORMACION DEL USUARIO
app.post('/usuario/:id', authMiddlewares.validateToken,paramsMiddlewares.checkId, async (req, res) => { 
    await usuarioController.putUsuario( req,res )});


//ruta para eliminar usuario  
app.delete('/:id', authMiddlewares.validateToken, paramsMiddlewares.checkId, async (req, res) => {
    await usuarioController.deleteUsuario(req,res)});


module.exports = app;





