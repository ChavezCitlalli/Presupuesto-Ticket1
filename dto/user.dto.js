const Joi = require("joi");

class UserDTO {

    post = Joi.object().keys({
        nombres: Joi.string().max(50).required(),
        apellidos: Joi.string().max(50).required(),
        email: Joi.string().max(50).email().required(),
        pass: Joi.string().min(6).max(50).required(),
        usuario: Joi.string().min(3).max(50).required()
    });
    put = Joi.object().keys({
        nombres: Joi.string().max(50).required(),
        apellidos: Joi.string().max(50).required(),
        email: Joi.string().max(50).email().required(),
        usuario: Joi.string().min(3).max(50).required()
    });
}

module.exports = UserDTO;