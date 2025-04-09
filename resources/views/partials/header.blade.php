<header class="electro-header">
    <nav class="header-nav-container">
        <!-- Logo -->
        <a href="{{ url('/') }}" class="header-logo">ElectroMovil</a>
        
        <!-- Menú de navegación -->
        <div class="header-menu">
            <a href="#servicios" class="menu-link">Servicios</a>
            <a href="#porque-elegirnos" class="menu-link">Por qué Elegirnos</a>
            
            @guest
                <!-- Enlaces para invitados -->
                <a href="{{ route('login') }}" class="menu-link">Iniciar Sesión</a>
                <a href="{{ route('register') }}" class="register-btn">Registrarse</a>
            @else
                <!-- Enlace para usuarios autenticados -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="menu-link">Cerrar Sesión</button>
                </form>
            @endguest
        </div>
    </nav>
</header>

<style>
    /* Estilos generales */
    .electro-header {
        background: #ffffff;
        padding: 15px 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        font-family: 'Poppins', sans-serif;
    }
    
    .header-nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    /* Logo */
    .header-logo {
        color: #2b6cb0;
        font-size: 28px;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 0.5px;
    }
    
    /* Menú */
    .header-menu {
        display: flex;
        gap: 40px;
        align-items: center;
    }
    
    /* Enlaces del menú */
    .menu-link {
        color: #4a5568;
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
        transition: color 0.2s;
    }
    
    .menu-link:hover {
        color: #2b6cb0;
    }
    
    /* Botón de Registro */
    .register-btn {
        background: #2b6cb0;
        color: white;
        padding: 8px 20px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.2s;
    }
    
    .register-btn:hover {
        background: #2c5282;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .header-nav-container {
            flex-direction: column;
            gap: 15px;
        }
        
        .header-menu {
            flex-direction: column;
            gap: 15px;
            width: 100%;
        }
        
        .menu-link, .register-btn {
            width: 100%;
            text-align: center;
            padding: 10px 0;
        }
        
        .register-btn {
            margin-top: 5px;
        }
    }
</style>