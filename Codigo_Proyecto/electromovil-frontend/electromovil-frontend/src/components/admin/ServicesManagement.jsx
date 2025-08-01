import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Badge } from 'react-bootstrap';
import apiService, { api } from '../../services/api.js'; // solo necesitas esta línea

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [cient, setcient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
    fetchTechnicians();
    fetchcient();
  }, []);

  useEffect(() => {
    filterServices(searchTerm);
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServicios();
      setServices(response.data);
      setFilteredServices(response.data); // Inicialmente, los servicios filtrados son todos los servicios
    } catch (error) {
      showAlert('Error al cargar servicios', 'danger');
    }
  };

  //consulta de tecnicos
  const fetchTechnicians = async () => {
    try {
      const response = await api.get('/users/by-role?role=tecnico');
      setTechnicians(response.data);
    } catch (error) {
      showAlert('Error al cargar técnicos', 'danger');
    }
  };

  const fetchcient = async () => {
    try {
      const response = await api.get('/users/by-role?role=cliente');
      setcient(response.data);
    } catch (error) {
      showAlert('Error al cargar clientes', 'danger');
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
  };

  const handleEdit = (service) => {
    setCurrentService({
      ...service,
      cientid: service.cliente_id || '',
      technicianId: service.tecnico_id || '',
      description: service.descripcion_problema,
      status: service.estado,
      notes: service.notas || '',
      tipo_equipo: service.tipo_equipo,
      marca: service.marca,
      modelo: service.modelo,
      diagnostico: service.diagnostico,
      solucion: service.solucion,
      costo: service.costo,
      fecha_solicitud: service.fecha_solicitud,
      fecha_atendido: service.fecha_atendido,
      fecha_completado: service.fecha_completado,
    });
    setShowModal(true);
  };

  const handleStatusChange = async (serviceId, newStatus) => {
    try {
      await api.put(`/servicios/${serviceId}`, { estado: newStatus });
      fetchServices();
      showAlert('Estado del servicio actualizado', 'success');
    } catch (error) {
      showAlert('Error al actualizar servicio', 'danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        tipo_equipo: currentService.tipo_equipo,
        marca: currentService.marca,
        modelo: currentService.modelo,
        descripcion_problema: currentService.description,
        estado: currentService.status,
        diagnostico: currentService.diagnostico,
        solucion: currentService.solucion,
        costo: currentService.costo,
        fecha_solicitud: currentService.fecha_solicitud,
        fecha_atendido: currentService.fecha_atendido,
        fecha_completado: currentService.fecha_completado,
        tecnico_id: currentService.technicianId || null,
        cliente_id: currentService.cientid || null,
      };

      if (currentService.id) {
        await api.put(`/servicios/${currentService.id}`, payload);
      } else {
        await api.post('/servicios', payload);
      }

      setShowModal(false);
      fetchServices();
      showAlert(`Servicio ${currentService.id ? 'actualizado' : 'creado'} correctamente`, 'success');
    } catch (error) {
      showAlert('Error al guardar servicio', 'danger');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pendiente: 'warning',
      en_proceso: 'primary',
      completado: 'success',
      cancelado: 'danger'
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const filterServices = (term) => {
    const lowerTerm = term.toLowerCase().trim();

    const filtered = services.filter(service => {
      const tecnicoName = service.tecnico?.name?.toLowerCase() || '';
      const tieneTecnico = tecnicoName.length > 0;

      const matchesTecnicoNoAsignado = lowerTerm === 'no asignado' && !tieneTecnico;

      return (
        service.tipo_equipo?.toLowerCase().includes(lowerTerm) ||
        service.marca?.toLowerCase().includes(lowerTerm) ||
        service.modelo?.toLowerCase().includes(lowerTerm) ||
        service.descripcion_problema?.toLowerCase().includes(lowerTerm) ||
        service.estado?.toLowerCase().includes(lowerTerm) ||
        matchesTecnicoNoAsignado ||   // matches "No asignado"
        tecnicoName.includes(lowerTerm)  // busca por nombre de técnico
      );
    });

    setFilteredServices(filtered);
  };

  return (
    <div className="p-4">
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <div className="d-flex justify-content-between mb-4">
        <h2>Gestión de Servicios</h2>
        <Button variant="primary" onClick={() => {
          setCurrentService({ status: 'pendiente' });
          setShowModal(true);
        }}>
          Crear Servicio
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Buscar por equipo, marca, tecnico, descripción, estado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Descripción problema</th>
            <th>Técnico</th>
            <th>Estado</th>
            <th>Fecha Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">No se encontraron servicios.</td>
            </tr>
          ) : (
            filteredServices.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.tipo_equipo}</td>
                <td>{service.marca}</td>
                <td>{service.modelo}</td>
                <td>{service.descripcion_problema}</td>
                <td>{service.tecnico?.name || 'No asignado'}</td>
                <td>{getStatusBadge(service.estado)}</td>
                <td>{service.fecha_solicitud}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleEdit(service)}>Editar</Button>
                  <div className="btn-group ms-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleStatusChange(service.id, 'pendiente')}
                      active={service.estado === 'pendiente'}
                    >
                      Pendiente
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleStatusChange(service.id, 'en_proceso')}
                      active={service.estado === 'en_proceso'}
                    >
                      En Proceso
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleStatusChange(service.id, 'completado')}
                      active={service.estado === 'completado'}
                    >
                      Completado
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para crear/editar servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentService?.id ? 'Editar Servicio' : 'Crear Servicio'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Equipo</Form.Label>
              <Form.Control
                as="select"
                value={currentService?.tipo_equipo || ''}
                onChange={(e) => setCurrentService({ ...currentService, tipo_equipo: e.target.value })}
                required
              >
                <option value="" disabled hidden>
                  Seleccione tipo de equipo
                </option>
                <option value="lavadora">Lavadora</option>
                <option value="nevera">Nevera</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.marca || ''}
                onChange={(e) => setCurrentService({ ...currentService, marca: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.modelo || ''}
                onChange={(e) => setCurrentService({ ...currentService, modelo: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción del Problema</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentService?.description || ''}
                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={currentService?.status || 'pendiente'}
                onChange={(e) => setCurrentService({ ...currentService, status: e.target.value })}
                required
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asignar Técnico</Form.Label>
              <Form.Select
                value={currentService?.technicianId || ''}
                onChange={(e) => setCurrentService({ ...currentService, technicianId: e.target.value })}
              >
                <option value="">No asignado</option>
                {technicians.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </Form.Select>
              <Form.Label>Asignar un cliente</Form.Label>
              <Form.Select
                value={currentService?.cientid || ''}
                onChange={(e) => setCurrentService({ ...currentService, cientid: e.target.value })}
              >
                <option value="">Seleccione un cliente</option>
                {cient.filter(client => client?.id).map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={currentService?.diagnostico || ''}
                onChange={(e) => setCurrentService({ ...currentService, diagnostico: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Solución</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={currentService?.solucion || ''}
                onChange={(e) => setCurrentService({ ...currentService, solucion: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Costo</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={currentService?.costo || ''}
                onChange={(e) => setCurrentService({ ...currentService, costo: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Solicitud</Form.Label>
              <Form.Control
                type="date"
                value={currentService?.fecha_solicitud || ''}
                onChange={(e) => setCurrentService({ ...currentService, fecha_solicitud: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Atendido</Form.Label>
              <Form.Control
                type="date"
                value={currentService?.fecha_atendido || ''}
                onChange={(e) => setCurrentService({ ...currentService, fecha_atendido: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha Completado</Form.Label>
              <Form.Control
                type="date"
                value={currentService?.fecha_completado || ''}
                onChange={(e) => setCurrentService({ ...currentService, fecha_completado: e.target.value })}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">{currentService?.id ? 'Actualizar' : 'Crear'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicesManagement;
