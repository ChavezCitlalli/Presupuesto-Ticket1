
const { Usuarios } = require("../../db");
const sequelize = require('../../db/conexion');
const bcryptjs = require('bcryptjs');

class UsuarioModels {

//buscar usuario por ID
    async getUsuarioId({ id }) {
        const usuario = await Usuarios.findByPk(id);
        if(!usuario ) {
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        return usuario; 
    };
//existencia de usuario por EMAIL
    async getUsuarioEmail({ email }) {
        const usuario = await Usuarios.findOne({
            where: { email }
        });
        console.log(usuario);
        if(!usuario) {
            return {
                error: true,
                msg: 'Email o password son incorrectos',
                status: 400
            };
        }
        return usuario;
    };

    async newUsuario ({nombres, apellidos,usuario, email, pass}) {
        console.log (email,nombres, apellidos)
        const usuarioExiste = await this.getUsuarioEmail({email: email});
        console.log(!usuarioExiste.error);
        if(!usuarioExiste.error) {
            return {
                error: true,
                msg: 'El usuario con ese E-mail ya existe',
                status: 400
            };
        };
        const usuarios = await Usuarios.create({ 
            nombres, 
            apellidos, 
            usuario,
            email, 
            pass
        });
        const salt = bcryptjs.genSaltSync(10);
        usuarios.pass = bcryptjs.hashSync(pass, salt);
        await usuarios.save();
        delete usuarios.dataValues.pass;
        return usuarios;
    };

    async putUsuario({ id, body }) {
        const { nombres, apellidos, email, usuario} = body;
        const usuarios = await Usuarios.findByPk(id);
        if (!usuarios ){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        };
        await usuarios.update({ nombres, apellidos, email, usuario });
        return usuarios;
    };

    async deleteUsuario({ id }) {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario ){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        await usuario.destroy({ 
            where: {id_usuarios: id} });
        return true;
    }

}


module.exports = UsuarioModels;