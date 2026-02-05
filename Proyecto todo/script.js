// Referencias al DOM
const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const inputCategoria = document.getElementById('input-categoria');
const inputFecha = document.getElementById('input-fecha');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');
const botonesFiltro = document.querySelectorAll('.filtro');
const btnTema = document.getElementById('btn-tema');

let tareas = [];
let filtroActual = 'todas';

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarTareas();
    cargarTema(); // Cargar modo oscuro si estaba guardado
});

function cargarTareas() {
    const guardadas = localStorage.getItem('tareas');
    if (guardadas) {
        tareas = JSON.parse(guardadas);
    }
    renderizarTareas();
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// === AGREGAR TAREA (Con Categoría y Fecha) ===
function agregarTarea(e) {
    e.preventDefault();
    const texto = inputTarea.value.trim();
    const categoria = inputCategoria.value;
    const fecha = inputFecha.value;

    if (texto) {
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            categoria: categoria,
            fecha: fecha, // Formato YYYY-MM-DD
            completada: false
        };

        tareas.unshift(nuevaTarea);
        guardarTareas();
        renderizarTareas();
        
        // Resetear formulario
        inputTarea.value = '';
        inputFecha.value = '';
    }
}

// === ELIMINAR CON ANIMACIÓN ===
function prepararEliminacion(id) {
    const elemento = document.getElementById(`tarea-${id}`);
    
    // 1. Agregamos clase para animar salida
    elemento.classList.add('eliminando');

    // 2. Esperamos a que termine la animación (0.3s en CSS) antes de borrar datos
    setTimeout(() => {
        tareas = tareas.filter(t => t.id !== id);
        guardarTareas();
        renderizarTareas();
    }, 300);
}

// === EDITAR TAREA ===
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    // Usamos un prompt simple para editar. 
    
    const nuevoTexto = prompt("Edita tu tarea:", tarea.texto);

    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        tarea.texto = nuevoTexto.trim();
        guardarTareas();
        renderizarTareas();
    }
}

function toggleTarea(id) {
    tareas = tareas.map(t => 
        t.id === id ? { ...t, completada: !t.completada } : t
    );
    guardarTareas();
    renderizarTareas();
}

// === RENDERIZADO AVANZADO ===
function renderizarTareas() {
    listaTareas.innerHTML = '';
    
    let tareasFiltradas = tareas;
    if (filtroActual === 'pendientes') tareasFiltradas = tareas.filter(t => !t.completada);
    if (filtroActual === 'completadas') tareasFiltradas = tareas.filter(t => t.completada);

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');
        li.id = `tarea-${tarea.id}`;
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;

        // Lógica de fechas (¿Está por vencer?)
        let infoFecha = '';
        let claseUrgente = '';
        
        if (tarea.fecha) {
            const hoy = new Date().toISOString().split('T')[0];
            const fechaTarea = tarea.fecha;
            
            // Si la fecha es hoy o anterior y no está completada
            if (fechaTarea <= hoy && !tarea.completada) {
                claseUrgente = 'vencimiento-urgente';
                infoFecha = `📅 ¡Vence hoy/ya venció!`;
            } else {
                infoFecha = `📅 ${tarea.fecha}`;
            }
        }

        li.innerHTML = `
            <input type="checkbox" 
                ${tarea.completada ? 'checked' : ''} 
                onchange="toggleTarea(${tarea.id})">
            
            <div class="info-tarea">
                <span class="texto-tarea">${escaparHTML(tarea.texto)}</span>
                <div class="detalles-tarea">
                    <span class="badge">${tarea.categoria.toUpperCase()}</span>
                    <span class="${claseUrgente}">${infoFecha}</span>
                </div>
            </div>

            <div class="acciones">
                <button onclick="editarTarea(${tarea.id})" class="btn-accion" title="Editar">✏️</button>
                <button onclick="prepararEliminacion(${tarea.id})" class="btn-accion" title="Eliminar">🗑️</button>
            </div>
        `;
        listaTareas.appendChild(li);
    });

    contadorPendientes.textContent = tareas.filter(t => !t.completada).length;
}

function escaparHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === FILTROS ===
botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        filtroActual = btn.dataset.filtro;
        renderizarTareas();
    });
});

formulario.addEventListener('submit', agregarTarea);

// === MODO OSCURO ===
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    
    // Cambiar icono
    const esOscuro = document.body.classList.contains('modo-oscuro');
    btnTema.textContent = esOscuro ? '☀️' : '🌙';
    
    // Guardar preferencia
    localStorage.setItem('modoOscuro', esOscuro);
});

function cargarTema() {
    const modoOscuroGuardado = localStorage.getItem('modoOscuro') === 'true';
    if (modoOscuroGuardado) {
        document.body.classList.add('modo-oscuro');
        btnTema.textContent = '☀️';
    }
}

// Hacemos las funciones globales para usarlas en el HTML (onclick)
window.toggleTarea = toggleTarea;
window.prepararEliminacion = prepararEliminacion;
window.editarTarea = editarTarea;