
const UsuarioModels = require("../models/usuarios.models");

const usuarioModels = new UsuarioModels();


class UsuarioController {
    
  

    async getUsuarioId(req,res) {
        let { id } = req.params;
        try {
            const usuario = await usuarioModels.getUsuarioId({id:id});
            if(usuario.error){
                return res.status(usuario.status).json({error: usuario.msg});
            }
            res.render('usuario', {result:usuario});
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
    
    async newUsuario(req, res) {
        const {  nombres, apellidos, usuario, email, pass  } = req.body;
        try {
            const usuarios = await usuarioModels.newUsuario({ nombres, apellidos, usuario, email, pass  });
            if(usuarios.error) {
                return res.status(usuarios.status).json({
                    error: usuarios.msg
                })
            }
            await usuarios.save();
            res.send(usuarios);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        }
    }

    async putUsuario(req, res) {
        const { id } = req.params;
        const usuarioData = req.body;
        try {
            const usuario = await usuarioModels.putUsuario({ id, body: usuarioData });
            if (usuario.error) {
                return res.status(400).json({ error: usuario.msg });
            }
            res.send(usuario);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        };
    };

    async deleteUsuario(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuarioModels.deleteUsuario({ id });
            if (usuario.error) {
                return res.status(usuario.status).json({ error: usuario.msg });
            }
            res.send(usuario)
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        }
    };
};

module.exports = UsuarioController;










// const ModelUsers = require('../services/usuarios.services');
// const sequelize = require('../../db/conexion');
// const jwt = require('jsonwebtoken');

// //Exportar mis modulos
// module.exports.generaToken = async (data) => {
//     try {
//         let resultado = jwt.sign({
//             exp: Math.floor(Date.now() / 1000) + (60 * 60),
//             data
//         }, process.env.SECRET_KEY
//         )
//         return resultado
//     }catch (err){
//         console.log(err)
//         throw new Error (err)
//     }
// };

// module.exports.chequearUsuario = async (user) => {
//     const {email, pass} = user;
//     let usuario = new ModelUsers('', '', '', email, pass);
//     try {
//         let resultado =  await usuario.existenciaDeUsuario();
//         if (resultado) {
//             let result =  await usuario.usuarioAutenticado();
//             return result
//         }else {
//             throw new Error ('Contraseña Incorrecta');
//         }
//     }catch (err){
//         throw new Error ('No existe el usuario');
//     }
// };

// module.exports.registroNuevoUsuario = async (user) => {
//     const { nombres, apellidos, usuario, email, pass  } = user;
//     let nuevoUsuario = new ModelUsers(nombres, apellidos, usuario, email, pass); 
//     try {
//         let resultado = await nuevoUsuario.registrarNuevoUsuario();
//         if(resultado){
//             let result =  await nuevoUsuario.usuarioAutenticado();
//             return result;
//         } else {
//             throw new Error ('No se pudo crear el usuario');
//         }
//     } catch (error) {
//         throw error;
//     }  
// }

// //Seleccionar un solo usuario por ID
// module.exports.buscarUsuario = async (data)=>{
//     try {
//         let resultado = await ModelUsers.infoUsuario(data);
//         let result = resultado.dataValues;
//         return result;
//     }catch (err) {
//         throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
//     }
// }

// module.exports.updateUsuario = async (id, user) => {
//     const {nombres, apellidos, usuario, email, pass} = user;
//     let usuarioActualizar = new ModelUsers(nombres, apellidos, usuario, email, pass);
//     try {
//         let resultado =  await usuarioActualizar.actualizarUsuario(id);
//         let result = resultado.dataValues;
//         return result;
//     }catch (err){
//         throw new Error ('No existe el usuario actualizar');
//     }
// }

// module.exports.eliminarUsuario = async (id) => {
//     try {
//         let result = await ModelUsers.deleteUser(id)
//         return true;
//     }catch (err){
//         throw new Error ('No se pudo eliminar el usuario seleccionado')
//     }
// };
