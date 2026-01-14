const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

// Configuración de conexión usando variables de entorno para comunicación entre servicios
const pool = new Pool({
  host: process.env.DB_HOST,     // Se conecta al servicio 'db' definido en docker-compose
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Endpoint para visualizar mensajes (GET)
app.get('/mensajes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mensajes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar mensajes' });
  }
});

// Endpoint para registrar mensajes (POST)
app.post('/registrar', async (req, res) => {
  const { contenido } = req.body;
  try {
    await pool.query('INSERT INTO mensajes (contenido) VALUES ($1)', [contenido]);
    res.json({ status: 'Mensaje institucional registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el mensaje' });
  }
});

app.listen(3000, () => {
  console.log('Servicio de mensajes corriendo en puerto 3000');
});