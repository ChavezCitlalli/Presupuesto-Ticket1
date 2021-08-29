
//const middUser = require('../../middleware/middUsuarios')
const express = require('express');
const app = express();
const LoginController = require('../controllers/login.controller');

const loginController = new LoginController();

module.exports = async ( app ) => {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })


    app.post('/login', /*middUser.validarLogin,*/ async (req,res)=>{
        const data = req.body;
        try {
            let resultado = await loginController.login({data});
            res.send(resultado)
           
        }catch (err){
            res.status(400).json({ error: err.message})
        }
    })
}
    