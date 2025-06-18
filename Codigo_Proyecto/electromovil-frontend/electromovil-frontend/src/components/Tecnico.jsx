import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faTasks, faFileAlt,
  faClock, faSpinner, faCheckCircle, faTimesCircle,
  faTools, faIndustry, faBarcode, faExclamationTriangle,
  faUser, faPhone, faEnvelope, faHome, faLock
} from '@fortawesome/free-solid-svg-icons';
import '../assets/Tecnico.css';
import { api } from '../services/api';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const Tecnico = () => {
  const navigate = useNavigate();
  // Estado para controlar la disponibilidad
  const [availability, setAvailability] = useState('disponible');

  // Estado para controlar la visibilidad del modal de perfil
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Datos del técnico
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  // Datos de servicios con los nuevos campos solicitados
  const [servicios, setServicios] = useState([]);
  useEffect(() => {
    const fetchServiciosAsignados = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); // obtenemos el id del técnico logueado
        const tecnicoId = userData?.id; // este id debe ser el que corresponde en la tabla 'users'

        const response = await api.get('/mis-servicios-tecnico');
        setServicios(response.data);
      } catch (error) {
        console.error('Error al cargar los servicios asignados:', error);
      }
    };

    fetchServiciosAsignados();
  }, []);


  // Función para cambiar disponibilidad
  const cambiarDisponibilidad = () => {
    if (availability === 'disponible') {
      setAvailability('ocupado');
    } else if (availability === 'ocupado') {
      setAvailability('break');
    } else {
      setAvailability('disponible');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login-register', { replace: true });
    }
  };

  // Función para cambiar estado de servicio
  const cambiarEstadoServicio = (id, nuevoEstado) => {
    setServicios(servicios.map(servicio =>
      servicio.id === id ? { ...servicio, estado: nuevoEstado } : servicio
    ));
  };

  // Función para actualizar servicio
  const actualizarServicio = (id, campo, valor) => {
    setServicios(servicios.map(servicio =>
      servicio.id === id ? { ...servicio, [campo]: valor } : servicio
    ));
  };

  // Función para enviar reporte
  const enviarReporte = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const servicioId = formData.get('servicio');
    const tipoReporte = formData.get('tipo_reporte');
    const detalles = formData.get('detalles');

    alert(`Reporte enviado para el servicio ${servicioId}: ${tipoReporte} - ${detalles}`);
    e.target.reset();
  };

  // Función para actualizar perfil
  const actualizarPerfil = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      ...profile,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address')
    };

    if (formData.get('password') && formData.get('password') === formData.get('password_confirmation')) {
      updatedProfile.password = formData.get('password');
    }

    setProfile(updatedProfile);
    alert('Perfil actualizado correctamente');
    setShowProfileModal(false);
  };

  // Función para manejar cambio en inputs de perfil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="technician-container">
      {/* Header compacto */}
      <header className="compact-header">
        <h1>ElectroMovil</h1>
        <div className="header-controls">
          <div className="availability-container">
            <button
              className={`availability-btn ${availability}`}
              onClick={cambiarDisponibilidad}
            >
              {availability === 'disponible' && 'Disponible'}
              {availability === 'ocupado' && 'Ocupado'}
              {availability === 'break' && 'En descanso'}
            </button>
            <button
              className="profile-btn"
              onClick={() => setShowProfileModal(true)}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Salir</button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content-grid">
        {/* Sección izquierda - Servicios asignados */}
        <section className="services-section">
          <div className="section-header">
            <FontAwesomeIcon icon={faTasks} />
            <h2>Servicios Asignados</h2>
          </div>

          <div className="services-list">
            {servicios.map(servicio => (
              <div key={servicio.id} className="service-card">
                <div className="service-header">
                  <h3>Servicio #{servicio.id}</h3>
                  <span className={`status-badge ${servicio.estado}`}>
                    {servicio.estado === 'pendiente' && 'Pendiente'}
                    {servicio.estado === 'en_proceso' && 'En proceso'}
                    {servicio.estado === 'completado' && 'Completado'}
                    {servicio.estado === 'cancelado' && 'Cancelado'}
                  </span>
                </div>

                <div className="service-info">
                  <p className="service-address">
                    <FontAwesomeIcon icon={faHome} /> {servicio.direccion} - {servicio.fecha}
                  </p>

                  <div className="contact-info">
                    <p>
                      <FontAwesomeIcon icon={faUser} /> <strong>Contacto:</strong> {servicio.contacto}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong> {servicio.telefono_contacto}
                    </p>
                  </div>

                  <div className="equipo-info">
                    <p><FontAwesomeIcon icon={faTools} /> <strong>Tipo:</strong> {servicio.tipo_equipo}</p>
                    <p><FontAwesomeIcon icon={faIndustry} /> <strong>Marca:</strong> {servicio.marca}</p>
                    <p><FontAwesomeIcon icon={faBarcode} /> <strong>Modelo:</strong> {servicio.modelo}</p>
                    <p><FontAwesomeIcon icon={faExclamationTriangle} /> <strong>Problema:</strong> {servicio.descripcion_problema}</p>
                  </div>

                  {servicio.estado === 'completado' && (
                    <div className="solution-info">
                      <p><strong>Solución:</strong> {servicio.solucion}</p>
                      <p><strong>Costo:</strong> ${servicio.costo}</p>
                    </div>
                  )}
                </div>

                <div className="service-actions">
                  <div className="dropdown">
                    <button className="action-btn">Cambiar estado</button>
                    <div className="dropdown-content">
                      <button onClick={() => cambiarEstadoServicio(servicio.id, 'pendiente')}>
                        <FontAwesomeIcon icon={faClock} /> Pendiente
                      </button>
                      <button onClick={() => cambiarEstadoServicio(servicio.id, 'en_proceso')}>
                        <FontAwesomeIcon icon={faSpinner} /> En proceso
                      </button>
                      <button onClick={() => cambiarEstadoServicio(servicio.id, 'completado')}>
                        <FontAwesomeIcon icon={faCheckCircle} /> Completado
                      </button>
                      <button onClick={() => cambiarEstadoServicio(servicio.id, 'cancelado')}>
                        <FontAwesomeIcon icon={faTimesCircle} /> Cancelado
                      </button>
                    </div>
                  </div>

                  {servicio.estado === 'en_proceso' && (
                    <div className="complete-form">
                      <input
                        type="text"
                        placeholder="Solución aplicada"
                        value={servicio.solucion}
                        onChange={(e) => actualizarServicio(servicio.id, 'solucion', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Costo"
                        value={servicio.costo}
                        onChange={(e) => actualizarServicio(servicio.id, 'costo', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección derecha - Mapa y reportes */}
        <div className="right-side-column">
          {/* Tarjeta de mapa */}
          <section className="map-section">
            <div className="section-header">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <h2>Mapa de Visitas</h2>
            </div>
            <div className="map-container">
              <iframe
                title="Mapa de visitas"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63631.70277658661!2d-74.10483199999999!3d4.5973504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1734488019385!5m2!1ses!2sco"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="map-locations">
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Sgacchi</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Ka Tabanca</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Temposo</p>
              </div>
            </div>
          </section>

          {/* Tarjeta de reportes */}
          <section className="report-section">
            <div className="section-header">
              <FontAwesomeIcon icon={faFileAlt} />
              <h2>Reportar Avances</h2>
            </div>
            <form className="report-form" onSubmit={enviarReporte}>
              <div className="form-group">
                <label>Servicio</label>
                <select name="servicio" required>
                  <option value="">Selecciona un servicio</option>
                  {servicios.map(servicio => (
                    <option key={servicio.id} value={servicio.id}>
                      #{servicio.id} - {servicio.tipo_equipo} ({servicio.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Reporte</label>
                <select name="tipo_reporte" required>
                  <option value="avance">Avance de trabajo</option>
                  <option value="repuestos">Necesidad de repuestos</option>
                  <option value="problema">Problema encontrado</option>
                  <option value="completado">Trabajo completado</option>
                </select>
              </div>

              <div className="form-group">
                <label>Detalles</label>
                <textarea name="detalles" rows="3" required></textarea>
              </div>

              <div className="form-group">
                <label>Subir foto (opcional)</label>
                <input type="file" name="foto" accept="image/*" />
              </div>

              <button type="submit" className="submit-btn">
                <FontAwesomeIcon icon={faFileAlt} /> Enviar Reporte
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Modal de perfil */}
      {showProfileModal && (
        <div className={`modal-overlay ${showProfileModal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Perfil del Técnico</h3>
              <button onClick={() => setShowProfileModal(false)}>×</button>
            </div>
            <form className="profile-form" onSubmit={actualizarPerfil}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="password-section">
                <h4>Cambiar contraseña</h4>

                <div className="form-group">
                  <label>Contraseña actual</label>
                  <input
                    type="password"
                    name="current_password"
                    value={profile.current_password}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar nueva contraseña</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={profile.password_confirmation}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowProfileModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} ElectroMovil. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Tecnico;