const presupuesto = new Presupuesto();
const tableFlujo = document.getElementById('TableFlujo')
const tablaIngresos = document.getElementById('TableIngresos');
const tablaCostosDirectos = document.getElementById('TableDirectos');
const tablaAdministrativos = document.getElementById('TableAdministrativos');
const btnEliminarC = document.getElementById('delColumn');
const btnAdmin = document.getElementById('agregarAdmin');
const btnRecursos = document.getElementById('agregarRecursos');
const tablaRecursos = document.getElementById('TableAsignacion');
const btnAgregarC = document.getElementById('addColumn');
const btnIngresos = document.getElementById('agregarIngresos');
const btnDirectos = document.getElementById('agregarDirectos');

console.log (tablaIngresos);
cargarEventos();
muestreo();

function cargarEventos() {
    tablaIngresos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaCostosDirectos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaAdministrativos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaRecursos.addEventListener('click', (e) => { presupuesto.eliminarFilasRecursos(e) });
    btnAgregarC.addEventListener('click', (e) => { presupuesto.agregarColumnas() });
    btnEliminarC.addEventListener('click', (e) => { presupuesto.eliminarColumnas() });
    btnIngresos.addEventListener('click', (e) => { presupuesto.agregarFila('TableIngresos', 'input-ingresos') });
    btnDirectos.addEventListener('click', (e) => { presupuesto.addRowExtra('TableDirectos', 'input-directos') });
    btnAdmin.addEventListener('click', (e) => { presupuesto.addRowExtra('TableAdministrativos', 'input-admon') });
    btnRecursos.addEventListener('click', (e) => { presupuesto.addRows() });
}

function muestreo() {
    let tr = tableFlujo.children[1];
    console.log(tr);
    let index = Array.from(tr.children);
    index.shift()
    console.log(index);
}

function calculaResumen() {
    const nCantidad = Object.values(ca).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(ca).reduce((acc,{cantidad, price}) => acc + cantidad * price,0)
    console.log(nCantidad)
    console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

}