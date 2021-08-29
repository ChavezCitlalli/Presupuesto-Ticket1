const Joi = require("joi");

class AuthDTO {
    emailAndPassword = Joi.object().keys({
        email: Joi.string().max(60).email().required(),
        pass: Joi.string().min(6).max(50).required(),
    });
}

module.exports = AuthDTO;