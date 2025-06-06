import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Badge } from 'react-bootstrap';
import { getUsers, updateUser, createUser, deleteUser } from '../../services/userService';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    role: 'cliente',
    phone: '',
    address: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      showAlert('Error al cargar usuarios', 'danger');
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      fetchUsers();
      showAlert('Usuario eliminado correctamente', 'success');
    } catch (error) {
      showAlert('Error al eliminar usuario', 'danger');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.id) {
        await updateUser(currentUser.id, currentUser);
      } else {
        await createUser(currentUser);
      }
      setShowModal(false);
      fetchUsers();
      showAlert(`Usuario ${currentUser.id ? 'actualizado' : 'creado'} correctamente`, 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al guardar usuario', 'danger');
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'danger',
      tecnico: 'warning',
      cliente: 'primary'
    };
    return <Badge bg={variants[role]}>{role}</Badge>;
  };

  return (
    <div className="p-4">
      {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
        {alert.message}
      </Alert>}
      
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <h2>Gestión de Usuarios</h2>
        <Button variant="primary" onClick={() => {
          setCurrentUser({
            name: '',
            email: '',
            role: 'cliente',
            phone: '',
            address: ''
          });
          setShowModal(true);
        }}>
          <i className="fas fa-plus me-2"></i>Crear Usuario
        </Button>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre, email o rol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone || 'N/A'}</td>
              <td>{getRoleBadge(user.role)}</td>
              <td>{user.address || 'N/A'}</td>
              <td className="text-nowrap">
                <Button variant="outline-info" size="sm" onClick={() => handleEdit(user)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => handleDeleteClick(user)}
                  className="ms-2"
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar/crear usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentUser?.id ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
                disabled={!!currentUser.id}
              />
            </Form.Group>

            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={currentUser.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="role"
                  value={currentUser.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="admin">Administrador</option>
                  <option value="tecnico">Técnico</option>
                  <option value="cliente">Cliente</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={currentUser.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">
              {currentUser?.id ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar al usuario <strong>{userToDelete?.name}</strong>?
          <br />
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersManagement;