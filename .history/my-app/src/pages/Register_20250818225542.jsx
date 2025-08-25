import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 

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
  const navigate = useNavigate(); 

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
    <div className="form-container">
      <h2>Regjistrohu</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Emri:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Mbiemri:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label>Fjalëkalimi:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit">Regjistrohu</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Ke llogari?{' '}
        <a href="/login">Kyqu këtu
        </a>
      </p>
    </div>
  );
};

export default Register;