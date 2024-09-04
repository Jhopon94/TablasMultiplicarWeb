
const btnCalificar = document.getElementById('btnCalificar');
btnCalificar.style.visibility = 'hidden';

//Variables Modo Examen
let modoExamen = false;
let arrayTablasExamen = [];
let arrayResultados = [false, false, false, false, false, false, false, false, false];
let tablaSeleccExamen = 0;

const fondoModal = document.getElementById("fondoModal");
const modal = document.getElementById('modal');

//Elementos a cambiar en modo examen
const listaSelecc = document.getElementById('listaSelecc');
const btnExamen = document.getElementById('btnExamen');
const btnNuevaMulti = document.getElementById('btnNueva');
const contenedorListasGeneral = document.getElementById('contSeleccTablas');

const cajitaResultado = document.getElementById('cajitaNum');
const etNumUno = document.getElementById('numUno');
const etNumDos = document.getElementById('numDos');

//Tablas Selecc
const tablaUno = document.getElementById('tablaUno');
const tablaDos = document.getElementById('tablaDos');
const tablaTres = document.getElementById('tablaTres');
const tablaCuatro = document.getElementById('tablaCuatro');
const tablaCinco = document.getElementById('tablaCinco');
const tablaSeis = document.getElementById('tablaSeis');
const tablaSiete = document.getElementById('tablaSiete');
const tablaOcho = document.getElementById('tablaOcho');
const tablaNueve = document.getElementById('tablaNueve');

const arrayTablasInput = [tablaUno, tablaDos, tablaTres,
    tablaCuatro, tablaCinco, tablaSeis, tablaSiete, tablaOcho, tablaNueve];

cajitaResultado.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('btnCalificar').click();
    }
});

function Multiplicar() {
    if (modoExamen) {
        MultiplicarModoExamen();
    } else {
        const numUno = etNumUno.innerHTML;
        const numDos = etNumDos.innerHTML;
        const resultadoReal = numUno * numDos;
        const resultadoEscrito = cajitaResultado.value;

        if (resultadoEscrito != "") {
            if (resultadoEscrito != resultadoReal) {
                ErrorResultado();
            } else {
                if (resultadoReal != 0) {
                    ResultadoExitoso();
                }
            }
        } else {
            ErrorResultado();
        }
    }
}

function ErrorResultado() {
    cajitaResultado.classList.remove("condicionError");
    cajitaResultado.classList.remove("condicionExito");
    void cajitaResultado.offsetWidth;
    cajitaResultado.classList.add("condicionError");
    cajitaResultado.value = "";
    cajitaResultado.focus();
}

function ResultadoExitoso() {
    cajitaResultado.classList.remove("condicionExito");
    cajitaResultado.classList.remove("condicionError");
    void cajitaResultado.offsetWidth;
    cajitaResultado.classList.add("condicionExito");
    cajitaResultado.value = "";
    nuevaMulti();
    cajitaResultado.focus();
}

function DosDigitos() {
    let cajitaResultado = document.getElementById('cajitaNum');
    let resultado = cajitaResultado.value;

    if (resultado.length > 2) {
        let nuevoValor = resultado.toLocaleString().substring(0, 2);
        cajitaResultado.value = nuevoValor;
        document.getElementById('btnCalificar').focus();
    }
    if (resultado.length == 2) {

    }
}

function nuevaMulti() {
    if (modoExamen) {
        NuevaMultiExamen();
    } else {
        let arrayAuxTablas = [];

        arrayTablasInput.forEach((tabla, index) => {
            if (tabla.checked) arrayAuxTablas.push(index + 1);
        });

        if (arrayAuxTablas.length > 0) {
            console.log("Genial");

            let numUnoAux = arrayAuxTablas[(Math.floor(Math.random() * arrayAuxTablas.length))];

            let numDosAux = Math.floor(Math.random() * 9) + 1; //Solo funciona con minimo 1

            document.getElementById('numUno').innerHTML = numUnoAux;
            document.getElementById('numDos').innerHTML = numDosAux;
            document.getElementById('btnCalificar').style.visibility = 'visible';
            document.getElementById('cajitaNum').focus();
        } else {
            alert("Debes elegir al menos una tabla!");
        }
    }
}

/////////////////////////////////////////////
// Pre Examen /////////////////////////////

function ActivarModal() {
    fondoModal.classList.remove("inactivo");
    modal.classList.remove("inactivo");
}

function CancelarExamen() {
    location.reload();
}

/////////////////////////////////////////////
/////////////////////////////////////////////


/////////////////////////////////////////////
// Modo Examen /////////////////////////////

function NuevaMultiExamen() {
    console.log(arrayTablasExamen);
    if (arrayTablasExamen.length < 9) {
        let numUnoAux = tablaSeleccExamen;
        let numDosAux = Math.floor(Math.random() * 9) + 1;
        while (arrayTablasExamen.includes(numDosAux)) {
            numDosAux = Math.floor(Math.random() * 9) + 1;
        }
        arrayTablasExamen.push(numDosAux);

        document.getElementById('numUno').innerHTML = numUnoAux;
        document.getElementById('numDos').innerHTML = numDosAux;
        document.getElementById('btnCalificar').style.visibility = 'visible';
        document.getElementById('cajitaNum').focus();
        btnNuevaMulti.disabled = true;
        btnNuevaMulti.classList.add("btnInvisible");
    } else {
        let auxCalificacion = 0;
        arrayResultados.forEach(resultado => {
            if (resultado === true) auxCalificacion += 1;
        });
        // Calificar examen con retraso para que se pinte la ultima tabla;
        setTimeout(function () {
            alert("Examen terminado, calificacion: " + RedondearCalificacion(auxCalificacion));
        }, 0);
        CancelarExamen();
    }

}

function RedondearCalificacion(calif) {
    let numero = ((calif * 4) / 9) + 1 //Se divide por 4 porque la calificacion es de 1 a 5, es decir, rango 4
    return Math.floor(numero * 10) / 10;
}

function MultiplicarModoExamen() {
    const numUno = etNumUno.innerHTML;
    const numDos = etNumDos.innerHTML;
    const resultadoReal = numUno * numDos;
    const resultadoEscrito = cajitaResultado.value;

    if (resultadoEscrito != "") {

        if (resultadoEscrito != resultadoReal) {
            ErrorResultadoExamen(numDos);
        } else {
            if (resultadoReal != 0) {
                ResultadoExitosoExamen(numDos);
            }
        }
    } else {
        ResultadoVacioExamen();
    }
}

function ErrorResultadoExamen(indexTabla) {
    //Se pinta el fondo de la tabla correcta
    const listaExamen = document.getElementById("listaSeleccExamen");
    const listaItems = listaExamen.getElementsByTagName("li");
    listaItems[indexTabla - 1].classList.add("tablaErronea");

    cajitaResultado.classList.remove("condicionError");
    cajitaResultado.classList.remove("condicionExito");
    void cajitaResultado.offsetWidth;
    cajitaResultado.classList.add("condicionError");
    cajitaResultado.value = "";
    NuevaMultiExamen();
    cajitaResultado.focus();
}

function ResultadoVacioExamen() {
    cajitaResultado.classList.remove("condicionError");
    cajitaResultado.classList.remove("condicionExito");
    void cajitaResultado.offsetWidth;
    cajitaResultado.classList.add("condicionError");
    cajitaResultado.value = "";
    cajitaResultado.focus();
}

function ResultadoExitosoExamen(indexTabla) {
    //Se pone resultado en array de resultados
    arrayResultados[indexTabla - 1] = true;
    //Se pinta el fondo de la tabla correcta
    const listaExamen = document.getElementById("listaSeleccExamen");
    const listaItems = listaExamen.getElementsByTagName("li");
    listaItems[indexTabla - 1].classList.add("tablaCorrecta");

    cajitaResultado.classList.remove("condicionExito");
    cajitaResultado.classList.remove("condicionError");
    void cajitaResultado.offsetWidth;
    cajitaResultado.classList.add("condicionExito");
    cajitaResultado.value = "";
    NuevaMultiExamen();
    cajitaResultado.focus();
}

function ActivarExamen(tabla) {
    modoExamen = true;
    tablaSeleccExamen = tabla;
    console.log("modo examen es: " + modoExamen + " y tabla elegida es: " + tablaSeleccExamen);
    CerrarModal();
    listaSelecc.classList.add("modoExamenListaTablas");
    btnExamen.classList.add("modoExamenBtnExamen");
    btnExamen.innerHTML = "Cancelar Examen";
    btnCalificar.innerHTML = "Siguiente"
    NuevaMultiExamen();
    CrearListaTablaExamen();
}

function CerrarModal() {
    fondoModal.classList.add("inactivo");
    modal.classList.add("inactivo");
}

function CrearListaTablaExamen() {
    //Se crea array con las tablas
    let arrayTablasResultado = [];
    //Se insertan los valores según la tabla seleecionada
    for (let i = 1; i <= 9; i++) {
        arrayTablasResultado.push(tablaSeleccExamen.toString() + " X " + i.toString());
    }
    //Se crea la lista ordenada
    const listaTablaExamen = document.createElement('ol');
    //Se crean los elementos de la lista y se unen a la lista
    arrayTablasResultado.forEach(element => {
        const item = document.createElement('li');
        item.textContent = element;
        item.classList.add("elementosListaExamen");
        listaTablaExamen.appendChild(item);
    });
    //Se une la lista al DOM
    listaTablaExamen.setAttribute("id", "listaSeleccExamen");
    listaTablaExamen.classList.add("listaSeleccExamen");
    contenedorListasGeneral.innerHTML = '';//Para limpiar el contenedor antes de agregar algo nuevo
    contenedorListasGeneral.appendChild(listaTablaExamen);
}

/////////////////////////////////////////////
/////////////////////////////////////////////
document.getElementById('btnNueva').focus();

