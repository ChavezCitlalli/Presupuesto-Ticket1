const sequelize = require('../../db/conexion');
const Presupuestos = require('../models/tablasModels/model.presupuestos');
const FlujoEfectivo = require('../models/tablasModels/model.flujoefectivo');
const Ingresos = require('../models/tablasModels/model.ingresos');
const IngresosValor = require('../models/valoresModels/model.ingresosValores');
const CostosDirectos = require('../models/tablasModels/model.costosDirectos');
const DirectosValor = require('../models/valoresModels/model.costosDirectosValores');
const CostosAdministrativos = require('../models/tablasModels/model.costosAdministrativos');
const CostoAValor= require('../models/valoresModels/model.costosAdministrativosValores');
const Recursos = require('../models/tablasModels/model.recursos');
const RecursosValor = require('../models/valoresModels/model.recursosValores');


module.exports = class PresupuestoModel {
  constructor(proyecto, version,  mes,valores) {
      this.proyecto = proyecto;
      this.version = version;
      this.mes = mes;
      this.valores = valores;
  }

  //Crear Presupuesto
  nuevoPresupuesto = async () => {
    try {
      let nuevoPresupuesto = await Presupuestos.create({
          proyecto: this.proyecto,
          version: this.version,
          mes: this.mes
        });

       //guardar
        this.valores.flujoEfectivo.forEach(async ingreso => {
            await FlujoEfectivo.create({
                ingreso: ingreso,
                presupuesto_id: nuevoPresupuesto.id
            });
        });

        this.valores.ingresos.forEach(async ingreso => {
            let nuevoIngreso = await Ingresos.create({
                concepto: ingreso.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            ingreso.valores.forEach(async valorIngreso => {
                await IngresosValor.create({
                    valor: valorIngreso,
                    ingreso_id: nuevoIngreso.id
                });
            });
        });
        
        this.valores.directos.forEach(async costoDirecto => {
            let nuevoDirecto = await CostosDirectos.create({
                concepto: costoDirecto.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            costoD.valores.forEach(async valorD => {
                await DirectosValor.create({
                    valor: valorD,
                    directo_id: nuevoDirecto.id
                });
            });
        });
        
        this.valores.administrativos.forEach(async costoAdmin => {
            let nuevoCosto = await CostosAdministrativos.create({
                concepto: gastoAdmon.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            costoAdmin.valores.forEach(async valorA => {
                await CostoAValor.create({
                    valor: valorA,
                    admin_id: nuevoCosto.id
                });
            });
        });            

        this.valores.recursos.forEach(async recurso => {
            let nuevoRecurso = await Recursos.create({
                concepto: recurso.concepto,
                costo: recurso.costoMensual,
                presupuesto_id: nuevoPresupuesto.id
            });
            recurso.valores.forEach(async valorRP => {
                await RecursosValor.create({
                    valor: valorRP,
                    recurso_id: nuevoRecurso.id
                });
            });
        });
      return true;
    } catch (error) {
        throw new Error('No se pudo crear el Presupuesto');
    }
  }

  //Mostrar todos lo Presupuestos
  static listarPresupuestos = async () => {
      try {
        let resultado = await sequelize.query("SELECT id, proyecto, version, CONVERT(varchar(10), createdAt) AS fecha FROM dbo.presupuestos ")
        
        return resultado[0]
      } catch (error) {
        throw new Error('Error al consultar la DB');
      }
  }


  static detallesPresupuesto = async (id) => {
    try{
        let presupuesto = await Presupuestos.findOne({
            where: {
                id: id,
            },
            attributes: ['id', 'proyecto', 'version', 'mes', 'createdAt'],
            include: [                                                        
                {
                    model: FlujoEfectivo,
                    attributes: ['id', 'ingreso'],                        
                },
                {
                    model: Ingresos,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: IngresosValor,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: CostosDirectos,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: DirectosValor,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: CostosAdministrativos,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: CostoAValor,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: Recursos,
                    attributes: ['id', 'concepto', 'costo'],
                    include: {
                        model: RecursosValor,
                        attributes: ['id', 'valor']
                    }
                }
            ] 
            
        });           
        if(presupuesto == null){
            return false;
        } else {
            return presupuesto;
        }
    } catch (error) {
        throw new Error('Error al consultar la DB');
      }
  }

  //Modificar Presupuesto
  modificarPresupuesto = async (id) => {
    try {
        let actualizaPresupuesto = await Presupuestos.findOne({
            where: {id: id}
        })

        if(actualizaPresupuesto != null){
            await Presupuestos.update({
                proyecto: this.proyecto,
                version: this.version,
                mes: this.mes},
                {where: { id : id}})

                //Se eliminan los datos anteriores para dar espacio a los nuevos
                    FlujoEfectivo.destroy({
                        where: { presupuesto_id: id }
                    });
                    Ingresos.destroy({
                        where: { presupuesto_id: id }
                    });
                    CostosDirectos.destroy({
                        where: { presupuesto_id: id }
                    });
                    CostosAdministrativos.destroy({
                        where: { presupuesto_id: id }
                    });
                    Recursos.destroy({
                        where: { presupuesto_id: id }
                    });                        
                       //Guardar los nuevos datos
                    this.valores.flujoEfectivo.forEach(async ingreso => {
                        await FlujoEfectivo.create({
                            ingreso: ingreso,
                            presupuesto_id: id
                        });
                    });
            
                    this.valores.ingresos.forEach(async ingreso => {
                        let nuevoIngreso = await Ingresos.create({
                            concepto: ingreso.concepto,
                            presupuesto_id: id
                        });
                        ingreso.valores.forEach (async valorIngreo => {
                            await IngresosValor.create({
                                valor: valorIngreso,
                                ingreso_id: nuevoIngreso.id
                            });
                        });
                    });
                    
                    this.valores.directos.forEach(async costoDirecto => {
                        let nuevoDirecto = await CostosDirectos.create({
                            concepto: costoDirecto.concepto,
                            presupuesto_id: id
                        });
                        costoD.valores.forEach(async valorDirecto => {
                            await DirectosValor.create({
                                valor: valorDirecto,
                                directo_id: nuevoDirecto.id
                            });
                        });
                    });
                    
                    this.valores.administrativos.forEach(async costoAdmin => {
                        let nuevoCosto = await CostosAdministrativos.create({
                            concepto: costoAdmin.concepto,
                            presupuesto_id: id
                        });
                        costoAdmin.valores.forEach(async valorA => {
                            await CostoAValor.create({
                                valor: valorA,
                                admin_id: nuevoCosto.id
                            });
                        });
                    });            
            
                    this.valores.recursos.forEach(async recurso => {
                        let nuevoRecurso = await Recursos.create({
                            concepto: recurso.concepto,
                            costo: recurso.costoMensual,
                            presupuesto_id: id
                        });
                        recurso.valores.forEach(async valorRecuros => {
                            await RecursosValor.create({
                                valor: valorRecuros,
                                recurso_id: nuevoRecurso.id
                            });
                        });
                    });
            return true;
        } else {
            throw new Error('No existe el Presupuesto');
        }
      } catch (error) {
          throw new Error('No se pudo Modificar el Presupuesto');
      }
  }

  //Eliminar Presupuesto
  static eliminarPresupuesto = async (id) => {
    try {
        await Presupuestos.update({
            estado: 'Eliminado'}, 
            {where: { id : id}})
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el presupuesto seleccionado')
    }
  }
} 