// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',      
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // për ridrejtim pas regjistrimi

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users', formData);
      setMessage('Regjistrimi u krye me sukses!');
      setError('');
      console.log('User i krijuar:', res.data.user);

      // Ridrejto në login pas 2 sekondash
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Regjistrimi dështoi';
      setError(errorMsg);
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>Regjistrohu</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Emri */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Emri:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>

        {/* Mbiemri */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Mbiemri:</label>
          <input
            type="text"
            name="lastsurname"
            value={formData.lastName}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required  // sepse backend-i kërkon
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>

        {/* Fjalëkalimi */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Fjalëkalimi:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
            minLength="6"
          />
        </div>

        {/* Telefoni */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Telefoni:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Adresa */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Adresa:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Roli */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Roli:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="user">Përdorues</option>
            <option value="worker">Punonjës</option>
          </select>
        </div>

        {/* Butoni */}
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            width: '100%'
          }}
        >
          Regjistrohu
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Ke llogari?{' '}
        <a href="/login" style={{ color: '#007bff' }}>
          Kyqu këtu
        </a>
      </p>
    </div>
  );
};

export default Register;