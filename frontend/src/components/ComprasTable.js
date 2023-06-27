import { Delete, Edit, Add, BarChart } from '@mui/icons-material';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './ProductosTable.css';
import { Bar } from 'react-chartjs-2';

function ComprasTable() {
  const [compras, setCompras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fecha_compra: '',
    cantidad_comprada: '',
    precio_unitario: '',
    id_producto: '',
    id_proveedor: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);

  useEffect(() => {
    fetchCompras();
  }, []);

  const fetchCompras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/compras');
      setCompras(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCompra = async () => {
    try {
      await axios.post('http://localhost:3001/compras', formData);
      fetchCompras();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCompra = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/compras/${id}`);
      fetchCompras();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCompra = (compra) => {
    setSelectedCompra(compra);
    setFormData(compra);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateCompra = async () => {
    try {
      await axios.put(
        `http://localhost:3001/compras/${selectedCompra.id_compra}`,
        formData
      );
      fetchCompras();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      fecha_compra: '',
      cantidad_comprada: '',
      precio_unitario: '',
      id_producto: '',
      id_proveedor: '',
    });
    setEditMode(false);
    setSelectedCompra(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/compras/report');
      const data = response.data;
      const labels = data.map((item) => item.producto);
      const values = data.map((item) => item.total);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total de Compras por Producto',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderWidth: 1,
          },
        ],
      };

      const newWindow = window.open();
      newWindow.document.body.innerHTML = `<div style="width: 600px; margin: auto;"><canvas id="chartCanvas"></canvas></div>`;
      const ctx = newWindow.document.getElementById('chartCanvas').getContext('2d');
      new Bar(ctx, {
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => { setEditMode(false); setShowModal(true); }}>
        <Add />
      </Button>
      <Button variant="success" className="ml-2" onClick={handleGenerateReport}>
        <BarChart />
        Generar Reporte
      </Button>

      <Table striped bordered hover className="mt-4 table-container" responsive>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Fecha Compra</th>
            <th>Cantidad Comprada</th>
            <th>Precio Unitario</th>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id_compra} className="table-row">
              <td>{compra.id_compra}</td>
              <td>{compra.fecha_compra}</td>
              <td>{compra.cantidad_comprada}</td>
              <td>{compra.precio_unitario}</td>
              <td>{compra.id_producto}</td>
              <td>{compra.id_proveedor}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCompra(compra.id_compra)}
                >
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditCompra(compra)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Compra' : 'Agregar Compra'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container">
            <Form.Group controlId="formFechaCompra">
              <Form.Label>Fecha Compra</Form.Label>
              <Form.Control
                type="date"
                name="fecha_compra"
                value={formData.fecha_compra}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de compra"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCantidadComprada">
              <Form.Label>Cantidad Comprada</Form.Label>
              <Form.Control
                type="number"
                name="cantidad_comprada"
                value={formData.cantidad_comprada}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad comprada"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrecioUnitario">
              <Form.Label>Precio Unitario</Form.Label>
              <Form.Control
                type="number"
                name="precio_unitario"
                value={formData.precio_unitario}
                onChange={handleInputChange}
                placeholder="Ingrese el precio unitario"
                required
              />
            </Form.Group>
            <Form.Group controlId="formIdProducto">
              <Form.Label>ID Producto</Form.Label>
              <Form.Control
                type="number"
                name="id_producto"
                value={formData.id_producto}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formIdProveedor">
              <Form.Label>ID Proveedor</Form.Label>
              <Form.Control
                type="number"
                name="id_proveedor"
                value={formData.id_proveedor}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del proveedor"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          {editMode ? (
            <Button variant="primary" onClick={handleUpdateCompra}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddCompra}>
              Agregar Compra
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ComprasTable;
