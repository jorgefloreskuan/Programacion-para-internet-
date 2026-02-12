// server.js
const express = require('express');
const fs = require('fs'); // fs = File System (para leer/escribir archivos)
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = 'transacciones.json'; // Aquí se guardarán tus datos

// Middleware para entender lo que envía el formulario y la web
app.use(express.json());
app.use(express.static('public'));

// --- FUNCIONES PARA MANEJAR EL ARCHIVO DE DATOS ---

// 1. Leer datos del archivo
const leerDatos = () => {
    try {
        // Si el archivo no existe, devolvemos una lista vacía
        if (!fs.existsSync(DB_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// 2. Guardar datos en el archivo
const guardarDatos = (datos) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(datos, null, 2));
};

// --- RUTAS DE LA API (LO QUE CONECTA CON EL FRONTEND) ---

// Obtener todas las transacciones
app.get('/api/transacciones', (req, res) => {
    const transacciones = leerDatos();
    res.json(transacciones);
});

// Guardar una nueva transacción
app.post('/api/transacciones', (req, res) => {
    const nuevaTransaccion = {
        id: Date.now(), // Usamos la fecha como ID único
        texto: req.body.texto,
        monto: parseFloat(req.body.monto),
        tipo: req.body.monto >= 0 ? 'ingreso' : 'gasto'
    };

    const transacciones = leerDatos();
    transacciones.push(nuevaTransaccion);
    guardarDatos(transacciones); // Guardamos en el archivo

    res.json(nuevaTransaccion);
});

// Eliminar transacción
app.delete('/api/transacciones/:id', (req, res) => {
    let transacciones = leerDatos();
    const idEliminar = parseInt(req.params.id);
    
    // Filtramos la lista para quitar el que tenga ese ID
    transacciones = transacciones.filter(t => t.id !== idEliminar);
    guardarDatos(transacciones);
    
    res.json({ success: true });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Billetera corriendo en http://localhost:${PORT}`);
});
