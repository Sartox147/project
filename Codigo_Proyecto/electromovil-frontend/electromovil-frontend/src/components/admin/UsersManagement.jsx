import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Modal, Button } from 'react-bootstrap';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'cliente',
    phone: '',
    address: ''
  });
  const [addUserData, setAddUserData] = useState({
    name: '',
    email: '',
    role: 'cliente',
    phone: '0',
    address: '0',
    password: '',
    password_confirmation: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser , setEditingUser ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); // Ajusta según tu ruta
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddChange = (e) => {
    setAddUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser  = async () => {
    try {
      await api.post('/register', addUserData); // Ajusta según tu backend
      fetchUsers();
      setAddUserData({ name: '', email: '', password: '', password_confirmation: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser (user);
    setFormData(user); // Cargar los datos del usuario en el formulario
    setShowEditModal(true); // Mostrar el modal
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${editingUser .id}`, formData);
      fetchUsers();
      setShowEditModal(false); // Cerrar el modal
      setFormData({ name: '', email: '', role: 'cliente', phone: '', address: '' }); // Resetear el formulario
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card p-4">
      <h2>Gestión de Usuarios</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Añadir Usuario
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay usuarios registrados.</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone || '-'}</td>
                  <td>{user.address || '-'}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <button className="btn btn-sm btn-info" onClick={() => handleEdit(user)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para añadir usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Nombre"
              value={addUserData.name}
              onChange={handleAddChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={addUserData.email}
              onChange={handleAddChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={addUserData.password}
              onChange={handleAddChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="password_confirmation"
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña"
              value={addUserData.password_confirmation}
              onChange={handleAddChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddUser }>
            Crear Usuario
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="cliente">Cliente</option>
              <option value="tecnico">Técnico</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              name="phone"
              className="form-control"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="address"
              className="form-control"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersManagement;
