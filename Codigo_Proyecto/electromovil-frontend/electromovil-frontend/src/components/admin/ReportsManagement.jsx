import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Card, Row, Col } from 'react-bootstrap';
import { getReports, createReport, updateReport, deleteReport } from '../../services/reportService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsManagement = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchReports();
    generateChartData();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      showAlert('Error al cargar reportes', 'danger');
    }
  };

  const generateChartData = () => {
    // Datos de ejemplo para el gráfico
    const data = [
      { name: 'Ene', servicios: 12, facturas: 8 },
      { name: 'Feb', servicios: 19, facturas: 12 },
      { name: 'Mar', servicios: 15, facturas: 9 },
      { name: 'Abr', servicios: 22, facturas: 16 },
      { name: 'May', servicios: 18, facturas: 11 },
      { name: 'Jun', servicios: 25, facturas: 19 },
    ];
    setChartData(data);
  };

  const handleEdit = (report) => {
    setCurrentReport(report);
    setShowModal(true);
  };

  const handleDelete = async (reportId) => {
    try {
      await deleteReport(reportId);
      fetchReports();
      showAlert('Reporte eliminado correctamente', 'success');
    } catch (error) {
      showAlert('Error al eliminar reporte', 'danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentReport.id) {
        await updateReport(currentReport.id, currentReport);
      } else {
        await createReport(currentReport);
      }
      setShowModal(false);
      fetchReports();
      showAlert(`Reporte ${currentReport.id ? 'actualizado' : 'creado'} correctamente`, 'success');
    } catch (error) {
      showAlert('Error al guardar reporte', 'danger');
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  return (
    <div className="p-4">
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      
      <div className="d-flex justify-content-between mb-4">
        <h2>Gestión de Reportes</h2>
        <Button variant="primary" onClick={() => { setCurrentReport({ type: 'services' }); setShowModal(true); }}>
          Crear Reporte
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Estadísticas Mensuales</Card.Title>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="servicios" fill="#8884d8" />
                    <Bar dataKey="facturas" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.title}</td>
              <td>
                <span className="badge bg-secondary">{report.type}</span>
              </td>
              <td>{new Date(report.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(report)}>Editar</Button>
                <Button variant="success" size="sm" onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')} className="ms-2">
                  Descargar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(report.id)} className="ms-2">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar/crear reporte */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentReport?.id ? 'Editar Reporte' : 'Crear Reporte'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={currentReport?.title || ''}
                onChange={(e) => setCurrentReport({ ...currentReport, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Reporte</Form.Label>
              <Form.Select
                value={currentReport?.type || 'services'}
                onChange={(e) => setCurrentReport({ ...currentReport, type: e.target.value })}
                required
              >
                <option value="services">Servicios</option>
                <option value="invoices">Facturas</option>
                <option value="users">Usuarios</option>
                <option value="custom">Personalizado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Filtros (JSON)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentReport?.filters ? JSON.stringify(currentReport.filters, null, 2) : '{}'}
                onChange={(e) => {
                  try {
                    setCurrentReport({ ...currentReport, filters: JSON.parse(e.target.value) });
                  } catch (error) {
                    // Manejar error de JSON inválido
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentReport?.description || ''}
                onChange={(e) => setCurrentReport({ ...currentReport, description: e.target.value })}
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

export default ReportsManagement;