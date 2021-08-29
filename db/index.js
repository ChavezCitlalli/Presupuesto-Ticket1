
const Usuarios = require ('./usuarios.db');
const CostosAdministrativos = require ('./tablasModels/costosAdministrativos.db');
const CostosDirectos = require ('./tablasModels/costosDirectos.db');
const FlujoEfectivo = require ('./tablasModels/flujoefectivo.db');
const Ingresos = require ('./tablasModels/ingresos.db');
const Presupuestos = require ('./presupuestos.db');
const Recursos = require ('./tablasModels/recursos.db');
const CostoAValor = require('./valoresModels/costosAdministrativosValores.db');
const DirectosValor = require('./valoresModels/costosDirectosValores.db');
const IngresosValor = require('./valoresModels/ingresosValores.db');
const RecursosValor = require('./valoresModels/recursosValores.db');


module.exports = {
   
    Usuarios,
    CostosAdministrativos,
    CostosDirectos,
    FlujoEfectivo,
    Ingresos,
    Presupuestos,
    Recursos,
    IngresosValor,
    CostoAValor,
    DirectosValor,
    RecursosValor

};
