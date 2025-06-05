import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaPlus, FaTrash, FaTools, FaCalendarAlt, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../assets/Usuario.css';
import Calidad from '../assets/img/calidad.avif';
import Rapidez from '../assets/img/Rapidez.jpg';
import Soporte from '../assets/img/soporte.jpg';
import Garantia from '../assets/img/Garantia.webp';
import Tecnico from '../assets/img/Tecnico.jpg';
import Descuento from '../assets/img/Descuento.webp';

const UserContext = React.createContext();
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

const Usuario = () => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serviceData, setServiceData] = useState({
    tipo_equipo: 'lavadora',
    marca: '',
    modelo: '',
    descripcion_problema: '',
    fecha_solicitud: new Date().toISOString().split('T')[0]
  });
  const [servicios, setServicios] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [newAppliance, setNewAppliance] = useState({
    type: 'nevera',
    brand: '',
    model: '',
    purchaseDate: '',
    image: null
  });
  const [showApplianceForm, setShowApplianceForm] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  const checkAuthError = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      handleLogout();
      return true;
    }
    return false;
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    setInactivityTimer(setTimeout(() => {
      handleLogout();
      alert('Has sido desconectado por inactividad');
    }, INACTIVITY_TIMEOUT));
  };

  const handleUserActivity = () => resetInactivityTimer();

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
      await api.post('/logout');
      localStorage.removeItem('auth_token');
      navigate('/LoginRegister', { state: { logoutSuccess: true } });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      localStorage.removeItem('auth_token');
      navigate('/LoginRegister');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userResponse, serviciosResponse, appliancesResponse] = await Promise.all([
          api.get('/me'),
          api.get('/servicios'),
          api.get('/appliances')
        ]);

        setUserData(prev => ({
          ...prev,
          name: userResponse.data.name || '',
          email: userResponse.data.email || '',
          phone: userResponse.data.phone || '',
          address: userResponse.data.address || ''
        }));

        setServicios(serviciosResponse.data);
        setAppliances(appliancesResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        if (error.response?.status === 401) handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(e => window.addEventListener(e, handleUserActivity));
    resetInactivityTimer();
    fetchData();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(e => window.removeEventListener(e, handleUserActivity));
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await api.put('/user/update', userData);
      setSuccessMessage('Perfil actualizado correctamente');
      setUserData(prev => ({
        ...prev,
        current_password: '',
        password: '',
        password_confirmation: ''
      }));
      await fetchUserData();
    } catch (error) {
      if (!checkAuthError(error)) {
        setErrors(error.response?.data?.errors || { general: 'Error al actualizar perfil' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplianceChange = (e) => {
    const { name, value } = e.target;
    setNewAppliance(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setNewAppliance(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const saveAppliance = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newAppliance).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await api.post('/appliances', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAppliances(prev => [...prev, response.data]);
      setNewAppliance({
        type: 'nevera',
        brand: '',
        model: '',
        purchaseDate: '',
        image: null
      });
      setShowApplianceForm(false);
    } catch (error) {
      if (!checkAuthError(error)) {
        alert('Error al guardar electrodoméstico');
      }
    }
  };

  const deleteAppliance = async (id) => {
    try {
      await api.delete(`/appliances/${id}`);
      setAppliances(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      if (!checkAuthError(error)) {
        alert('Error al eliminar electrodoméstico');
      }
    }
  };

  const crearServicioTecnico = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/servicios', serviceData);
      setServicios(prev => [...prev, response.data]);
      alert("Servicio técnico creado con éxito!");
      setServiceData({
        tipo_equipo: '',
        marca: '',
        modelo: '',
        descripcion_problema: '',
        fecha_solicitud: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      if (!checkAuthError(error)) {
        alert("Error al crear servicio técnico");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userData, fetchUserData }}>
      <div className="usuario-container">
        <header className="compact-header">
          <h1>ElectroMovil</h1>
          <div className="header-controls">
            <div className="controls-spacer"></div>
            <button className="profile-btn" onClick={() => setShowProfileModal(true)}>
              <FaUser className="icon" />
              <span>Perfil</span>
            </button>
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
          </div>
        </header>

        <section className="servicios-section">
          <div className="section-header">
            <h2>Mis Servicios Técnicos</h2>
          </div>
          <div className="servicios-list">
            {servicios.length > 0 ? (
              servicios.map(servicio => (
                <div key={servicio.id} className="servicio-card">
                  <h3>{servicio.tipo_equipo} {servicio.marca} {servicio.modelo}</h3>

                  <p>
                    <strong>Estado:</strong>
                    <span className={`status-badge ${servicio.estado || ''}`}>
                      {servicio.estado ? servicio.estado.replace('_', ' ') : 'Sin estado'}
                    </span>
                  </p>

                  <p><strong>Problema:</strong> {servicio.descripcion_problema}</p>
                  <p><strong>Solicitado:</strong> {new Date(servicio.fecha_solicitud).toLocaleDateString()}</p>

                  {servicio.fecha_atendido && (
                    <p><strong>Atendido:</strong> {new Date(servicio.fecha_atendido).toLocaleDateString()}</p>
                  )}

                  {servicio.costo && (
                    <p><strong>Costo:</strong> ${servicio.costo.toFixed(2)}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="no-servicios">
                <p>No tienes servicios técnicos registrados</p>
              </div>
            )}
          </div>
        </section>

        <section className="service-request-section">
          <div className="section-header">
            <h2>Solicitar Servicio Técnico</h2>
            <p>Agenda una visita de nuestros técnicos especializados</p>
          </div>
          <form className="service-form" onSubmit={crearServicioTecnico}>
            <div className="form-grid">
              <div className="form-group">
                <label>Tipo de Equipo</label>
                <select name="tipo_equipo" value={serviceData.tipo_equipo} onChange={handleServiceInputChange} required>
                  <option value="lavadora">Lavadora</option>
                  <option value="nevera">Nevera</option>
                </select>
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input type="text" name="marca" value={serviceData.marca} onChange={handleServiceInputChange} required placeholder="Ej: Samsung, LG, etc." />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input type="text" name="modelo" value={serviceData.modelo} onChange={handleServiceInputChange} required placeholder="Modelo del equipo" />
              </div>
              <div className="form-group full-width">
                <label>Descripción del Problema</label>
                <textarea name="descripcion_problema" value={serviceData.descripcion_problema} onChange={handleServiceInputChange} required placeholder="Describa el problema con detalle" rows="4" />
              </div>
              <div className="form-group">
                <label>Fecha de Solicitud</label>
                <input type="date" name="fecha_solicitud" value={serviceData.fecha_solicitud} onChange={handleServiceInputChange} required />
              </div>
            </div>
            <div className="form-submit">
              <button type="submit" className="submit-btn">Crear Servicio Técnico</button>
            </div>
          </form>
        </section>

        <section className="appliances-section">
          <div className="section-header">
            <h2>Mis Electrodomésticos</h2>
            <button className="add-appliance-btn" onClick={() => setShowApplianceForm(true)}>
              <FaPlus /> Añadir Electrodoméstico
            </button>
          </div>

          {showApplianceForm && (
            <div className="appliance-form-container">
              <form className="appliance-form" onSubmit={saveAppliance}>
                <h3 className="form-title">Agregar Nuevo Electrodoméstico</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Tipo</label>
                    <select name="type" value={newAppliance.type} onChange={handleApplianceChange} required className="form-control">
                      <option value="nevera">Nevera</option>
                      <option value="lavadora">Lavadora</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Marca</label>
                    <input type="text" name="brand" value={newAppliance.brand} onChange={handleApplianceChange} required className="form-control" placeholder="Ej: Samsung, LG, etc." />
                  </div>
                  <div className="form-group">
                    <label>Modelo</label>
                    <input type="text" name="model" value={newAppliance.model} onChange={handleApplianceChange} required className="form-control" placeholder="Ej: XT-2000, 4K-UHD, etc." />
                  </div>
                  <div className="form-group">
                    <label>Fecha de compra</label>
                    <input type="date" name="purchaseDate" value={newAppliance.purchaseDate} onChange={handleApplianceChange} required className="form-control" />
                  </div>
                  <div className="form-group full-width">
                    <label>Imagen (opcional)</label>
                    <div className="file-upload-wrapper">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" id="appliance-image" />
                      <label htmlFor="appliance-image" className="file-upload-label">
                        {newAppliance.image ? newAppliance.image.name : 'Seleccionar imagen...'}
                      </label>
                    </div>
                    {newAppliance.image && (
                      <div className="image-preview">
                        <span>Vista previa:</span>
                        <img src={URL.createObjectURL(newAppliance.image)} alt="Vista previa" className="preview-image" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowApplianceForm(false)}>Cancelar</button>
                  <button type="submit" className="save-btn">Guardar Electrodoméstico</button>
                </div>
              </form>
            </div>
          )}

          <div className="appliances-grid">
            {appliances.length > 0 ? (
              appliances.map(appliance => (
                <div key={appliance.id} className="appliance-card">
                  <div className="appliance-image">
                    {appliance.image_url ? (
                      <img src={appliance.image_url} alt={appliance.type} />
                    ) : (
                      <div className="default-image">
                        {appliance.type === 'nevera' ? '❄️' : '🧺'}
                      </div>
                    )}
                  </div>
                  <div className="appliance-info">
                    <h3>{appliance.type.charAt(0).toUpperCase() + appliance.type.slice(1)}</h3>
                    <p><strong>Marca:</strong> {appliance.brand}</p>
                    <p><strong>Modelo:</strong> {appliance.model}</p>
                    <p><strong>Comprado:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
                  </div>
                  <button className="delete-btn" onClick={() => deleteAppliance(appliance.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-appliances">
                <p>No tienes electrodomésticos registrados</p>
              </div>
            )}
          </div>
        </section>

        <section className="benefits-section">
          <div className="section-header">
            <h2>Nuestros Beneficios</h2>
            <p>Con ElectroMovil, tienes la seguridad de un servicio confiable y garantizado</p>
          </div>
          <div className="benefits-grid">
            {[
              { icon: Calidad, title: 'Calidad', text: 'Servicios garantizados con los mejores técnicos.' },
              { icon: Rapidez, title: 'Rapidez', text: 'Atención inmediata y eficiente a domicilio.' },
              { icon: Soporte, title: 'Soporte', text: 'Soporte continuo para cualquier consulta.' },
              { icon: Garantia, title: 'Garantía', text: 'Obtén el beneficio de garantía extendida por hasta dos años.' },
              { icon: Tecnico, title: 'Técnicos Certificados', text: 'Nuestros técnicos están certificados y capacitados.' },
              { icon: Descuento, title: 'Descuentos Exclusivos', text: 'Accede a promociones especiales solo disponibles aquí.' }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <img src={benefit.icon} alt={benefit.title} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

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
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};

export default Usuario;