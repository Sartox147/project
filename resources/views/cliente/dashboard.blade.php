<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ElectroMovil - Dashboard</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Styles -->
    <style>
        body {
            margin: 0; 
            padding: 0; 
            font-family: 'Poppins', sans-serif; 
            color: #333; 
            scroll-behavior: smooth; 
            background: url('{{ asset("images/marca_de_agua.png") }}') no-repeat center center fixed; 
            background-size: cover;
            padding-top: 70px; /* Para el header fijo */
        }
        
        header {
            background-color: #fff; 
            padding: 1rem 0; 
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
            position: fixed; 
            width: 100%; 
            top: 0; 
            z-index: 1000;
        }
        
        nav {
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            width: 90%; 
            margin: 0 auto;
        }
        
        .logo {
            font-size: 1.5rem; 
            font-weight: bold; 
            color: #3498db; 
            text-decoration: none;
        }
        
        .button-group {
            display: flex; 
            gap: 1rem;
        }
        
        .btn {
            color: white; 
            border: none; 
            padding: 0.5rem 1rem; 
            border-radius: 5px; 
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }
        
        .btn-primary {
            background-color: #3498db;
        }
        
        .btn-danger {
            background-color: #e74c3c;
        }
        
        .card {
            background-color: white; 
            padding: 1rem; 
            border-radius: 10px; 
            box-shadow: 0 4px 8px rgb(0, 0, 0); 
            max-width: 200px;
            margin-bottom: 1rem;
        }
        
        .card img {
            width: 100%; 
            height: auto;
        }
        
        .form-container {
            max-width: 600px; 
            margin: 2rem auto; 
            background-color: #f8f9fa; 
            padding: 2rem; 
            border-radius: 10px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            display: block; 
            font-size: 1rem; 
            margin-bottom: 0.5rem;
        }
        
        .form-control {
            width: 100%; 
            padding: 0.75rem; 
            border: 1px solid #ccc; 
            border-radius: 5px;
        }
        
        .section {
            padding: 4rem 0;
            text-align: center;
        }
        
        .section-title {
            font-size: 2rem; 
            color: #3498db;
        }
        
        .benefits-container {
            display: flex; 
            justify-content: space-around; 
            gap: 2rem; 
            margin-top: 2rem; 
            flex-wrap: wrap;
            width: 90%; 
            margin: 0 auto;
        }
        
        footer {
            background-color: #333; 
            color: white; 
            padding: 1rem 0; 
            text-align: center;
        }
    </style>
</head>

<body>
    <!-- Encabezado -->
    <header>
        <nav>
            <a href="{{ route('home.index') }}" class="logo">ElectroMovil</a>
    
            <!-- Contenedor para los botones de perfil y salir -->
            <div class="button-group">
                <!-- Botón de perfil -->
                <a href="{{ route('profile.show') }}" class="btn btn-primary">
                    <i class="fas fa-user" style="margin-right: 0.5rem;"></i>Perfil
                </a>
    
                <!-- Botón de salir -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-danger">Salir</button>
                </form>
            </div>
        </nav>
    </header>
    
    <!-- Sección de beneficios -->
    <section class="section" style="background-color: #dfdfdf77;">
        <div>
            <h2 class="section-title">Nuestros Beneficios</h2>
            <p style="font-size: 1.2rem; max-width: 600px; margin: 1rem auto;">Con ElectroMovil, tienes la seguridad de
                un servicio confiable y garantizado. ¡Déjanos cuidar de tus electrodomésticos!</p>
            <div class="benefits-container">
                <div class="card">
                    <img src="{{ asset('img/imagen1.jpg') }}" alt="Calidad">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Calidad</h3>
                    <p style="font-size: 1rem;">Servicios garantizados con los mejores técnicos.</p>
                </div>
                <div class="card">
                    <img src="{{ asset('img/Rapidez.jpg') }}" alt="Rapidez">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Rapidez</h3>
                    <p style="font-size: 1rem;">Atención inmediata y eficiente a domicilio.</p>
                </div>
                <div class="card">
                    <img src="{{ asset('img/soporte.jpg') }}" alt="Soporte">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Soporte</h3>
                    <p style="font-size: 1rem;">Soporte continuo para cualquier consulta.</p>
                </div>
                <div class="card">
                    <img src="{{ asset('img/Garantia.webp') }}" alt="Garantía">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Garantía</h3>
                    <p style="font-size: 1rem;">Obtén el beneficio de garantía extendida por hasta dos años.</p>
                </div>
                <div class="card">
                    <img src="{{ asset('img/Tecnico.jpg') }}" alt="Técnicos Certificados">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Técnicos Certificados</h3>
                    <p style="font-size: 1rem;">Nuestros técnicos están certificados y capacitados para brindar un
                        servicio de calidad.</p>
                </div>
                <div class="card">
                    <img src="{{ asset('img/Descuento.webp') }}" alt="Descuentos Exclusivos para Clientes Online">
                    <h3 style="font-size: 1.2rem; color: #3498db;">Descuentos Exclusivos</h3>
                    <p style="font-size: 1rem;">Accede a promociones y descuentos especiales solo disponibles a través
                        de nuestra página web.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Sección de solicitar servicio (Formulario) -->
    <section id="solicitar-servicio" class="section" style="background-color: #b9b9b977;">
        <h2 class="section-title">Solicitar Servicio</h2>
        <form id="servicio-form" action="{{ route('servicios.store') }}" method="POST" class="form-container">
            @csrf
            <div class="form-group">
                <label for="nombre" class="form-label">Nombre Completo</label>
                <input type="text" id="nombre" name="nombre" class="form-control" value="{{ auth()->user()->name }}" required>
            </div>
            <div class="form-group">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" id="direccion" name="direccion" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="fecha" class="form-label">Fecha de Visita</label>
                <input type="date" id="fecha" name="fecha" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="tipo-servicio" class="form-label">Tipo de Servicio</label>
                <select id="tipo-servicio" name="tipo_servicio" class="form-control">
                    <option value="visita-nueva">Visita Nueva</option>
                    <option value="servicio-garantia">Servicio de Garantía</option>
                    <option value="cancelar-visita">Cancelar Visita</option>
                    <option value="reagendar-visita">Reagendar Visita</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 1rem 2rem; border-radius: 25px; height: auto;">
                Agendar Servicio
            </button>
        </form>
    </section>

    <!-- Pie de página -->
    <footer>
        <p style="margin: 0;">&copy; {{ date('Y') }} ElectroMovil. Todos los derechos reservados.</p>
    </footer>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            // Manejar el envío del formulario con AJAX
            $('#servicio-form').on('submit', function(e) {
                e.preventDefault();
                
                $.ajax({
                    url: $(this).attr('action'),
                    method: 'POST',
                    data: $(this).serialize(),
                    success: function(response) {
                        alert('¡La visita ha quedado agendada con éxito!');
                        // Mostrar información de la visita agendada
                        $('#servicio-form')[0].reset();
                    },
                    error: function(xhr) {
                        alert('Ocurrió un error al agendar el servicio. Por favor intenta nuevamente.');
                        console.error(xhr.responseText);
                    }
                });
            });
        });
    </script>
</body>
</html>