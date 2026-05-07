// ─── ESTADO GLOBAL ───
let ingresos = 0;
let gastos = 0;
let historialIngresos = [];
let historialGastos = [];
let historialPagos = [];
let historialInversiones = [];
let historialAhorros = [];

// ─── INGRESOS ───
function agregarIngreso() {
    let valor = Number(document.getElementById("montoIngreso").value);
    let descripcion = document.getElementById("descripcionIngreso").value.trim() || "Sin descripción";
    let categoria = document.getElementById("categoriaIngreso").value;
    let fecha = document.getElementById("fechaIngreso").value;

    if (valor <= 0 || isNaN(valor)) { alert("Ingresa un valor válido"); return; }
    if (!fecha) { alert("Selecciona una fecha"); return; }

    ingresos += valor;
    historialIngresos.push({ valor, descripcion, categoria, fecha });
    mostrarSeccion("ingresos");
}

// ─── GASTOS ───
function agregarGasto() {
    let valor = Number(document.getElementById("montoGasto").value);
    let descripcion = document.getElementById("descripcionGasto").value.trim() || "Sin descripción";
    let categoria = document.getElementById("categoriaGasto").value;
    let fecha = document.getElementById("fechaGasto").value;

    if (valor <= 0 || isNaN(valor)) { alert("Ingresa un valor válido"); return; }
    if (!fecha) { alert("Selecciona una fecha"); return; }

    gastos += valor;
    historialGastos.push({ valor, descripcion, categoria, fecha });
    mostrarSeccion("gastos");
}

function eliminarGasto(index) {
    gastos -= historialGastos[index].valor;
    historialGastos.splice(index, 1);
    mostrarSeccion("gastos");
}

function filtrarGastos() {
    mostrarSeccion("gastos");
}

// ─── PAGOS ───
function agregarPago() {
    let nombre = document.getElementById("nombrePago").value.trim();
    let monto = Number(document.getElementById("montoPago").value);
    let fecha = document.getElementById("fechaPago").value;

    if (!nombre) { alert("Ingresa el nombre del pago"); return; }
    if (monto <= 0 || isNaN(monto)) { alert("Ingresa un monto válido"); return; }
    if (!fecha) { alert("Selecciona una fecha límite"); return; }

    historialPagos.push({ nombre, monto, fecha, pagado: false });
    mostrarSeccion("pagos");
}

function marcarPagado(index) {
    historialPagos[index].pagado = !historialPagos[index].pagado;
    mostrarSeccion("pagos");
}

// ─── INVERSIONES ───
function agregarInversion() {
    let nombre = document.getElementById("nombreInversion").value.trim();
    let monto = Number(document.getElementById("montoInversion").value);
    let fecha = document.getElementById("fechaInversion").value;
    let rendimiento = Number(document.getElementById("rendimientoInversion").value);

    if (!nombre) { alert("Ingresa el nombre de la inversión"); return; }
    if (monto <= 0 || isNaN(monto)) { alert("Ingresa un monto válido"); return; }
    if (!fecha) { alert("Selecciona una fecha"); return; }

    historialInversiones.push({ nombre, monto, fecha, rendimiento: rendimiento || 0 });
    mostrarSeccion("invertir");
}

// ─── AHORRO ───
function agregarMeta() {
    let nombre = document.getElementById("nombreAhorro").value.trim();
    let objetivo = Number(document.getElementById("objetivoAhorro").value);
    let fecha = document.getElementById("fechaAhorro").value;

    if (!nombre) { alert("Ingresa el nombre de la meta"); return; }
    if (objetivo <= 0 || isNaN(objetivo)) { alert("Ingresa un monto objetivo válido"); return; }
    if (!fecha) { alert("Selecciona una fecha límite"); return; }

    historialAhorros.push({ nombre, objetivo, fecha, aportado: 0 });
    mostrarSeccion("ahorro");
}

function agregarAporte(index) {
    let aporte = Number(document.getElementById("aporte_" + index).value);
    if (aporte <= 0 || isNaN(aporte)) { alert("Ingresa un aporte válido"); return; }
    historialAhorros[index].aportado += aporte;
    mostrarSeccion("ahorro");
}

// ─── MOSTRAR SECCIÓN ───
function mostrarSeccion(opcion) {
    let contenido = document.getElementById("contenido");

    if (opcion === "resumen") {
        let balance = ingresos - gastos;
        let colorBalance = balance >= 0 ? "#1a7a3f" : "#c0392b";
        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono">📊</span><h2>Resumen Financiero</h2></div>
            <div class="resumen-grid">
                <div class="resumen-card ingreso-card">
                    <div class="card-icono"></div>
                    <p class="resumen-label">Total Ingresos</p>
                    <p class="resumen-valor verde">$${ingresos.toLocaleString("es-CO")}</p>
                </div>
                <div class="resumen-card gasto-card">
                    <div class="card-icono"></div>
                    <p class="resumen-label">Total Gastos</p>
                    <p class="resumen-valor rojo">$${gastos.toLocaleString("es-CO")}</p>
                </div>
                <div class="resumen-card balance-card">
                    <div class="card-icono"></div>
                    <p class="resumen-label">Balance Actual</p>
                    <p class="resumen-valor" style="color:${colorBalance}">$${balance.toLocaleString("es-CO")}</p>
                </div>
            </div>`;
    }

    else if (opcion === "ingresos") {
        let totalIngresos = historialIngresos.reduce((s, i) => s + i.valor, 0);
        let filas = historialIngresos.length > 0
            ? historialIngresos.map(i => `
                <tr>
                    <td>${i.fecha}</td>
                    <td><span class="badge badge-ingreso">${i.categoria}</span></td>
                    <td>${i.descripcion}</td>
                    <td class="monto-ingreso">+$${i.valor.toLocaleString("es-CO")}</td>
                </tr>`).join("")
            : `<tr><td colspan="4" class="sin-registros">No hay ingresos registrados aún.</td></tr>`;

        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono"></span><h2>Añadir Ingresos</h2></div>
            <div class="form-card">
                <div class="form-grid">
                    <div class="form-campo">
                        <label>Monto</label>
                        <input type="number" id="montoIngreso" placeholder="$0">
                    </div>
                    <div class="form-campo">
                        <label>Categoría</label>
                        <select id="categoriaIngreso">
                            <option>Salario</option>
                            <option>Freelance</option>
                            <option>Negocio</option>
                            <option>Aguinaldo</option>
                            <option>Bono</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div class="form-campo">
                        <label>Fecha</label>
                        <input type="date" id="fechaIngreso">
                    </div>
                    <div class="form-campo form-campo-full">
                        <label>Descripción (opcional)</label>
                        <input type="text" id="descripcionIngreso" placeholder="Ej: Pago quincena">
                    </div>
                </div>
                <button class="btn-agregar" onclick="agregarIngreso()">＋ Agregar Ingreso</button>
            </div>
            <div class="historial-header">
                <h3 class="historial-titulo">📋 Historial de Ingresos</h3>
                <div class="total-badge total-ingreso">Total: $${totalIngresos.toLocaleString("es-CO")}</div>
            </div>
            <div class="tabla-wrapper">
                <table class="tabla-historial">
                    <thead><tr><th>Fecha</th><th>Categoría</th><th>Descripción</th><th>Monto</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    }

    else if (opcion === "gastos") {
        let filtro = document.getElementById("filtroCategoria") ? document.getElementById("filtroCategoria").value : "Todos";
        let totalGastos = historialGastos.reduce((s, g) => s + g.valor, 0);
        let lista = filtro === "Todos" ? historialGastos : historialGastos.filter(g => g.categoria === filtro);
        let filas = lista.length > 0
            ? lista.map((g, i) => `
                <tr>
                    <td>${g.fecha}</td>
                    <td><span class="badge badge-gasto">${g.categoria}</span></td>
                    <td>${g.descripcion}</td>
                    <td class="monto-gasto">-$${g.valor.toLocaleString("es-CO")}</td>
                    <td><button class="btn-eliminar" onclick="eliminarGasto(${historialGastos.indexOf(g)})">🗑</button></td>
                </tr>`).join("")
            : `<tr><td colspan="5" class="sin-registros">No hay gastos en esta categoría.</td></tr>`;

        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono"></span><h2>Añadir Gastos</h2></div>
            <div class="form-card">
                <div class="form-grid">
                    <div class="form-campo">
                        <label>Monto</label>
                        <input type="number" id="montoGasto" placeholder="$0">
                    </div>
                    <div class="form-campo">
                        <label>Categoría</label>
                        <select id="categoriaGasto">
                            <option>Alimentación</option>
                            <option>Transporte</option>
                            <option>Servicios</option>
                            <option>Renta</option>
                            <option>Entretenimiento</option>
                            <option>Salud</option>
                            <option>Deudas</option>
                            <option>Otros</option>
                        </select>
                    </div>
                    <div class="form-campo">
                        <label>Fecha</label>
                        <input type="date" id="fechaGasto">
                    </div>
                    <div class="form-campo form-campo-full">
                        <label>Descripción (opcional)</label>
                        <input type="text" id="descripcionGasto" placeholder="Ej: Supermercado">
                    </div>
                </div>
                <button class="btn-agregar" onclick="agregarGasto()">＋ Agregar Gasto</button>
            </div>
            <div class="historial-header">
                <h3 class="historial-titulo">📋 Historial de Gastos</h3>
                <div class="total-badge total-gasto">Total: $${totalGastos.toLocaleString("es-CO")}</div>
            </div>
            <div class="filtro-bar">
                <label>Filtrar por categoría:</label>
                <select id="filtroCategoria" onchange="filtrarGastos()">
                    <option ${filtro==="Todos"?"selected":""}>Todos</option>
                    <option ${filtro==="Alimentación"?"selected":""}>Alimentación</option>
                    <option ${filtro==="Transporte"?"selected":""}>Transporte</option>
                    <option ${filtro==="Servicios"?"selected":""}>Servicios</option>
                    <option ${filtro==="Renta"?"selected":""}>Renta</option>
                    <option ${filtro==="Entretenimiento"?"selected":""}>Entretenimiento</option>
                    <option ${filtro==="Salud"?"selected":""}>Salud</option>
                    <option ${filtro==="Deudas"?"selected":""}>Deudas</option>
                    <option ${filtro==="Otros"?"selected":""}>Otros</option>
                </select>
            </div>
            <div class="tabla-wrapper">
                <table class="tabla-historial">
                    <thead><tr><th>Fecha</th><th>Categoría</th><th>Descripción</th><th>Monto</th><th></th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    }

    else if (opcion === "pagos") {
        let hoy = new Date(); hoy.setHours(0,0,0,0);
        let filas = historialPagos.length > 0
            ? historialPagos.map((p, i) => {
                let fechaPago = new Date(p.fecha + "T00:00:00");
                let diff = Math.ceil((fechaPago - hoy) / (1000*60*60*24));
                let estado = p.pagado ? "pagado" : diff < 0 ? "vencido" : diff <= 3 ? "proximo" : "pendiente";
                let etiqueta = p.pagado ? "✅ Pagado" : diff < 0 ? "⛔ Vencido" : diff <= 3 ? "⚠️ Próximo" : "🕐 Pendiente";
                return `<tr class="fila-${estado}">
                    <td>${p.nombre}</td>
                    <td>$${p.monto.toLocaleString("es-CO")}</td>
                    <td>${p.fecha}</td>
                    <td><span class="badge-estado ${estado}">${etiqueta}</span></td>
                    <td><button class="btn-pagar ${p.pagado?'btn-despagar':''}" onclick="marcarPagado(${i})">${p.pagado?"Desmarcar":"Marcar pagado"}</button></td>
                </tr>`;
            }).join("")
            : `<tr><td colspan="5" class="sin-registros">No hay pagos programados.</td></tr>`;

        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono"></span><h2>Programar Pagos</h2></div>
            <div class="form-card">
                <div class="form-grid">
                    <div class="form-campo">
                        <label>Nombre del pago</label>
                        <input type="text" id="nombrePago" placeholder="Ej: Arriendo">
                    </div>
                    <div class="form-campo">
                        <label>Monto</label>
                        <input type="number" id="montoPago" placeholder="$0">
                    </div>
                    <div class="form-campo">
                        <label>Fecha límite</label>
                        <input type="date" id="fechaPago">
                    </div>
                </div>
                <button class="btn-agregar" onclick="agregarPago()">＋ Programar Pago</button>
            </div>
            <h3 class="historial-titulo">📋 Pagos Pendientes</h3>
            <div class="tabla-wrapper">
                <table class="tabla-historial">
                    <thead><tr><th>Nombre</th><th>Monto</th><th>Fecha límite</th><th>Estado</th><th>Acción</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    }

    else if (opcion === "invertir") {
        let totalInvertido = historialInversiones.reduce((s, i) => s + i.monto, 0);
        let filas = historialInversiones.length > 0
            ? historialInversiones.map(inv => `
                <tr>
                    <td>${inv.nombre}</td>
                    <td>$${inv.monto.toLocaleString("es-CO")}</td>
                    <td>${inv.fecha}</td>
                    <td><span class="rendimiento-badge">${inv.rendimiento}%</span></td>
                    <td class="monto-ingreso">$${(inv.monto * (1 + inv.rendimiento/100)).toLocaleString("es-CO")}</td>
                </tr>`).join("")
            : `<tr><td colspan="5" class="sin-registros">No hay inversiones registradas.</td></tr>`;

        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono"></span><h2>Inversiones</h2></div>
            <div class="form-card">
                <div class="form-grid">
                    <div class="form-campo">
                        <label>Nombre</label>
                        <input type="text" id="nombreInversion" placeholder="Ej: CDT Bancolombia">
                    </div>
                    <div class="form-campo">
                        <label>Monto invertido</label>
                        <input type="number" id="montoInversion" placeholder="$0">
                    </div>
                    <div class="form-campo">
                        <label>Fecha</label>
                        <input type="date" id="fechaInversion">
                    </div>
                    <div class="form-campo">
                        <label>Rendimiento esperado (%)</label>
                        <input type="number" id="rendimientoInversion" placeholder="Ej: 8">
                    </div>
                </div>
                <button class="btn-agregar" onclick="agregarInversion()">＋ Registrar Inversión</button>
            </div>
            <div class="historial-header">
                <h3 class="historial-titulo">📋 Historial de Inversiones</h3>
                <div class="total-badge total-ingreso">Total invertido: $${totalInvertido.toLocaleString("es-CO")}</div>
            </div>
            <div class="tabla-wrapper">
                <table class="tabla-historial">
                    <thead><tr><th>Nombre</th><th>Monto</th><th>Fecha</th><th>Rendimiento</th><th>Valor estimado</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    }

    else if (opcion === "ahorro") {
        let metasHTML = historialAhorros.length > 0
            ? historialAhorros.map((a, i) => {
                let pct = Math.min(100, Math.round((a.aportado / a.objetivo) * 100));
                let colorBarra = pct >= 100 ? "#1a7a3f" : pct >= 50 ? "#e67e22" : "#004481";
                return `
                <div class="meta-card">
                    <div class="meta-header">
                        <div>
                            <p class="meta-nombre">🎯 ${a.nombre}</p>
                            <p class="meta-fecha">Fecha límite: ${a.fecha}</p>
                        </div>
                        <div class="meta-montos">
                            <span class="meta-aportado">$${a.aportado.toLocaleString("es-CO")}</span>
                            <span class="meta-sep"> / </span>
                            <span class="meta-objetivo">$${a.objetivo.toLocaleString("es-CO")}</span>
                        </div>
                    </div>
                    <div class="barra-fondo">
                        <div class="barra-progreso" style="width:${pct}%;background:${colorBarra}"></div>
                    </div>
                    <div class="meta-footer">
                        <span class="pct-label">${pct}% completado</span>
                        <div class="aporte-grupo">
                            <input type="number" id="aporte_${i}" placeholder="Agregar aporte">
                            <button class="btn-aporte" onclick="agregarAporte(${i})">＋ Aporte</button>
                        </div>
                    </div>
                </div>`;
            }).join("")
            : `<div class="sin-registros">No hay metas de ahorro. ¡Crea la primera!</div>`;

        contenido.innerHTML = `
            <div class="seccion-header"><span class="seccion-icono"></span><h2>Metas de Ahorro</h2></div>
            <div class="form-card">
                <div class="form-grid">
                    <div class="form-campo">
                        <label>Nombre de la meta</label>
                        <input type="text" id="nombreAhorro" placeholder="Ej: Viaje, Fondo de emergencia">
                    </div>
                    <div class="form-campo">
                        <label>Monto objetivo</label>
                        <input type="number" id="objetivoAhorro" placeholder="$0">
                    </div>
                    <div class="form-campo">
                        <label>Fecha límite</label>
                        <input type="date" id="fechaAhorro">
                    </div>
                </div>
                <button class="btn-agregar" onclick="agregarMeta()">＋ Crear Meta</button>
            </div>
            <h3 class="historial-titulo">🎯 Mis Metas</h3>
            ${metasHTML}`;
    }
}

// ─── MODALES ───
function abrirModal(id) { document.getElementById(id).style.display = "block"; }
function cerrarModal(id) { document.getElementById(id).style.display = "none"; }

function registrar() {
    let usuario = document.getElementById("usuarioRegistro").value;
    let password = document.getElementById("passwordRegistro").value;
    if (usuario === "" || password === "") { alert("Completa los campos"); return; }
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("password", password);
    alert("Usuario registrado");
    cerrarModal("modalRegistro");
}

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

function recuperarPassword() {
    let usuario = document.getElementById("usuarioRecuperar").value;
    let nueva = document.getElementById("passwordNueva").value;
    let confirmar = document.getElementById("passwordConfirmar").value;
    let userGuardado = localStorage.getItem("usuario");
    if (usuario === "" || nueva === "" || confirmar === "") { alert("Completa todos los campos"); return; }
    if (usuario !== userGuardado) { alert("El usuario no existe"); return; }
    if (nueva !== confirmar) { alert("Las contraseñas no coinciden"); return; }
    localStorage.setItem("password", nueva);
    alert("Contraseña restablecida correctamente");
    cerrarModal("modalOlvide");
    abrirModal("modalLogin");
}
