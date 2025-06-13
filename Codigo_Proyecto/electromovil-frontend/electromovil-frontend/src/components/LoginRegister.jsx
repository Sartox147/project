import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginRegister.css';
import 'boxicons/css/boxicons.min.css';
import api from '../services/api';

const LoginRegister = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    if (window.location.hash === '#register') {
      container?.classList.add('active');
    }

    registerBtn?.addEventListener('click', () => {
      container?.classList.add('active');
    });

    loginBtn?.addEventListener('click', () => {
      container?.classList.remove('active');
    });

    return () => {
      registerBtn?.removeEventListener('click', () => { });
      loginBtn?.removeEventListener('click', () => { });
    };
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await api.login(loginData);

      // Verificar estructura de respuesta
      if (!response.data) {
        throw new Error('Respuesta inesperada del servidor');
      }

      // Guardar token si existe (ajusta según tu estructura real)
      const token = response.data.token || response.data.access_token;
      if (token) {
        localStorage.setItem('auth_token', token);
      }

      // Obtener datos del usuario (usando el endpoint /me)
      const userResponse = await api.getCurrentUser();
      const user = userResponse.data;

      if (!user) {
        throw new Error('No se pudo obtener información del usuario');
      }

      // Redirigir según rol
      const redirectPath = {
        'admin': '/admin',
        'tecnico': '/tecnico',
        'cliente': '/usuario'
      }[user.role] || '/usuario';

      navigate(redirectPath);
      onLoginSuccess?.(user);

    } catch (error) {
      console.error('Error en login:', error);
      setErrors({
        general: error.response?.data?.message ||
          error.message ||
          'Error al iniciar sesión'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // 1. Registrar usuario
      const registerResponse = await api.register(registerData);

      // 2. Auto-login después de registro exitoso
      try {
        const loginResponse = await api.login({
          email: registerData.email,
          password: registerData.password
        });

        // Guardar token
        const token = loginResponse.data.token || loginResponse.data.access_token;
        if (token) {
          localStorage.setItem('auth_token', token);
        }

        // Obtener datos del usuario
        const userResponse = await api.getCurrentUser();
        const user = userResponse.data;

        setRegistrationSuccess(true);

        setTimeout(() => {
          navigate('/usuario');
          onLoginSuccess?.(user);
        }, 2000);

      } catch (loginError) {
        console.error('Error en auto-login:', loginError);
        setRegistrationSuccess(true);
        setErrors({
          info: 'Registro exitoso. Por favor inicia sesión manualmente.'
        });
        setTimeout(() => {
          navigate('/loginRegister#login');
        }, 2000);
      }

    } catch (error) {
      console.error('Error en registro:', error);
      setErrors(error.response?.data?.errors || {
        general: error.response?.data?.message ||
          error.message ||
          'Error en el registro'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="registration-success">
        <h2>¡Registro exitoso!</h2>
        <p>Serás redirigido a tu cuenta...</p>
      </div>
    );
  }

  return (
    <div className="login-register">
      <div className="container">
        {/* Formulario de Login */}
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            {errors.general && <div className="error-message">{errors.general}</div>}
            {errors.info && <div className="info-message">{errors.info}</div>}
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={loginData.email}
                onChange={handleLoginChange}
                className={errors.email ? 'error-field' : ''}
              />
              <i className='bx bxs-envelope'></i>
              {errors.email && <span className="input-error">{errors.email[0]}</span>}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                value={loginData.password}
                onChange={handleLoginChange}
                className={errors.password ? 'error-field' : ''}
              />
              <i className='bx bxs-lock-alt'></i>
              {errors.password && <span className="input-error">{errors.password[0]}</span>}
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        {/* Formulario de Registro */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Registro</h1>
            {errors.general && <div className="error-message">{errors.general}</div>}
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                required
                value={registerData.name}
                onChange={handleRegisterChange}
                className={errors.name ? 'error-field' : ''}
              />
              <i className='bx bxs-user'></i>
              {errors.name && <span className="input-error">{errors.name[0]}</span>}
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={registerData.email}
                onChange={handleRegisterChange}
                className={errors.email ? 'error-field' : ''}
              />
              <i className='bx bxs-envelope'></i>
              {errors.email && <span className="input-error">{errors.email[0]}</span>}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                value={registerData.password}
                onChange={handleRegisterChange}
                className={errors.password ? 'error-field' : ''}
              />
              <i className='bx bxs-lock-alt'></i>
              {errors.password && <span className="input-error">{errors.password[0]}</span>}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirmar contraseña"
                required
                value={registerData.password_confirmation}
                onChange={handleRegisterChange}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Registrarse'}
            </button>
          </form>
        </div>

        {/* Toggle Box */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>¡Bienvenido!</h1>
            <p>inicia sesion con:</p>
            <div class="social-icons">
              <a href="#"><i class='bx bxl-google' ></i></a>
              <a href="#"><i class='bx bxl-facebook' ></i></a>
              <a href="#"><i class='bx bxl-github' ></i></a>
              <a href="#"><i class='bx bxl-linkedin' ></i></a>
            </div>
            <p>¿No tienes una cuenta?</p>
            <button className="btn register-btn">Registrarse</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>¡Hola de nuevo!</h1>
            <p>¿Ya tienes una cuenta?</p>
            <button className="btn login-btn">Iniciar sesión</button>

            <p>o registrate con:</p>
            <div class="social-icons">
              <a href="#"><i class='bx bxl-google' ></i></a>
              <a href="#"><i class='bx bxl-facebook' ></i></a>
              <a href="#"><i class='bx bxl-github' ></i></a>
              <a href="#"><i class='bx bxl-linkedin' ></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;