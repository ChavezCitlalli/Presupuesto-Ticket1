const Joi = require('joi')
const validaciones = require('./verificar.dto')

const validarLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloLogin, 'Los datos ingresados no son correctos para el login')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRegistro = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloRegistro, 'Los datos ingresados no son correctos para realizar el registro');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarActualizacion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloActualizar, 'Los datos ingresados no son correctos para actualizar sus datos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarPresupuesto = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.modeloPresupuesto, 'Los datos ingresados no son correctos para el Presupuesto');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    validarLogin,
    validarRegistro,
    validarActualizacion,
    validarPresupuesto
}