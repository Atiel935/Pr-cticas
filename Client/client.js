import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post('/api/products', {
      name,
      description,
      price,
      quantity
    });
    setProducts([...products, response.data]);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
  }

  async function handleDelete(id) {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter(product => product.id !== id));
  }

  return (
    <div>
      <h1>Sanitizing Products</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
        <input type="number" step="0.01" placeholder="Price" value={price} onChange={event => setPrice(event.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={event => setQuantity(event.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
