const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Usuarios } = require("../../db/index");


class LoginModels {

    async login ({email, pass})  {
        const user = await this.existenciaDeUsuario({email});
        const validPassword = bcryptjs.compareSync(pass+'', user.pass);

        if(!validPassword) {
            return {
                error: true,
                msg: 'Email o password incorrectos',
                status: 400
            }
        }
        delete user.dataValues.pass;
        const token = await this.generarJWT(user);
        return {
            user,
            token
        }
    }

    async existenciaDeUsuario ({email}) {
    //chequear con la base de datos que exista el usuario
        let resultado = await Usuarios.findOne({where: {email: email}});
        if (resultado === null){
            return false;
        }else {
            return resultado;
        };
    };

    generarJWT (user) {
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
  
};
module.exports = LoginModels;