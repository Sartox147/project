import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import '../../assets/admin.css';
import { api } from '../../services/api';
import { FaUser  } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors,] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos guardados en localStorage si existen
  useEffect(() => {
    const storedUser  = JSON.parse(localStorage.getItem('userData'));
    if (storedUser ) setUserData(prev => ({ ...prev, ...storedUser  }));
  }, []);

  const checkAuthError = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      handleLogout();
      return true;
    }
    return false;
  };
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        if (!response.data) throw new Error('Datos de usuario no recibidos');
  
        setUserData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          current_password: '',
          password: '',
          password_confirmation: ''
        });
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        if (!checkAuthError(error)) {
          handleLogout();
        }
      }
    };
   


  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login-register', { replace: true });
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar datos actualizados de perfil
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await api.put(`/users/${userData.id}`, userData);
      setSuccessMessage('Perfil actualizado con éxito.');
      setUserData(prev => ({
        ...prev,
        current_password: '',
        password: '',
        password_confirmation: ''
      }));
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Ocurrió un error al actualizar el perfil.' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleElectroMovilClick = () => {
    navigate('/admin');
  };
  const isBaseRoute = location.pathname === '/admin' || location.pathname === '/admin/';

  const dashboardOptions = [
    {
      path: 'users',
      icon: 'bi-people-fill',
      title: 'Gestión de Usuarios',
      description: 'Administra los usuarios del sistema, roles y permisos.'
    },
    {
      path: 'services',
      icon: 'bi-tools',
      title: 'Gestión de Servicios',
      description: 'Gestiona los servicios ofrecidos por la empresa.'
    },
    {
      path: 'invoices',
      icon: 'bi-receipt',
      title: 'Gestión de Facturas',
      description: 'Administra las facturas y transacciones de los clientes.'
    },
    {
      path: 'reports',
      icon: 'bi-graph-up',
      title: 'Reportes',
      description: 'Genera reportes y estadísticas del sistema.'
    }
  ];

  return (
    <div className="usuario-container">
      <header className="compact-header">
        <h1 onClick={handleElectroMovilClick} style={{ cursor: 'pointer' }}>ElectroMovil</h1>
        <div className="header-controls">
          <div className="controls-spacer"></div>
          <button className="profile-btn" onClick={() => setShowProfileModal(true)}>
            <FaUser  className="icon" />
            <span>Perfil</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <div className="container-fluid admin-content">
        {isBaseRoute ? (
          <div className="row dashboard-container">
            <h2 className="dashboard-title">Panel de Administración</h2>
            <p className="dashboard-subtitle">Selecciona una opción para gestionar</p>
            <div className="dashboard-options">
              {dashboardOptions.map(option => (
                <Link to={option.path} key={option.path} className="dashboard-card">
                  <div className="card-icon">
                    <i className={`bi ${option.icon}`}></i>
                  </div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-10">
              <div className="content-container">
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL PERFIL */}

        <div className={`modal-overlay ${showProfileModal ? 'show' : ''}`}>
          {showProfileModal && (
            <div className="modal-content">
              <div className="modal-header">
                <h3>Perfil de {userData.name || 'Usuario'}</h3>
                <button onClick={() => setShowProfileModal(false)}>×</button>
              </div>
              <form className="profile-form" onSubmit={handleSubmit}>
                {successMessage && (
                  <div className="alert alert-success">
                    {successMessage}
                    <button onClick={() => setSuccessMessage('')}>×</button>
                  </div>
                )}
                {errors.general && (
                  <div className="alert alert-danger">
                    {errors.general}
                    <button onClick={() => setErrors(prev => ({ ...prev, general: '' }))}>×</button>
                  </div>
                )}

                {['name', 'email', 'phone', 'address'].map(field => (
                  <div key={field} className="form-group">
                    <label>{{
                      name: 'Nombre completo',
                      email: 'Correo electrónico',
                      phone: 'Teléfono',
                      address: 'Dirección'
                    }[field]}</label>
                    <input
                      type={{
                        name: 'text',
                        email: 'email',
                        phone: 'tel',
                        address: 'text'
                      }[field]}
                      name={field}
                      value={userData[field]}
                      onChange={handleInputChange}
                      className={errors[field] ? 'is-invalid' : ''}
                    />
                    {errors[field] && <div className="invalid-feedback">{errors[field][0]}</div>}
                  </div>
                ))}

                <div className="password-section">
                  <h4>Cambiar contraseña</h4>
                  <p className="text-muted">Deja estos campos vacíos si no deseas cambiar la contraseña</p>

                  {['current_password', 'password', 'password_confirmation'].map(field => (
                    <div key={field} className="form-group">
                      <label>{{
                        current_password: 'Contraseña actual',
                        password: 'Nueva contraseña',
                        password_confirmation: 'Confirmar nueva contraseña'
                      }[field]}</label>
                      <input
                        type="password"
                        name={field}
                        value={userData[field]}
                        onChange={handleInputChange}
                        placeholder={{
                          current_password: 'Ingresa tu contraseña actual',
                          password: 'Mínimo 8 caracteres',
                          password_confirmation: 'Repite tu nueva contraseña'
                        }[field]}
                        className={errors[field] ? 'is-invalid' : ''}
                      />
                      {errors[field] && <div className="invalid-feedback">{errors[field][0]}</div>}
                    </div>
                  ))}
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowProfileModal(false)} disabled={isLoading}>
                    Cancelar
                  </button>
                  <button type="submit" className="save-btn" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} ElectroMovil. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
