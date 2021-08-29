const Joi = require("joi");
const jwt = require('jsonwebtoken');


const { Usuarios } = require("../db");
const { AuthDTO } = require("../dto");

const authDTO = new AuthDTO();
const LoginModels = require("../app/models/login.models");

const loginModels = new LoginModels();

class AuthMidlewares {
    
    async checkEmailAndPassword(req, res, next) {
        try{
            await Joi.attempt(req.body, authDTO.emailAndPassword);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async validateToken(req, res, next) {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        } 
        try {
            const {data} = jwt.verify(token, process.env.SECRET_KEY);
            const user = await Usuarios.findByPk(data.id_usuarios);
            if(!user) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe en DB'
                });
            }
            // Se agrega al req el usuario descodificado para tratarlo despues con el middleware validateAdminRole
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }

   

    async validateUserExists(req, res, next) {
        const { email, pass } = req.body;
        console.log(email, pass);
        try {
            const user = await loginModels.login({ email, pass });
            if (!user) {
                return res.status(400).json({
                    msg: 'Usuario o contraseña incorrectos'
                });
            }
            return next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Hable con el administrador'
            });
        }
    }
}

module.exports = AuthMidlewares;