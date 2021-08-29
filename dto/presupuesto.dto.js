const Joi = require('joi');

class PresupuestoDTO {
    
    post = Joi.object().keys({
        proyecto: Joi.string().regex(/^[ .a-zA-Z0-9]+$/).required().min(3).max(60),
        version: Joi.number().required().min(1),
        mes: Joi.string().regex(/^[a-zA-Z]+$/).required(),
        valores: Joi.object().required().keys({
            flujoEfectivo: Joi.array().required().items(Joi.number().precision(2).min(0).required()),
            ingresos: Joi.array().items(
                Joi.object().keys({
                    concepto: Joi.string().regex(/^[ .a-zA-Z]+$/).max(30).allow(""),
                    valores: Joi.array().items(Joi.number().precision(2).min(0))
                })
            ),
            directos: Joi.array().items(
                Joi.object().keys({
                    concepto: Joi.string().regex(/^[ .a-zA-Z]+$/).max(30).allow(""),
                    valores: Joi.array().items(Joi.number().precision(2).min(0))
                })
            ),
            administrativos: Joi.array().items(
                Joi.object().keys({
                    concepto: Joi.string().regex(/^[ .a-zA-Z]+$/).max(30).allow(""),
                    valores: Joi.array().items(Joi.number().precision(2).min(0))
                })
            ),
            recursos: Joi.array().items(
                Joi.object().keys({
                    concepto: Joi.string().regex(/^[ .a-zA-Z]+$/).max(30).allow(""),
                    costoMensual: Joi.number().precision(2).min(0),
                    valores: Joi.array().items(Joi.number().min(1).max(100))
                })
            ),
        })
    })

}
module.exports = PresupuestoDTO;