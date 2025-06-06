import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Badge } from 'react-bootstrap';
import { getServices, updateService, createService } from '../../services/serviceService';
import { getUsers } from '../../services/userService';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    fetchServices();
    fetchTechnicians();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      showAlert('Error al cargar servicios', 'danger');
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await getUsers({ role: 'technician' });
      setTechnicians(response.data);
    } catch (error) {
      showAlert('Error al cargar técnicos', 'danger');
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  const handleStatusChange = async (serviceId, newStatus) => {
    try {
      await updateService(serviceId, { status: newStatus });
      fetchServices();
      showAlert('Estado del servicio actualizado', 'success');
    } catch (error) {
      showAlert('Error al actualizar servicio', 'danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentService.id) {
        await updateService(currentService.id, currentService);
      } else {
        await createService(currentService);
      }
      setShowModal(false);
      fetchServices();
      showAlert(`Servicio ${currentService.id ? 'actualizado' : 'creado'} correctamente`, 'success');
    } catch (error) {
      showAlert('Error al guardar servicio', 'danger');
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      in_progress: 'primary',
      completed: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="p-4">
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      
      <div className="d-flex justify-content-between mb-4">
        <h2>Gestión de Servicios</h2>
        <Button variant="primary" onClick={() => { setCurrentService({ status: 'pending' }); setShowModal(true); }}>
          Crear Servicio
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Cliente</th>
            <th>Técnico</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.description}</td>
              <td>{service.client?.name}</td>
              <td>{service.technician?.name || 'No asignado'}</td>
              <td>{getStatusBadge(service.status)}</td>
              <td>{new Date(service.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(service)}>Editar</Button>
                <div className="btn-group ms-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => handleStatusChange(service.id, 'pending')}
                    active={service.status === 'pending'}
                  >
                    Pendiente
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => handleStatusChange(service.id, 'in_progress')}
                    active={service.status === 'in_progress'}
                  >
                    En Proceso
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => handleStatusChange(service.id, 'completed')}
                    active={service.status === 'completed'}
                  >
                    Completado
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar/crear servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentService?.id ? 'Editar Servicio' : 'Crear Servicio'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
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
                value={currentService?.status || 'pending'}
                onChange={(e) => setCurrentService({ ...currentService, status: e.target.value })}
                required
              >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Proceso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Asignar Técnico</Form.Label>
              <Form.Select
                value={currentService?.technicianId || ''}
                onChange={(e) => setCurrentService({ ...currentService, technicianId: e.target.value || null })}
              >
                <option value="">No asignado</option>
                {technicians.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={currentService?.notes || ''}
                onChange={(e) => setCurrentService({ ...currentService, notes: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicesManagement;