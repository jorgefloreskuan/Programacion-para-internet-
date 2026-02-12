const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// 1. CONFIGURACIÓN VITAL PARA RENDER
// Render nos da un puerto variable en la nube. Si no usamos process.env.PORT, la app fallará.
const PORT = process.env.PORT || 3000;

// Archivo donde se guardarán los datos
const DB_FILE = path.join(__dirname, 'transacciones.json');

// 2. MIDDLEWARES (Configuraciones intermedias)
app.use(express.json());             // Para entender los datos que envía el formulario
app.use(cors());                     // Para evitar bloqueos de seguridad en navegadores
app.use(express.static('public'));   // Para servir tu archivo index.html y estilos

// 3. FUNCIONES AUXILIARES (Leer y Guardar archivo)

// Función para leer el archivo JSON
const leerDatos = () => {
    try {
        // Si el archivo no existe, creamos uno vacío
        if (!fs.existsSync(DB_FILE)) {
            fs.writeFileSync(DB_FILE, '[]', 'utf-8');
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data || '[]'); // Si está vacío, devuelve array vacío
    } catch (error) {
        console.error("Error leyendo datos:", error);
        return [];
    }
};

// Función para guardar en el archivo JSON
const guardarDatos = (datos) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(datos, null, 2));
    } catch (error) {
        console.error("Error guardando datos:", error);
    }
};

// 4. RUTAS DE LA API (El "camarero" que lleva datos entre servidor y cliente)

// GET: Obtener todas las transacciones
app.get('/api/transacciones', (req, res) => {
    const transacciones = leerDatos();
    res.json(transacciones);
});

// POST: Guardar una nueva transacción
app.post('/api/transacciones', (req, res) => {
    const { texto, monto, fecha } = req.body;

    // Validación básica
    if (!texto || !monto) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevaTransaccion = {
        id: Date.now(), // Usamos la hora exacta como ID único
        texto: texto,
        monto: parseFloat(monto),
        fecha: fecha || new Date().toISOString().split('T')[0], // Si no mandan fecha, usa hoy
        tipo: parseFloat(monto) >= 0 ? 'ingreso' : 'gasto'
    };

    const transacciones = leerDatos();
    transacciones.push(nuevaTransaccion);
    guardarDatos(transacciones);

    res.json(nuevaTransaccion);
});

// DELETE: Borrar una transacción
app.delete('/api/transacciones/:id', (req, res) => {
    let transacciones = leerDatos();
    const idEliminar = parseInt(req.params.id);
    
    // Filtramos para quedarnos con todas MENOS la que queremos borrar
    const transaccionesFiltradas = transacciones.filter(t => t.id !== idEliminar);
    
    guardarDatos(transaccionesFiltradas);
    res.json({ success: true });
});

// 5. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`✅ Servidor listo y escuchando en el puerto ${PORT}`);
});