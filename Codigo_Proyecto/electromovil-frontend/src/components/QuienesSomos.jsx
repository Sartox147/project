import React from 'react';
import '../assets/QuienesSomos.css';

const QuienesSomos = () => {
    return (
        <>

            <header>
                <nav >
                    <a href="/" className="logo">ElectroMovil</a>
                    <div className="nav-links">
                        <a href="/LoginRegister" className="login-btn">Iniciar Sesión</a>
                    </div>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="display-4 fw-bold mb-4">¿Quiénes Somos?</h1>
                        <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                            Somos una empresa especializada en la reparación y mantenimiento de lavadoras y neveras, comprometida
                            con brindar soluciones rápidas y confiables para que sus electrodomésticos funcionen siempre en
                            óptimas condiciones.
                        </p>
                    </div>
                </section>

                <section className="py-5 my-5">
                    <div className="container">
                        <div className="row g-4">
                            {[
                                {
                                    title: 'Misión',
                                    text: 'Proporcionar servicios técnicos especializados en la reparación y mantenimiento de lavadoras y neveras, con un enfoque en la calidad, la rapidez y la satisfacción del cliente.'
                                },
                                {
                                    title: 'Visión',
                                    text: 'Convertirnos en la empresa de referencia en servicios técnicos de electrodomésticos en el mercado local y nacional, destacándonos por nuestra innovación y profesionalismo.'
                                },
                                {
                                    title: 'Compromiso',
                                    text: 'Contamos con un equipo de técnicos altamente capacitados y con amplia experiencia en la reparación y mantenimiento de electrodomésticos.'
                                }
                            ].map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card card-custom h-100">
                                        <div className="card-body">
                                            <h3 className="card-title fw-bold text-primary">{item.title}</h3>
                                            <p className="card-text">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container py-5">
                    <div className="text-center mb-5">
                        <h1 className="">Reseñas de Clientes Satisfechos</h1>
                        <p>Lo que nuestros clientes dicen sobre nuestro servicio</p>
                    </div>

                    <div className=" row ">
                        {[
                            {
                                nombre: 'Juan Pérez',
                                servicio: 'Reparación de Nevera',
                                texto: 'La rapidez y profesionalismo del equipo fue excelente. Mi nevera quedó como nueva y el servicio fue impecable. ¡Totalmente recomendado!'
                            },
                            {
                                nombre: 'María López',
                                servicio: 'Reparación de Lavadora',
                                texto: 'Mi lavadora dejó de funcionar y en menos de 24 horas ya estaba reparada. El técnico fue muy amable y profesional. ¡100% satisfecha!'
                            },
                            {
                                nombre: 'Carlos Ramírez',
                                servicio: 'Mantenimiento de Nevera',
                                texto: 'El equipo no solo resolvió el problema rápidamente, sino que también me dio consejos para prevenir futuros daños. Un servicio que realmente se preocupa.'
                            }
                        ].map((review, idx) => (
                            <div className="col-md-4 col-lg-4" key={idx}>
                                <div className="review-card p-4 h-100 bg-white shadow-sm">
                                    <div className="rating mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <i className="fas fa-star" key={i}></i>
                                        ))}
                                    </div>
                                    <p className="fst-italic">"{review.texto}"</p>
                                    <div className="d-flex align-items-center mt-3">
                                        <div>
                                            <h5 className="customer-name mb-0">{review.nombre}</h5>
                                            <small className="text-muted">{review.servicio}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <div className="highlight-box p-4 mt-5">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <h3 className="fw-bold mb-4">¿Por qué nuestros clientes nos eligen?</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-3"><i className="fas fa-check-circle text-success me-2"></i> Reparaciones rápidas (en menos de 24 horas)</li>
                                    <li className="mb-3"><i className="fas fa-check-circle text-success me-2"></i> Técnicos certificados y con trato amable</li>
                                    <li className="mb-3"><i className="fas fa-check-circle text-success me-2"></i> Transparencia en diagnósticos y presupuestos</li>
                                    <li className="mb-3"><i className="fas fa-check-circle text-success me-2"></i> Consejos expertos para mantenimiento</li>
                                </ul>
                            </div>
                            <div className="col-md-5 text-center">
                                <div className="p-4 bg-primary text-white rounded-3">
                                    <h4 className="fw-bold">¿Necesitas ayuda?</h4>
                                    <p className="mb-4">¡Contáctanos y vive la experiencia de un servicio técnico de verdadera calidad!</p>
                                    <a href="https://wa.me/573125767402" className="btn btn-light btn-lg">Contactar ahora</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <p className="fst-italic text-muted">"Tu satisfacción es nuestra mejor publicidad"</p>
                    </div>
                </section>

                <section id="contacto" className="contacto">
                        <p className="fs-4">Llámenos al: <strong>322-325-3844</strong></p>
                        <p className="fs-4">Estamos disponibles 24/7 para atender sus necesidades</p>
                </section>
            </main>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 ElectroMovil. Todos los derechos reservados.</p>
            </footer>

        </>
    );
};

export default QuienesSomos;