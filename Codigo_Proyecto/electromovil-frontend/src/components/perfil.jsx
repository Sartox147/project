import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/perfil.css"
import api from '../services/api';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Configuración de Axios
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://tu-backend.com',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  // Cargar datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/profile');
        
        if (response.data.success) {
          setProfile({
            ...response.data.data,
            current_password: '',
            password: '',
            password_confirmation: ''
          });
        } else {
          setError(response.data.message || 'Error al cargar el perfil');
        }
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleApiError = (error) => {
    if (error.response) {
      // Error del servidor
      if (error.response.status === 401) {
        setError('No autorizado. Por favor, inicia sesión nuevamente.');
        // Redirigir a login
        setTimeout(() => window.location.href = '/login', 2000);
      } else {
        setError(error.response.data.message || 
                error.response.data.error || 
                'Error en el servidor');
      }
    } else if (error.request) {
      // No hubo respuesta
      setError('No se recibió respuesta del servidor');
    } else {
      // Error de configuración
      setError('Error al configurar la solicitud');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const response = await api.put('/profile', profile);
      
      if (response.data.success) {
        setSuccess(response.data.message);
        setEditMode(false);
        setProfile(prev => ({
          ...prev,
          current_password: '',
          password: '',
          password_confirmation: ''
        }));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !editMode) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            readOnly={!editMode}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            readOnly={!editMode}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
        
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
        
        {editMode && (
          <>
            <h3>Cambiar Contraseña</h3>
            <div className="form-group">
              <label>Contraseña Actual</label>
              <input
                type="password"
                name="current_password"
                value={profile.current_password}
                onChange={handleChange}
                placeholder="Requerida para cambiar contraseña"
              />
            </div>
            
            <div className="form-group">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Dejar en blanco para no cambiar"
              />
            </div>
            
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="password_confirmation"
                value={profile.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        
        <div className="actions">
          {editMode ? (
            <>
              <button 
                type="button" 
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </>
          ) : (
            <button 
              type="button" 
              onClick={() => setEditMode(true)}
              disabled={loading}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;