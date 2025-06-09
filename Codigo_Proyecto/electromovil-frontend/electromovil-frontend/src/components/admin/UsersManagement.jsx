import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'cliente',
    phone: '',
    address: ''
  });

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

  const handleAdd = async () => {
    try {
      await api.post('/users', formData); // Ajusta según tu backend
      fetchUsers();
      setFormData({ name: '', email: '', role: 'cliente', phone: '', address: '' });
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

  const handleEdit = async (user) => {
    const updated = prompt("Editar nombre:", user.name);
    if (updated && updated !== user.name) {
      try {
        await api.put(`/users/${user.id}`, { ...user, name: updated });
        fetchUsers();
      } catch (error) {
        console.error('Error al editar usuario:', error);
      }
    }
  };

  return (
    <div className="card p-4">
      <h2>Gestión de Usuarios</h2>

      <div className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            name="name"
            className="form-control"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            name="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
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
        <div className="col-md-2">
          <input
            name="phone"
            className="form-control"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="address"
            className="form-control"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 text-end">
          <button onClick={handleAdd} className="btn btn-primary">Agregar</button>
        </div>
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay usuarios registrados.</td>
              </tr>
            ) : (
              users.map((user, index) => (
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
    </div>
  );
};

export default UsersManagement;
