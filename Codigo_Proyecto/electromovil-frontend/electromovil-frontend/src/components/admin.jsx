import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Limpiar toda la autenticación
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redirigir al login y forzar recarga
    window.location.href = '/login-register';
  };

  // Función para determinar si una ruta está activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-container">
      {/* Barra de navegación superior */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            <i className="bi bi-speedometer2 me-2"></i>
            Admin Panel
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`} 
                  to="/admin/users"
                >
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/admin/services') ? 'active' : ''}`} 
                  to="/admin/services"
                >
                  Servicios
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/admin/invoices') ? 'active' : ''}`} 
                  to="/admin/invoices"
                >
                  Facturas
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/admin/reports') ? 'active' : ''}`} 
                  to="/admin/reports"
                >
                  Reportes
                </Link>
              </li>
            </ul>
            
            <div className="d-flex">
              <button 
                className="btn btn-outline-light" 
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 sidebar">
            <div className="list-group">
              <Link 
                to="/admin/users" 
                className={`list-group-item list-group-item-action ${isActive('/admin/users') ? 'active' : ''}`}
              >
                <i className="bi bi-people-fill me-2"></i>
                Gestión de Usuarios
              </Link>
              <Link 
                to="/admin/services" 
                className={`list-group-item list-group-item-action ${isActive('/admin/services') ? 'active' : ''}`}
              >
                <i className="bi bi-tools me-2"></i>
                Gestión de Servicios
              </Link>
              <Link 
                to="/admin/invoices" 
                className={`list-group-item list-group-item-action ${isActive('/admin/invoices') ? 'active' : ''}`}
              >
                <i className="bi bi-receipt me-2"></i>
                Gestión de Facturas
              </Link>
              <Link 
                to="/admin/reports" 
                className={`list-group-item list-group-item-action ${isActive('/admin/reports') ? 'active' : ''}`}
              >
                <i className="bi bi-graph-up me-2"></i>
                Reportes
              </Link>
            </div>
          </div>
          
          {/* Área de contenido */}
          <div className="col-md-10">
            <div className="content-container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;