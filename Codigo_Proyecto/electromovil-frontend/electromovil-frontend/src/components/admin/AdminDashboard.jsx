import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/admin.css';
import api from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login-register', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login-register', { replace: true });
    }
  };

  // Verifica si estamos en la ruta base del admin
  const isBaseRoute = location.pathname === '/admin' || location.pathname === '/admin/';

  // Opciones del dashboard
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
        <h1>ElectroMovil</h1>
        <div className="header-controls">
          <div className="controls-spacer"></div>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container-fluid admin-content">
        {isBaseRoute ? (
          // Vista de contenedores (dashboard)
          <div className="row dashboard-container">
            <h2 className="dashboard-title">Panel de Administración</h2>
            <p className="dashboard-subtitle">Selecciona una opción para gestionar</p>
            
            <div className="dashboard-options">
              {dashboardOptions.map((option) => (
                <Link 
                  to={option.path} 
                  key={option.path}
                  className="dashboard-card"
                >
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
          // Vista normal con sidebar y contenido
          <div className="row">
            <div className="col-md-2 sidebar">
              <div className="list-group">
                {dashboardOptions.map((option) => (
                  <Link
                    to={option.path}
                    key={option.path}
                    className={`list-group-item list-group-item-action ${
                      location.pathname === `/admin/${option.path}` ? 'active' : ''
                    }`}
                  >
                    <i className={`bi ${option.icon} me-2`}></i>
                    {option.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="col-md-10">
              <div className="content-container">
                <Outlet /> {/* Esto renderizará InvoicesManagement cuando estemos en /admin/invoices */}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Electromovil. Todos los derechos reservados.</p>
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