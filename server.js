const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Agregamos cors por si acaso

const app = express();
// Usamos el puerto de la nube o el 3000 local
const PORT = process.env.PORT || 3000;
const DB_FILE = 'transacciones.json';

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// --- FUNCIONES AUXILIARES ---
const leerDatos = () => {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const guardarDatos = (datos) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(datos, null, 2));
};

// --- RUTAS API ---

app.get('/api/transacciones', (req, res) => {
    const transacciones = leerDatos();
    res.json(transacciones);
});

app.post('/api/transacciones', (req, res) => {
    const { texto, monto, fecha } = req.body;

    const nuevaTransaccion = {
        id: Date.now(),
        texto: texto,
        monto: parseFloat(monto),
        fecha: fecha || new Date().toISOString().split('T')[0], // Si no hay fecha, usa la de hoy
        tipo: parseFloat(monto) >= 0 ? 'ingreso' : 'gasto'
    };

    const transacciones = leerDatos();
    transacciones.push(nuevaTransaccion);
    guardarDatos(transacciones);

    res.json(nuevaTransaccion);
});

app.delete('/api/transacciones/:id', (req, res) => {
    let transacciones = leerDatos();
    const idEliminar = parseInt(req.params.id);
    transacciones = transacciones.filter(t => t.id !== idEliminar);
    guardarDatos(transacciones);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
