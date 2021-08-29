const Joi = require("joi")


const { PresupuestoDTO } = require('../dto');

const presupuestoDTO = new PresupuestoDTO();

class PresupuestoMiddlewares {
    
    async checkPresupuesto (req, res, next) {
        try{
            await Joi.attempt(req.body, presupuestoDTO.post);
            return next();
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }
}


module.exports = PresupuestoMiddlewares