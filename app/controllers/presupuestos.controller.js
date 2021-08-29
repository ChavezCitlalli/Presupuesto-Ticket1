const PresupuestoModel = require('../models/presupuestos.models');
const presupuestoModel = new PresupuestoModel();

class PresupuestoController {

    async obtenerPresupuestos () {
    try {
    let resultado = await presupuestoModel.listarPresupuestos();
    return resultado;
    }catch (err) {
        throw new Error ({error: err.message})
        };
    };

    async nuevoPresupuesto  (res,req) {

        const { proyecto, version,  mes,  valores } =req.body;;
        let result = new PresupuestoModel(proyecto, version, mes, valores);      
        try {
            let resultado = await result.nuevoPresupuesto();
            if(resultado){
                res.status(200).json('ok');
            }
        } catch (error) {
            throw error;
        };
    };

    async deletePresupuesto ({res,req}) {
        const { id } = req.params;
        try {
            let resultado = await presupuestoModel.eliminarPresupuesto({id:id});
            if(resultado.error){
                return res.status(resultado.status).json({error: resultado.msg});
            }
            return resultado;
        } catch (error) {
            throw new Error ('No se puede eliminar el presupuesto');
        };    
    }

    async informeDePresupuesto (res,req) {
        let id = req.params.id;
        try {
            let resultado = await presupuestoModel.detallesPresupuesto(id);
            if(resultado != false){
                res.status(200).json(resultado);
            } else {
                throw new Error ('No existe el Presupuesto')
            }
        } catch (err) {
            console.log(err)
            throw new Error (err)
        }
    }

    async actualizarPresupuesto (res,req) {
    const id = req.params.id;
    const { proyecto, version, mes, valores } = datos;
    let resultado = new presupuestoModel(proyecto, version,  mes,  valores);      
    try {
        let result = await resultado.modificarPresupuesto(id);
        return result;
    } catch (error) {
        throw error;
    }   
}

};
module.exports = PresupuestoController;











// const PresupuestoModel = require('../services/presupuestos.services');

// module.exports.obtenerPresupuestos = async () => {
//     try {
//     let resultado = await PresupuestoModel.listarPresupuestos();
//     return resultado
//     }catch (err) {
//         throw new Error ({error: err.message})
//     };
// };

// module.exports.nuevoPresupuesto = async (data) => {
//     const { proyecto, version,  mes,  valores } = data;
//     let result = new PresupuestoModel(proyecto, version, mes, valores);      
//     try {
//         let resultado = await result.nuevoPresupuesto();
//         return resultado;
//     } catch (error) {
//         throw error;
//     };
// };

// module.exports.deletePresupuesto = async (data) => {
//     try {
//         let resultado = await PresupuestoModel.eliminarPresupuesto(data);
//         return resultado;
//     } catch (error) {
//         throw new Error ('No se puede eliminar el presupuesto');
//     };    
// }

// module.exports.informeDePresupuesto = async (id) => {
//     try {
//         let resultado = await PresupuestoModel.detallesPresupuesto(id);
//         if(resultado != false){
//             return resultado
//         } else {
//             throw new Error ('No existe el Presupuesto')
//         }
//     } catch (err) {
//         console.log(err)
//         throw new Error (err)
//     }
// }

// module.exports.actualizarPresupuesto = async (id, datos) => {
//     const { proyecto, version, mes, valores } = datos;
//     let resultado = new PresupuestoModel(proyecto, version,  mes,  valores);      
//     try {
//         let result = await resultado.modificarPresupuesto(id);
//         return result;
//     } catch (error) {
//         throw error;
//     }   
// }