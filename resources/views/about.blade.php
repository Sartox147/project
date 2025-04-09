<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiénes Somos - ElectroMovil</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            color: #333;
            line-height: 1.6;
            padding-top: 56px; /* Para el header fijo */
        }
        
        .hero-section {
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
            padding: 8rem 0 6rem;
            text-align: center;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .card-custom {
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            height: 100%;
        }
        
        .card-custom:hover {
            transform: translateY(-10px);
        }
        
        .contact-section {
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
            text-align: center;
            padding: 6rem 0;
            clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
        
        .testimonial-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .testimonial-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .navbar-custom {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .btn-custom {
            background-color: #3498db;
            color: white;
            border-radius: 25px;
            padding: 0.5rem 1.5rem;
        }
        
        .btn-custom:hover {
            background-color: #2980b9;
            color: white;
        }
        .review-card {
            transition: transform 0.3s ease;
            border-radius: 15px;
            border-left: 5px solid #0d6efd;
        }
        .review-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .customer-name {
            color: #0d6efd;
            font-weight: 600;
        }
        .rating {
            color: #ffc107;
        }
        .highlight-box {
            background-color: #f8f9fa;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <!-- Header/Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top navbar-custom">
        <div class="container">
            <a class="navbar-brand fs-3 fw-bold text-primary" href="{{ url('/') }}">ElectroMovil</a>
            <a href="{{ route('login') }}" class="btn btn-custom ms-auto">Iniciar Sesión</a>
        </div>
    </nav>

    <!-- Contenido Principal -->
    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <h1 class="display-4 fw-bold mb-4">¿Quiénes Somos?</h1>
                <p class="lead mx-auto" style="max-width: 600px;">
                    Somos una empresa especializada en la reparación y mantenimiento de lavadoras y neveras, comprometida
                    con brindar soluciones rápidas y confiables para que sus electrodomésticos funcionen siempre en
                    óptimas condiciones.
                </p>
            </div>
        </section>

        <!-- Misión, Visión, Compromiso -->
        <section class="py-5 my-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card card-custom h-100">
                            <div class="card-body">
                                <h3 class="card-title fw-bold text-primary">Misión</h3>
                                <p class="card-text">
                                    Proporcionar servicios técnicos especializados en la reparación y mantenimiento de lavadoras
                                    y neveras, con un enfoque en la calidad, la rapidez y la satisfacción del cliente.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-custom h-100">
                            <div class="card-body">
                                <h3 class="card-title fw-bold text-primary">Visión</h3>
                                <p class="card-text">
                                    Convertirnos en la empresa de referencia en servicios técnicos de electrodomésticos en el
                                    mercado local y nacional, destacándonos por nuestra innovación y profesionalismo.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-custom h-100">
                            <div class="card-body">
                                <h3 class="card-title fw-bold text-primary">Compromiso</h3>
                                <p class="card-text">
                                    Contamos con un equipo de técnicos altamente capacitados y con amplia experiencia en la
                                    reparación y mantenimiento de electrodomésticos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Reseñas -->
        <body>
    <div class="container py-5">
        <div class="text-center mb-5">
            <h1 class="display-5 fw-bold">Reseñas de Clientes Satisfechos</h1>
            <p class="lead">Lo que nuestros clientes dicen sobre nuestro servicio</p>
        </div>

        <!-- Sección de reseñas -->
        <div class="row g-4">
            <!-- Reseña 1 -->
            <div class="col-md-6 col-lg-4">
                <div class="review-card p-4 h-100 bg-white shadow-sm">
                    <div class="rating mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="fst-italic">"La rapidez y profesionalismo del equipo fue excelente. Mi nevera quedó como nueva y el servicio fue impecable. ¡Totalmente recomendado!"</p>
                    <div class="d-flex align-items-center mt-3">
                        <div>
                            <h5 class="customer-name mb-0">Juan Pérez</h5>
                            <small class="text-muted">Reparación de Nevera</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reseña 2 -->
            <div class="col-md-6 col-lg-4">
                <div class="review-card p-4 h-100 bg-white shadow-sm">
                    <div class="rating mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="fst-italic">"Mi lavadora dejó de funcionar y en menos de 24 horas ya estaba reparada. El técnico fue muy amable y profesional. ¡100% satisfecha!"</p>
                    <div class="d-flex align-items-center mt-3">
                        <div>
                            <h5 class="customer-name mb-0">María López</h5>
                            <small class="text-muted">Reparación de Lavadora</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reseña 3 -->
            <div class="col-md-6 col-lg-4">
                <div class="review-card p-4 h-100 bg-white shadow-sm">
                    <div class="rating mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="fst-italic">"El equipo no solo resolvió el problema rápidamente, sino que también me dio consejos para prevenir futuros daños. Un servicio que realmente se preocupa."</p>
                    <div class="d-flex align-items-center mt-3">
                        <div>
                            <h5 class="customer-name mb-0">Carlos Ramírez</h5>
                            <small class="text-muted">Mantenimiento de Nevera</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Por qué elegirnos -->
        <div class="highlight-box p-4 mt-5">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h3 class="fw-bold mb-4">¿Por qué nuestros clientes nos eligen?</h3>
                    <ul class="list-unstyled">
                        <li class="mb-3"><i class="fas fa-check-circle text-success me-2"></i> Reparaciones rápidas (en menos de 24 horas)</li>
                        <li class="mb-3"><i class="fas fa-check-circle text-success me-2"></i> Técnicos certificados y con trato amable</li>
                        <li class="mb-3"><i class="fas fa-check-circle text-success me-2"></i> Transparencia en diagnósticos y presupuestos</li>
                        <li class="mb-3"><i class="fas fa-check-circle text-success me-2"></i> Consejos expertos para mantenimiento</li>
                    </ul>
                </div>
                <div class="col-md-6 text-center">
                    <div class="p-4 bg-primary text-white rounded-3">
                        <h4 class="fw-bold">¿Necesitas ayuda?</h4>
                        <p class="mb-4">¡Contáctanos y vive la experiencia de un servicio técnico de verdadera calidad!</p>
                        <a href="https://wa.me/573125767402" class="btn btn-light btn-lg">Contactar ahora</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-5">
            <p class="fst-italic text-muted">"Tu satisfacción es nuestra mejor publicidad"</p>
        </div>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

        <!-- Contacto -->
        <section class="contact-section">
            <div class="container">
                <p class="fs-4">Llámenos al: <strong>322-325-3844</strong></p>
                <p class="fs-4">Estamos disponibles 24/7 para atender sus necesidades</p>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container text-center">
            <p class="mb-0">&copy; {{ date('Y') }} ElectroMovil. Todos los derechos reservados.</p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>