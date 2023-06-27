import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './ProductosTable.css';
import { useState, useEffect } from 'react';

function ProductosTable() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_producto: '',
    descripcion: '',
    precio: '',
    cantidad_disponible: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/productos');
      setProductos(response.data);
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

  const handleAddProducto = async () => {
    try {
      await axios.post('http://localhost:3001/productos', formData);
      fetchProductos();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProducto = (producto) => {
    setSelectedProduct(producto);
    setFormData(producto);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdateProducto = async () => {
    try {
      await axios.put(`http://localhost:3001/productos/${selectedProduct.id_producto}`, formData);
      fetchProductos();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nombre_producto: '',
      descripcion: '',
      precio: '',
      cantidad_disponible: '',
    });
    setEditMode(false);
    setSelectedProduct(null);
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
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto} className="table-row">
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.cantidad_disponible}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProducto(producto.id_producto)}>
                  <Delete />
                </Button>
                <Button variant="info" onClick={() => handleEditProducto(producto)}>
                  <Edit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-container">
            <Form.Group controlId="formNombreProducto">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre_producto"
                value={formData.nombre_producto}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Ingrese la descripción del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ingrese el precio del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCantidadDisponible">
              <Form.Label>Cantidad Disponible</Form.Label>
              <Form.Control
                type="text"
                name="cantidad_disponible"
                value={formData.cantidad_disponible}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad disponible del producto"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={editMode ? handleUpdateProducto : handleAddProducto}>
            {editMode ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductosTable;
