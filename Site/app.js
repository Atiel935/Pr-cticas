const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración del encabezado CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const productosRoutes = require('../routes/productos');
const proveedoresRoutes = require('../routes/proveedores');
const almacenamientoRoutes = require('../routes/almacenamiento');
//const comprasRoutes = require('../routes/compras');
const ventasRoutes= require('../routes/ventas');

app.use('/productos', productosRoutes);
app.use('/proveedores',proveedoresRoutes);
app.use('/almacenamiento',almacenamientoRoutes);
//app.use('/compras',comprasRoutes);
app.use('/ventas',ventasRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
