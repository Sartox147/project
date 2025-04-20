import React from 'react';
import '../assets/Usuario.css';  // External CSS for styling
import { FaUser } from 'react-icons/fa';  // Importing icons from react-icons
import Calidad from '../assets/img/calidad.avif';
import Rapidez from '../assets/img/Rapidez.jpg';
import Soporte from '../assets/img/soporte.jpg';
import Garantia from '../assets/img/Garantia.webp';
import Tecnico from '../assets/img/Tecnico.jpg';
import Descuento from '../assets/img/Descuento.webp';

const Usuario = () => {
    return (
        <div>
            {/* Header */}
            <header className="header">
                <nav className="navbar">
                    <a href="#" className="logo">ElectroMovil</a>
                    <div className="nav-buttons">
                        <button onClick={() => window.location.href = '../perfil/perfil.html'} className="btn-profile">
                            <FaUser className="icon" />  Perfil
                        </button>
                        <button onClick={() => window.location.href = '../index.html'} className="btn-logout">
                            Salir
                        </button>
                    </div>
                </nav>
            </header>

            {/* Benefits Section */}
            <section className="benefits">
                <h2 className="benefits-title">Nuestros Beneficios</h2>
                <p className="benefits-description">
                    Con ElectroMovil, tienes la seguridad de un servicio confiable y garantizado. ¡Déjanos cuidar de tus electrodomésticos!
                </p>
                <div className="benefits-cards">
                    {/* Benefit Cards */}
                    {[
                        { imgSrc: Calidad, title: 'Calidad', description: 'Servicios garantizados con los mejores técnicos.' },
                        { imgSrc: Rapidez, title: 'Rapidez', description: 'Atención inmediata y eficiente a domicilio.' },
                        { imgSrc: Soporte, title: 'Soporte', description: 'Soporte continuo para cualquier consulta.' },
                        { imgSrc: Garantia, title: 'Garantía', description: 'Obtén el beneficio de garantía extendida por hasta dos años.' },
                        { imgSrc: Tecnico, title: 'Técnicos Certificados', description: 'Nuestros técnicos están certificados y capacitados para brindar un servicio de calidad.' },
                        { imgSrc: Descuento, title: 'Descuentos Exclusivos para Clientes Online', description: 'Accede a promociones y descuentos especiales solo disponibles a través de nuestra página web.' },
                    ].map((benefit, index) => (
                        <div key={index} className="card">
                            <img src={benefit.imgSrc} alt={benefit.title} className="card-img" />
                            <h3 className="card-title">{benefit.title}</h3>
                            <p className="card-description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Service Request Form */}
            <section id="solicitar-servicio" className="service-request">
                <h2 className="service-request-title">Solicitar Servicio</h2>
                <form id="servicio-form" className="service-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" id="direccion" name="direccion" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha de Visita</label>
                        <input type="date" id="fecha" name="fecha" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo-servicio">Tipo de Servicio</label>
                        <select id="tipo-servicio" name="tipo-servicio">
                            <option value="visita-nueva">Visita Nueva</option>
                            <option value="servicio-garantia">Servicio de Garantía</option>
                            <option value="cancelar-visita">Cancelar Visita</option>
                            <option value="reagendar-visita">Reagendar Visita</option>
                        </select>
                    </div>
                    <button type="button" onClick={agendarServicio} className="btn-schedule">
                        Agendar Servicio
                    </button>
                </form>
            </section>

            {/* Visit Information Section */}
            <section id="informacion-visita" className="visit-info">
                <h2 className="visit-info-title">Visita Agendada</h2>
                <div className="visit-info-details">
                    <p><strong>Nombre:</strong> <span id="info-nombre"></span></p>
                    <p><strong>Teléfono:</strong> <span id="info-telefono"></span></p>
                    <p><strong>Dirección:</strong> <span id="info-direccion"></span></p>
                    <p><strong>Fecha de Visita:</strong> <span id="info-fecha"></span></p>
                    <p><strong>Tipo de Servicio:</strong> <span id="info-tipo-servicio"></span></p>
                    <p><strong>Estado:</strong> <span style={{ color: 'green' }}>Agendada</span></p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 ElectroMovil. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

const agendarServicio = () => {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const fecha = document.getElementById("fecha").value;
    const tipoServicio = document.getElementById("tipo-servicio").value;

    if (nombre && telefono && direccion && fecha && tipoServicio) {
        alert("¡La visita ha quedado agendada con éxito!");
        document.getElementById("info-nombre").innerText = nombre;
        document.getElementById("info-telefono").innerText = telefono;
        document.getElementById("info-direccion").innerText = direccion;
        document.getElementById("info-fecha").innerText = fecha;
        document.getElementById("info-tipo-servicio").innerText = tipoServicio;
        document.getElementById("informacion-visita").style.display = "block";
        document.getElementById("servicio-form").reset();
    } else {
        alert("Por favor, completa todos los campos.");
    }
};

export default Usuario;