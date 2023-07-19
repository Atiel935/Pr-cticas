import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';
import './ProductosTable.css';

function AdministradoresTable() {
  const [administradores, setAdministradores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_admin: '',
    correo_admin: '',
    contrasena: '',
    nivel_acceso: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const fetchAdministradores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/administradores');
      setAdministradores(response.data);
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

  const handleAddAdministrador = async () => {
    try {
      await axios.post('http://localhost:3001/administradores', formData);
      fetchAdministradores();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAdministrador = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/administradores/${id}`);
      fetchAdministradores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAdministrador = (admin) => {
    setSelectedAdmin(admin);
    setFormData(admin);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateAdministrador = async () => {
    try {
      await axios.put(`http://localhost:3001/administradores/${selectedAdmin.id}`, formData);
      fetchAdministradores();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nombre_admin: '',
      correo_admin: '',
      contrasena: '',
      nivel_acceso: '',
    });
    setEditMode(false);
    setSelectedAdmin(null);
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
            <th>Nombre</th>
            <th>Correo</th>
            <th>Nivel de Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {administradores.map((admin) => (
            <tr key={admin.id} className="table-row">
              <td>{admin.id}</td>
              <td>{admin.nombre_admin}</td>
              <td>{admin.correo_admin}</td>
              <td>{admin.nivel_acceso}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteAdministrador(admin.id)}>
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditAdministrador(admin)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Administrador' : 'Agregar Administrador'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container">
            <Form.Group controlId="formNombreAdmin">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre_admin"
                value={formData.nombre_admin}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del administrador"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCorreoAdmin">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo_admin"
                value={formData.correo_admin}
                onChange={handleInputChange}
                placeholder="Ingrese el correo del administrador"
                required
              />
            </Form.Group>
            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
                placeholder="Ingrese la contraseña del administrador"
                required={!editMode} // Required only when adding a new admin, not when editing
              />
            </Form.Group>
            <Form.Group controlId="formNivelAcceso">
              <Form.Label>Nivel de Acceso</Form.Label>
              <Form.Control
                type="text"
                name="nivel_acceso"
                value={formData.nivel_acceso}
                onChange={handleInputChange}
                placeholder="Ingrese el nivel de acceso del administrador"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={editMode ? handleUpdateAdministrador : handleAddAdministrador}>
            {editMode ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdministradoresTable;
