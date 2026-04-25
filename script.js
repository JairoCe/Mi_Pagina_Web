let ingresos = 0;
let gastos = 0;
//agregar ingreso//
function agregarIngreso() {
    let valor = Number(document.getElementById("monto").value);

    if (valor <= 0 || isNaN(valor)) {
        alert("Ingresa un valor válido");
        return;
    }

    ingresos += valor;
    actualizarBalance();
    limpiarInput();
}

//agregar gasto//
function agregarGasto() {
    let valor = Number(document.getElementById("monto").value);

    if (valor <= 0 || isNaN(valor)) {
        alert("Ingresa un valor válido");
        return;
    }

    gastos += valor;
    actualizarBalance();
    limpiarInput();
}

//actualizar balance//
function actualizarBalance() {
    let balance = ingresos - gastos;
    document.getElementById("balance").innerText = "Balance: $" + balance;
}

//limpiar input//
function limpiarInput() {
    document.getElementById("monto").value = "";
}


function mostrarSeccion(opcion) {

    let contenido = document.getElementById("contenido");

    if (opcion === "resumen") {
        contenido.innerHTML = `
            <h2>Resumen Financiero</h2>
            <p>Balance actual:</p>
            <p id="balance">Balance: $0</p>
        `;
    }

    else if (opcion === "ingresos") {
        contenido.innerHTML = `
            <h2>Agregar Ingresos</h2>
            <input type="number" id="monto" placeholder="Monto">
            <button onclick="agregarIngreso()">Agregar</button>
        `;
    }

    else if (opcion === "gastos") {
        contenido.innerHTML = `
            <h2>Agregar Gastos</h2>
            <input type="number" id="monto" placeholder="Monto">
            <button onclick="agregarGasto()">Agregar</button>
        `;
    }

    else if (opcion === "pagos") {
        contenido.innerHTML = `
            <h2>Programar Pagos</h2>
            <p>Aquí podrás organizar tus pagos futuros.</p>
        `;
    }

    else if (opcion === "invertir") {
        contenido.innerHTML = `
            <h2>Inversiones</h2>
            <p>Opciones para comenzar a invertir.</p>
        `;
    }

    else if (opcion === "ahorro") {
        contenido.innerHTML = `
            <h2>Meta de Ahorro</h2>
            <p>Define cuánto quieres ahorrar.</p>
        `;
    }
}


// ABRIR MODAL
function abrirModal(id) {
    document.getElementById(id).style.display = "block";
}

// CERRAR MODAL
function cerrarModal(id) {
    document.getElementById(id).style.display = "none";
}

// REGISTRAR USUARIO
function registrar() {
    let usuario = document.getElementById("usuarioRegistro").value;
    let password = document.getElementById("passwordRegistro").value;

    if (usuario === "" || password === "") {
        alert("Completa los campos");
        return;
    }

    localStorage.setItem("usuario", usuario);
    localStorage.setItem("password", password);

    alert("Usuario registrado");
    cerrarModal("modalRegistro");
}

// LOGIN
function login() {
    let usuario = document.getElementById("usuarioLogin").value;
    let password = document.getElementById("passwordLogin").value;

    let userGuardado = localStorage.getItem("usuario");
    let passGuardado = localStorage.getItem("password");

    if (usuario === userGuardado && password === passGuardado) {
        alert("Bienvenido " + usuario);
        cerrarModal("modalLogin");
    } else {
        alert("Datos incorrectos");
    }
}