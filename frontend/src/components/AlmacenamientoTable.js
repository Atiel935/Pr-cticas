import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './ProductosTable.css';

function AlmacenamientoTable() {
  const [almacenamientos, setAlmacenamientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fecha_entrada: '',
    cantidad_almacenada: '',
    ubicacion: '',
    id_producto: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAlmacenamiento, setSelectedAlmacenamiento] = useState(null);

  useEffect(() => {
    fetchAlmacenamientos();
  }, []);

  const fetchAlmacenamientos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/almacenamiento');
      setAlmacenamientos(response.data);
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

  const handleAddAlmacenamiento = async () => {
    try {
      await axios.post('http://localhost:3001/almacenamiento', formData);
      fetchAlmacenamientos();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAlmacenamiento = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/almacenamiento/${id}`);
      fetchAlmacenamientos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAlmacenamiento = (almacenamiento) => {
    setSelectedAlmacenamiento(almacenamiento);
    setFormData(almacenamiento);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateAlmacenamiento = async () => {
    try {
      await axios.put(
        `http://localhost:3001/almacenamiento/${selectedAlmacenamiento.id_almacenamiento}`,
        formData
      );
      fetchAlmacenamientos();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      fecha_entrada: '',
      cantidad_almacenada: '',
      ubicacion: '',
      id_producto: '',
    });
    setEditMode(false);
    setSelectedAlmacenamiento(null);
  };

  const formatFecha = (fecha) => {
    const fechaObjeto = new Date(fecha);
    const anio = fechaObjeto.getFullYear();
    const mes = fechaObjeto.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    const dia = fechaObjeto.getDate();
    const horas = fechaObjeto.getHours();
    const minutos = fechaObjeto.getMinutes();
    const segundos = fechaObjeto.getSeconds();
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <>
      <Button variant="primary" onClick={() => { setEditMode(false); setShowModal(true); }}>
        <Add />
      </Button>

      <Table striped bordered hover className="mt-4 table-container" responsive>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Fecha Entrada</th>
            <th>Cantidad Almacenada</th>
            <th>Ubicación</th>
            <th>Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {almacenamientos.map((almacenamiento) => (
            <tr key={almacenamiento.id_almacenamiento} className="table-row">
              <td>{almacenamiento.id_almacenamiento}</td>
              <td>{formatFecha(almacenamiento.fecha_entrada)}</td>
              <td>{almacenamiento.cantidad_almacenada}</td>
              <td>{almacenamiento.ubicacion}</td>
              <td>{almacenamiento.id_producto}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteAlmacenamiento(almacenamiento.id_almacenamiento)}
                >
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditAlmacenamiento(almacenamiento)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Almacenamiento' : 'Agregar Almacenamiento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container">
            <Form.Group controlId="formFechaEntrada">
              <Form.Label>Fecha Entrada</Form.Label>
              <Form.Control
                type="date"
                name="fecha_entrada"
                value={formData.fecha_entrada}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de entrada"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCantidadAlmacenada">
              <Form.Label>Cantidad Almacenada</Form.Label>
              <Form.Control
                type="number"
                name="cantidad_almacenada"
                value={formData.cantidad_almacenada}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad almacenada"
                required
              />
            </Form.Group>
            <Form.Group controlId="formUbicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="Ingrese la ubicación"
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
            Cerrar
          </Button>
          <Button variant="primary" onClick={editMode ? handleUpdateAlmacenamiento : handleAddAlmacenamiento}>
            {editMode ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlmacenamientoTable;
