import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';

import ProductosTable from './components/ProductosTable';
import ProveedoresTable from './components/ProveedoresTable';
import AlmacenamientoTable from './components/AlmacenamientoTable';
import ComprasTable from './components/ComprasTable';
import VentasTable from './components/VentasTable';
import AdministradoresTable from './components/AdministradoresTable';
import Login from './components/LogIn';

// Crear el tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#f44336', // Color primario
    },
    secondary: {
      main: '#2196f3', // Color secundario
    },
  },
  typography: {
    button: {
      textTransform: 'none', // Desactivar la transformación de texto en mayúsculas
      fontSize: '1.2rem', // Tamaño de fuente personalizado
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Steam
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Inicio
              </Button>
              <Button color="inherit" component={Link} to="/productos">
                Productos
              </Button>
              <Button color="inherit" component={Link} to="/proveedores">
                Proveedores
              </Button>
              <Button color="inherit" component={Link} to="/almacenamiento">
                Almacenamiento
              </Button>
              <Button color="inherit" component={Link} to="/compras">
                Compras
              </Button>
              <Button color="inherit" component={Link} to="/ventas">
                Ventas
              </Button>
              <Button color="inherit" component={Link} to="/administradores">
                Administradores
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>

          <Toolbar />

          <Routes>
            <Route path="/productos" element={<ProductosTable />} />
            <Route path="/proveedores" element={<ProveedoresTable />} />
            <Route path="/almacenamiento" element={<AlmacenamientoTable />} />
            <Route path="/compras" element={<ComprasTable />} />
            <Route path="/ventas" element={<VentasTable />} />
            <Route path="/administradores" element={<AdministradoresTable />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <div>
                  <h1>Sistema de gestión de productos sanitizantes</h1>
                  <Button variant="contained" color="primary" size="large" component={Link} to="/productos">
                    Ver productos
                  </Button>
                  <Button variant="contained" color="secondary" size="large" component={Link} to="/proveedores">
                    Ver proveedores
                  </Button>
                  <Button variant="contained" color="primary" size="large" component={Link} to="/almacenamiento">
                    Ver almacenamiento
                  </Button>
                  <Button variant="contained" color="secondary" size="large" component={Link} to="/compras">
                    Ver compras
                  </Button>
                  <Button variant="contained" color="primary" size="large" component={Link} to="/ventas">
                    Ver ventas
                  </Button>
                  <Button variant="contained" color="secondary" size="large" component={Link} to="/administradores">
                    Ver administradores
                  </Button>
                </div>
              }
            />
          </Routes>

          <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook" style={{ fontSize: '24px', color: 'black' }}></i>
              </a>
              <a href="https://gaceta.uabc.mx" target="_blank" rel="noreferrer">
                <i className="fas fa-newspaper" style={{ fontSize: '24px', color: 'black' }}></i>
              </a>
              <a href="https://www.uabc.mx/instituto" target="_blank" rel="noreferrer">
                <i className="fas fa-university" style={{ fontSize: '24px', color: 'black' }}></i>
              </a>
            </div>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>Propiedad de Steam</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
