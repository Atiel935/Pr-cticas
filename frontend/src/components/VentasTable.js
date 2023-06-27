import { Delete, Edit, Add, BarChart } from '@mui/icons-material';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './ProductosTable.css';
import { Bar } from 'react-chartjs-2';

function VentasTable() {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fecha_venta: '',
    cantidad_vendida: '',
    precio_unitario: '',
    id_producto: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ventas');
      setVentas(response.data);
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

  const handleAddVenta = async () => {
    try {
      await axios.post('http://localhost:3001/ventas', formData);
      fetchVentas();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVenta = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/ventas/${id}`);
      fetchVentas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditVenta = (venta) => {
    setSelectedVenta(venta);
    setFormData(venta);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateVenta = async () => {
    try {
      await axios.put(
        `http://localhost:3001/ventas/${selectedVenta.id_venta}`,
        formData
      );
      fetchVentas();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      fecha_venta: '',
      cantidad_vendida: '',
      precio_unitario: '',
      id_producto: '',
    });
    setEditMode(false);
    setSelectedVenta(null);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ventas/report');
      const data = response.data;
      const labels = data.map((item) => item.producto);
      const values = data.map((item) => item.total);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total de Ventas por Producto',
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
            <th>Fecha Venta</th>
            <th>Cantidad Vendida</th>
            <th>Precio Unitario</th>
            <th>Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta} className="table-row">
              <td>{venta.id_venta}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.cantidad_vendida}</td>
              <td>{venta.precio_unitario}</td>
              <td>{venta.id_producto}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteVenta(venta.id_venta)}
                >
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditVenta(venta)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Venta' : 'Agregar Venta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container">
            <Form.Group controlId="formFechaVenta">
              <Form.Label>Fecha Venta</Form.Label>
              <Form.Control
                type="date"
                name="fecha_venta"
                value={formData.fecha_venta}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de venta"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCantidadVendida">
              <Form.Label>Cantidad Vendida</Form.Label>
              <Form.Control
                type="number"
                name="cantidad_vendida"
                value={formData.cantidad_vendida}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad vendida"
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          {editMode ? (
            <Button variant="primary" onClick={handleUpdateVenta}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddVenta}>
              Agregar Venta
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VentasTable;
