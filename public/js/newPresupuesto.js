const presupuesto = new Presupuesto();
const tableFlujo = document.getElementById('TableFlujo')
const tablaIngresos = document.getElementById('TableIngresos');
const tablaCostosDirectos = document.getElementById('TableDirectos');
const tablaAdministrativos = document.getElementById('TableAdministrativos');
const tablaRecursos = document.getElementById('TableAsignacion');

//Utilidades
let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
let mesSelector = 0;
let firstCol = true;
let numCols = 0;

class Presupuesto {
    constructor(){
        this.id = '',
        this.fecha = '',
        this.proyecto = '',
        this.version = 1
       
    }

    static async guardaPresupuesto (usuario) {
        localStorage.setItem("dataPresupuesto", JSON.stringify(usuario))
    }

    static async recuperaPresupuesto () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }


    //Funciones para Agregar Columnas a todas las Tablas
    agregarColumnas() {
        if(firstCol){
            Swal.fire({
            title: 'Eliga el mes de inicio',
            input: 'select',
            inputOptions: {
                0: 'Enero',
                1: 'Febrero',
                2: 'Marzo',
                3: 'Abril',
                4: 'Mayo',
                5: 'Junio',
                6: 'Julio',
                7: 'Agosto',
                8: 'Septiembre',
                9: 'Octubre',
                10: 'Noviembre',
                11: 'Diciembre',
            },
            showCancelButton: true,
            inputValidator: (value) => {
                mesSelector = value;
                this.addColEditYN('TableFlujo', 'input-flujo', mes[value]);
                this.addColNoEdit('TableEstado', 'input-estado', mes[value]);
                this.addColEditExtra('TableIngresos', 'input-ingresos', mes[value]);
                this.addColEditExtra('TableDirectos', 'input-directos', mes[value]);
                this.addColEditExtra('TableAdministrativos', 'input-admin', mes[value]);
                this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[value]);
                this.addColNoEditV2('TableCostos', 'input-costos', mes[value]);
                this.addColNoEditV2('TableRCostos', 'input-resumen', mes[value]);
                firstCol = false;
                numCols++
                }
            })
        } else {
            if(mesSelector == 11){
                mesSelector = 0;
                this.addColEditYN('TableFlujo', 'input-flujo', mes[mesSelector]);
                this.addColNoEdit('TableEstado', 'input-estado', mes[mesSelector]);
                this.addColEditExtra('TableIngresos', 'input-ingresos', mes[mesSelector]);
                this.addColEditExtra('TableDirectos', 'input-directos', mes[mesSelector]);
                this.addColEditExtra('TableAdministrativos', 'input-admin', mes[mesSelector]);
                this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[mesSelector]);
                this.addColNoEditV2('TableCostos', 'input-costos', mes[mesSelector]);
                this.addColNoEditV2('TableRCostos', 'input-resumen', mes[mesSelector]);
                numCols++
            } else {
                mesSelector++;
                this.addColEditYN('TableFlujo', 'input-flujo', mes[mesSelector]);
                this.addColNoEdit('TableEstado', 'input-estado', mes[mesSelector]);
                this.addColEditExtra('TableIngresos', 'input-ingresos', mes[mesSelector]);
                this.addColEditExtra('TableDirectos', 'input-directos', mes[mesSelector]);
                this.addColEditExtra('TableAdministrativos', 'input-admin', mes[mesSelector]);
                this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[mesSelector]);
                this.addColNoEditV2('TableCostos', 'input-costos', mes[mesSelector]);
                this.addColNoEditV2('TableRCostos', 'input-resumen', mes[mesSelector]);
                numCols++
            }
        }
    }

    addColEditYN(tableID, selector, mes) {
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === rowCount-3) {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-egresos" step="any">`
            } else if(i === (rowCount-2)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-total-mes" step="any">`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-acumulado-mes" step="any">`
            } else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}-ingresos" step="any">`
            }
        }
    }
    
    addColNoEdit(tableID, selector, mes) {
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-total-mes" step="any">`
            } else if(i === (rowCount-2)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-margen-mes" step="any">`
            } else if(i === rowCount-3) {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-costos" step="any">`
            } else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}-ventas" step="any">`
            }
        }
    }

    addColEditExtra(tableID, selector, mes) {
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-2);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-2);
                newCell.innerHTML = `<input readonly value="0" class="form-control ${selector}-total-mes" step="any">`
            }
            else {
                let newCell = row.insertCell(countCol-2);
                newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any" min="0">`
            }
        }
    }
    
    addColNoEditV2(tableID, selector, mes) {
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input readonly value="0" class="form-control ${selector}-total-mes" step="any">`
            }
            else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" readonly class="form-control ${selector}" step="any">`
            }
        }
    }

    //Funciones para eliminar las columnas
    eliminarColumnas(){
        if(numCols == 0){
            Swal.fire({
            icon: 'error',
            title: 'Intente mas tarde',
            text: 'No existen columnas',
            })
        } else {
            Swal.fire({
            title: 'La ultima columna se eliminará',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#54ca54be',
            cancelButtonColor: '#c42e2e',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    numCols--;
                    this.eliminarCol('TableFlujo');
                    this.eliminarCol('TableEstado');
                    this.eliminarCol2('TableIngresos');
                    this.eliminarCol2('TableDirectos');
                    this.eliminarCol2('TableAdministrativos');
                    this.eliminarCol2('TableAsignacion');
                    this.eliminarCol('TableCostos');
                    this.eliminarCol('TableRCostos');
                    if(mesSelector == 0){
                        mesSelector = 11;
                    } else {
                        mesSelector--;
                    }
                    if(numCols == 0){
                        firstCol = true;
                    }
                }
            })
        }        
    }
        
    eliminarCol(tableID){
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i].cells[countCol-2];    
            row.remove(countCol-1);
        }
    }
        
    eliminarCol2(tableID){
        let table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        let rowCount = table.rows.length;
        for(let i=0; i<rowCount; i++){   
            let row = table.rows[i].cells[countCol-3];    
            row.remove(countCol-2);
        }
    }

    //Funciones para agregar Filas
    agregarFila(tableID, selector) {
        Swal.fire({
            title: 'Ingrese el Concepto',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el nombre del Concepto'
                } else {
                    let tableRef = document.getElementById(tableID);
                    let newRow   = tableRef.insertRow(1);
                    let countCol = document.getElementById(tableID).rows[0].cells.length
                    for(let i = 0; i < countCol; i++){
                        if(i === 0){
                            let newCell  = newRow.insertCell(i);
                            newCell.textContent = `${concepto}`
                        } else if(i === (countCol-1)){
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<div class="text-center"><a class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></a></div>`
                        } else if(i === (countCol-2)){
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input readonly value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
                        } else {
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any">`
                        }
                    }
                }
            }
        })
    }

    addRowExtra(tableID, selector) {
        Swal.fire({
            title: 'Ingrese el Concepto',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el nombre del Concepto'
                } else {
                    let tableRef = document.getElementById(tableID);
                    let newRow   = tableRef.insertRow(1);
                    let countCol = document.getElementById(tableID).rows[0].cells.length
                    for(let i = 0; i < countCol; i++) {
                        if(i === 0){
                            let newCell  = newRow.insertCell(i);
                            newCell.textContent = `${concepto}`
                        } else if(i == 1) {
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = '<select class="form-select"><option>Opcion 1</option><option>Opcion 2</option><option>Opcion 3</option></select>'
                        } else if(i === (countCol-1)){
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<div class="text-center"><a class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></a></div>`
                        } else if(i === (countCol-2)){
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input readonly value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
                        } else {
                            let newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any">`
                        }
                    }
                }
            }
        })
    }

    addRows() {
        Swal.fire({
            title: 'Rol del Recurso',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el Rol del Recurso'
                } else { 
                    Swal.fire({
                        title: 'Costo Mensual',
                        input: 'number',
                        showCancelButton: true,
                        inputValidator: (costo) => {
                            if (!costo) {
                            return 'Se requiere ingresar el Costo Mensual'
                            } else {
                                this.addRowRecursos('TableAsignacion', 'input-asignacion', concepto, costo)
                                this.addRowHijosRecursos('TableCostos', 'input-costos', concepto)
                                this.addRowHijosRecursos('TableRCostos', 'input-resumen', concepto)
                            }
                        }
                    })
                }
            }
        })
    }

    addRowRecursos(tableID, selector, rol, costo) {
        let tableRef = document.getElementById(tableID);
        let newRow   = tableRef.insertRow(1);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        for(let i = 0; i < countCol; i++){
            if(i === 0){
                let newCell  = newRow.insertCell(i);
                newCell.textContent = `${rol}`
            } else if(i === (countCol-1)){
                let newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<div class="text-center"><a class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></a></div>`
            } else if(i === (countCol-2)){
                let newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input readonly value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
            } else if(i === 1){
                let newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input readonly value="${costo}" type="number" class="form-control ${selector}-costo-mensual" step="any">`
            } else {
                let newCell  = newRow.insertCell(i);
                //Cambiar a Porcentaje
                newCell.innerHTML = `<input value="1" type="number" class="form-control ${selector}" min="1" max="100" step="1">`
            }
        }
    }
        
    addRowHijosRecursos(tableID, selector, rol) {
        let tableRef = document.getElementById(tableID);
        let newRow   = tableRef.insertRow(1);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        for(let i = 0; i < countCol; i++){
            if(i === 0){
                let newCell  = newRow.insertCell(i);
                newCell.textContent = `${rol}`
            } else if(i === (countCol-1)){
                let newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input readonly value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
            } else {
                let newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input value="0" readonly type="number" class="form-control ${selector}" step="any">`
            }
        }
    }
    
    //Funciones para eliminar Filas
    eliminarFila(event){
        event.preventDefault();
        if(event.target.classList.contains('borrar-fila')){
            Swal.fire({
                title: '¿Seguro que quiere eliminar la fila seleccionada?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#54ca54be',
                cancelButtonColor: '#c42e2e',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        event.target.parentElement.parentElement.parentElement.remove();
                    }
            })
        } 
        else if(event.target.parentElement.classList.contains('borrar-fila')) {
            Swal.fire({
                title: '¿Seguro que quiere eliminar la fila seleccionada?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#54ca54be',
                cancelButtonColor: '#c42e2e',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        event.target.parentElement.parentElement.parentElement.parentElement.remove();
                    }
            })
        }
    }

    eliminarFilasRecursos(event){
        event.preventDefault();
        if(event.target.classList.contains('borrar-fila')){
            Swal.fire({
                title: '¿Seguro que quiere eliminar la fila seleccionada?',
                text: 'Esta acción eliminara las filas de las siguientes 2 tablas',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#54ca54be',
                cancelButtonColor: '#c42e2e',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let td = event.target.parentElement.parentElement; 
                        let tr = td.parentNode;
                        let index = Array.from(tr.parentNode.children).indexOf(tr);
                        let tableCostos = document.getElementById("TableCostos");
                        tableCostos.deleteRow(index)
                        let tableRCostos = document.getElementById("TableRCostos");
                        tableRCostos.deleteRow(index)
                        event.target.parentElement.parentElement.parentElement.remove();
                    }
            })
        } 
        else if(event.target.parentElement.classList.contains('borrar-fila')) {
            Swal.fire({
                title: '¿Seguro que quiere eliminar la fila seleccionada?',
                text: 'Esta acción eliminara las filas de las siguientes 2 tablas',
                icon: 'warning',
                showCancelButton: true,
                cconfirmButtonColor: '#54ca54be',
                cancelButtonColor: '#c42e2e',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let td = event.target.parentElement.parentElement.parentElement; 
                        let tr = td.parentNode;
                        let index = Array.from(tr.parentNode.children).indexOf(tr);
                        let tableCostos = document.getElementById("TableCostos");
                        tableCostos.deleteRow(index)
                        let tableRCostos = document.getElementById("TableRCostos");
                        tableRCostos.deleteRow(index)
                        event.target.parentElement.parentElement.parentElement.parentElement.remove();
                    }
            })
        }
    }
}

