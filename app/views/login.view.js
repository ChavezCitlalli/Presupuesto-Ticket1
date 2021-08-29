
const express = require('express');
const app = express();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

const { AuthMiddlewares } = require('../../middleware');
const authMiddlewares = new AuthMiddlewares();


    
//Ruta para Login
app.get('/login', async (req,res) =>{ res.render('login')});



app.post('/login',authMiddlewares.validateUserExists,
    authMiddlewares.checkEmailAndPassword, async (req,res)=>{
    await loginController.login(req,res)});

module.exports = app;
    