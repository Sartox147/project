@extends('layouts.app')

@section('title', 'ElectroMovil - Inicio')

@section('content')
<section class="hero">
    <div class="container">
        <h1>Expertos en Reparación de Lavadoras y Neveras</h1>
        <p>Soluciones rápidas y confiables para sus electrodomésticos. Servicio profesional garantizado las 24 horas.</p>
        @guest
            <a href="{{ route('register') }}" class="btn">Solicitar Servicio</a>
        @else
            <a href="{{ route('cliente.servicios.create') }}" class="btn">Solicitar Servicio</a>
        @endguest
        <a href="{{ route('about') }}" class="btn btn-outline">Más Información</a>
    </div>
</section>

<section id="servicios" class="servicios">
    <div class="container">
        <h2>Nuestros Servicios</h2>
        <div class="servicios-grid">
            <div class="servicio-card">
                <h3>Reparación de Lavadoras</h3>
                <img src="{{ asset('img/imagen1.jpg') }}" alt="Reparación de Lavadoras">
                <p>Reparaciones rápidas y efectivas para todos los modelos de lavadoras.</p>
            </div>
            <div class="servicio-card">
                <h3>Reparación de Neveras</h3>
                <img src="{{ asset('img/imagen2.webp') }}" alt="Reparación de Neveras">
                <p>Servicio especializado en la reparación de neveras y congeladores.</p>
            </div>
            <div class="servicio-card">
                <h3>Mantenimiento Preventivo</h3>
                <img src="{{ asset('img/imagen3.jpg') }}" alt="Mantenimiento Preventivo">
                <p>Servicio de mantenimiento preventivo para asegurar el buen funcionamiento.</p>
            </div>
        </div>
    </div>
</section>

<section id="porque-elegirnos" class="porque-elegirnos">
    <div class="container">
        <h2>¿Por qué Elegirnos?</h2>
        <div class="razones-grid">
            <div class="razon-card">
                <i class="fas fa-clock"></i>
                <h3>Servicio Rápido</h3>
                <p>Atención inmediata y soluciones efectivas en el menor tiempo posible.</p>
            </div>
            <div class="razon-card">
                <i class="fas fa-thumbs-up"></i>
                <h3>Calidad Garantizada</h3>
                <p>Servicios realizados por técnicos capacitados y con experiencia.</p>
            </div>
            <div class="razon-card">
                <i class="fas fa-money-bill-wave"></i>
                <h3>Precios Competitivos</h3>
                <p>Ofrecemos precios justos y competitivos sin comprometer la calidad.</p>
            </div>
        </div>
    </div>
</section>

<section id="contacto" class="py-5 bg-light">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
                <h2 class="fw-bold mb-4">Contacto</h2>
                <p class="lead mb-5">¿Tienes alguna pregunta o necesitas asistencia? Contáctanos y te ayudaremos con gusto.</p>
                
                <div class="row g-4 mb-5">
                    <!-- Email -->
                    <div class="col-md-6">
                        <div class="d-flex align-items-center justify-content-center">
                            <i class="bi bi-envelope-fill fs-3 text-primary me-3"></i>
                            <div>
                                <h5 class="mb-0">Email</h5>
                                <a href="mailto:contacto@electromovil.com" class="text-decoration-none">admin@electromovil.com</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Teléfono -->
                    <div class="col-md-6">
                        <div class="d-flex align-items-center justify-content-center">
                            <i class="bi bi-telephone-fill fs-3 text-primary me-3"></i>
                            <div>
                                <h5 class="mb-0">Teléfono</h5>
                                <a href="tel:+573223253844" class="text-decoration-none">+57 322 3253844</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Redes Sociales -->
                <div class="social-icons">
                    <h5 class="mb-4">Síguenos en redes sociales</h5>
                    <div class="d-flex justify-content-center gap-4">
                        <!-- WhatsApp -->
                        <a href="https://wa.me/573125767402" target="_blank" class="social-icon whatsapp">
                            <i class="bi bi-whatsapp fs-2"></i>
                        </a>
                        
                        <!-- Facebook -->
                        <a href="https://facebook.com/electromovil" target="_blank" class="social-icon facebook">
                            <i class="bi bi-facebook fs-2"></i>
                        </a>
                        
                        <!-- Instagram -->
                        <a href="https://instagram.com/electromovil" target="_blank" class="social-icon instagram">
                            <i class="bi bi-instagram fs-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection