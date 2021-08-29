const jwt = require('jsonwebtoken');

class JWTModels {
    
    generaJWT (user) {
        return new Promise((resolve, reject) => {
            const payload = user;
            jwt.sign({data: payload}, process.env.SECRET_KEY, {
                expiresIn: '24h'
            }, (err, token = '') => {
                if(err) {
                    console.log(err);
                    return reject({msg: 'No se pudo generar el token'});
                }
                resolve(token);
            });
        });

    }
}

module.exports = JWTModels;