import React, { useState } from 'react';
import '../assets/Tecnico.css';

const Tecnico = () => {
    const [counters, setCounters] = useState({
        pending: 5,
        inProgress: 2,
        completed: 12,
        parts: 3
    });

    const [availability, setAvailability] = useState(true); 

    const changeStatus = (newStatus, fromCounter, toCounter) => {
        setCounters(prev => ({
            ...prev,
            [fromCounter]: prev[fromCounter] - 1,
            [toCounter]: prev[toCounter] + 1
        }));
        alert(`Estado cambiado a: ${newStatus}`);
    };

    const notifyCustomer = () => {
        alert('Se ha enviado una notificación al cliente');
    };

    return (
        <>

            {/* Header */}
            <header>
                <nav >
                    <a href="#" className="logo">ElectroMovil</a>
                    <a href="/LoginRegister#register" className="login-btn">Salir</a>
                </nav>
            </header>


            <div className="table-responsive">
  <table className="table table-hover align-middle">
    <thead className="table-primary">
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Dirección</th>
        <th>Fecha</th>
        <th>Servicio</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#101</td>
        <td>
          <a href="#" data-bs-toggle="modal" data-bs-target="#orderDetailModal">Juan Pérez</a>
        </td>
        <td>Calle 123, Ciudad</td>
        <td>20/12/2024</td>
        <td>Reparación Nevera</td>
        <td>
          <span className="status-badge status-pending">Pendiente</span>
        </td>
        <td>
          <div className="dropdown">
            <button className="btn btn-sm btn-primary dropdown-toggle btn-pulse" type="button" data-bs-toggle="dropdown">
              Cambiar Estado
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'En progreso', 'pendingCount', 'inProgressCount')">
                <i className="fas fa-spinner me-2 text-info"></i>En progreso
              </a></li>
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'Completada', 'pendingCount', 'completedCount')">
                <i className="fas fa-check-circle me-2 text-success"></i>Completada
              </a></li>
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'Necesita repuestos', 'pendingCount', 'partsCount')">
                <i className="fas fa-box-open me-2 text-warning"></i>Necesita repuestos
              </a></li>
            </ul>
          </div>
          <button className="btn btn-sm btn-outline-success mt-1" onClick="notifyCustomer()">
            <i className="fas fa-sms"></i> Notificar
          </button>
        </td>
      </tr>
      <tr>
        <td>#102</td>
        <td>
          <a href="#" data-bs-toggle="modal" data-bs-target="#orderDetailModal">María López</a>
        </td>
        <td>Avenida 456, Ciudad</td>
        <td>22/12/2024</td>
        <td>Mantenimiento Lavadora</td>
        <td>
          <span className="status-badge status-in-progress">En progreso</span>
        </td>
        <td>
          <div className="dropdown">
            <button className="btn btn-sm btn-primary dropdown-toggle btn-pulse" type="button" data-bs-toggle="dropdown">
              Cambiar Estado
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'Pendiente', 'inProgressCount', 'pendingCount')">
                <i className="fas fa-clock me-2 text-warning"></i>Pendiente
              </a></li>
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'Completada', 'inProgressCount', 'completedCount')">
                <i className="fas fa-check-circle me-2 text-success"></i>Completada
              </a></li>
              <li><a className="dropdown-item" href="#" onClick="changeStatus(this, 'Necesita repuestos', 'inProgressCount', 'partsCount')">
                <i className="fas fa-box-open me-2 text-warning"></i>Necesita repuestos
              </a></li>
            </ul>
          </div>
          <button className="btn btn-sm btn-outline-success mt-1" onClick="notifyCustomer()">
            <i className="fas fa-sms"></i> Notificar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
            <div>
                <section className="row mb-4 g-4">
                    <div className="col-lg-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-primary">
                                    <i className="fas fa-map-marked-alt me-2"></i>Mapa de Visitas
                                </h5>
                                <div className="ratio ratio-16x9 mt-3">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63631.70277658661!2d-74.10483199999999!3d4.5973504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1734488019385!5m2!1ses!2sco"
                                        style={{ border: 0, borderRadius: '8px' }} allowFullScreen loading="lazy">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-primary">
                                    <i className="fas fa-file-alt me-2"></i>Reportar Avances
                                </h5>
                                <form className="mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="visitId" className="form-label">ID de Visita</label>
                                        <select className="form-select" id="visitId" required>
                                            <option value="" selected disabled>Selecciona una visita</option>
                                            <option value="101">#101 - Juan Pérez</option>
                                            <option value="102">#102 - María López</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="progressType" className="form-label">Tipo de Reporte</label>
                                        <select className="form-select" id="progressType" required>
                                            <option value="progress">Avance de trabajo</option>
                                            <option value="parts">Necesidad de repuestos</option>
                                            <option value="complete">Trabajo completado</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="comments" className="form-label">Detalles</label>
                                        <textarea className="form-control" id="comments" rows="3" required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="photoUpload" className="form-label">Subir foto (opcional)</label>
                                        <input className="form-control" type="file" id="photoUpload" accept="image/*" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-pulse w-100">
                                        <i className="fas fa-paper-plane me-2"></i>Enviar Reporte
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="modal fade" id="orderDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Detalle de la Orden #101</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="fw-bold">Información del Cliente</h6>
                                    <p><i className="fas fa-user me-2"></i> <strong>Nombre:</strong> Juan Pérez</p>
                                    <p><i className="fas fa-phone me-2"></i> <strong>Teléfono:</strong> +57 300 123 4567</p>
                                    <p><i className="fas fa-envelope me-2"></i> <strong>Email:</strong> juan@example.com</p>
                                    <p><i className="fas fa-map-marker-alt me-2"></i> <strong>Dirección:</strong> Calle 123 #45-67, Bogotá</p>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="fw-bold">Detalles del Servicio</h6>
                                    <p><i className="fas fa-tools me-2"></i> <strong>Tipo:</strong> Reparación de Nevera</p>
                                    <p><i className="fas fa-industry me-2"></i> <strong>Marca:</strong> Samsung</p>
                                    <p><i className="fas fa-barcode me-2"></i> <strong>Modelo:</strong> RT38K5930S9</p>
                                    <p><i className="fas fa-calendar-alt me-2"></i> <strong>Fecha asignada:</strong> 20/12/2024 - 2:00 PM</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mb-3">
                                <h6 className="fw-bold"><i className="fas fa-exclamation-triangle me-2"></i>Descripción de la falla</h6>
                                <p className="ps-4">El cliente reporta que la nevera no enfría correctamente en el compartimiento superior. Se escucha un ruido anormal al encender el compresor.</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold"><i className="fas fa-clipboard-list me-2"></i>Historial de la Orden</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <small className="text-muted">15/12/2024 10:30 AM</small> - Orden creada
                                    </li>
                                    <li className="list-group-item">
                                        <small className="text-muted">16/12/2024 9:15 AM</small> - Asignada al técnico
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={notifyCustomer}>
                                <i className="fas fa-sms me-2"></i>Notificar al Cliente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 ElectroMovil. Todos los derechos reservados.</p>
            </footer>
        </>
    );
};

export default Tecnico;