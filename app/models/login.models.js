const bcryptjs = require('bcryptjs');

const { Usuarios } = require("../../db/index");

const JWTModel = require('./jwt.models');
const jwtModel = new JWTModel();

class LoginModels {

    async login ({ email, pass })  {
        const user = await this.existenciaDeUsuario({email});
        if(!user) {
            return {
                error: true,
                msg: 'Email o password incorrectos',
                status: 400
            }
        }
        const validPassword = bcryptjs.compareSync(pass+'', user.pass);
        if(!validPassword) {
            return {
                error: true,
                msg: 'Email o password incorrectos',
                status: 400
            }
        }
        delete user.dataValues.pass;
        const token = await jwtModel.generaJWT(user);
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

    
  
};
module.exports = LoginModels;