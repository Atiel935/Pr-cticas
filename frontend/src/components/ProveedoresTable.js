import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './ProductosTable.css';
import { Add, Delete, Edit } from '@mui/icons-material';

function ProveedoresTable() {
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id_proveedor: '',
    nombre_proveedor: '',
    direccion: '',
    telefono: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/proveedores');
      setProveedores(response.data);
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

  const handleAddProveedor = async () => {
    try {
      await axios.post('http://localhost:3001/proveedores', formData);
      fetchProveedores();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProveedor = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/proveedores/${id}`);
      fetchProveedores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProveedor = (proveedor) => {
    setSelectedProveedor(proveedor);
    setFormData(proveedor);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateProveedor = async () => {
    try {
      await axios.put(`http://localhost:3001/proveedores/${selectedProveedor.id_proveedor}`, formData);
      fetchProveedores();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id_proveedor: '',
      nombre_proveedor: '',
      direccion: '',
      telefono: '',
    });
    setEditMode(false);
    setSelectedProveedor(null);
  };

  return (
    <>
      <Button variant="primary" onClick={() => { setEditMode(false); setShowModal(true); }}>
        <Add />
      </Button>

      <Table striped bordered hover className="mt-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id_proveedor}>
              <td>{proveedor.id_proveedor}</td>
              <td>{proveedor.nombre_proveedor}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.telefono}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProveedor(proveedor.id_proveedor)}>
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditProveedor(proveedor)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Proveedor' : 'Agregar Proveedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreProveedor">
              <Form.Label>Nombre Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="nombre_proveedor"
                value={formData.nombre_proveedor}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={editMode ? handleUpdateProveedor : handleAddProveedor}>
            {editMode ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProveedoresTable;
