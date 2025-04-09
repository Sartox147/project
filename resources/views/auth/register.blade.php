<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - ElectroMovil</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/auth/register/style.css') }}">
</head>
<body>
    <div class="container">
        <div class="form-box register">
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <h1>Crear Cuenta</h1>
                
                <div class="input-box">
                    <input type="text" id="name" name="name" value="{{ old('name') }}" required placeholder="Nombre completo">
                    <i class='bx bxs-user'></i>
                    @error('name')
                        <span class="error-message">{{ $message }}</span>
                    @enderror
                </div>
                
                <div class="input-box">
                    <input type="email" id="email" name="email" value="{{ old('email') }}" required placeholder="Correo electrónico">
                    <i class='bx bxs-envelope'></i>
                    @error('email')
                        <span class="error-message">{{ $message }}</span>
                    @enderror
                </div>
                
                <div class="input-box">
                    <input type="password" id="password" name="password" required placeholder="Contraseña">
                    <i class='bx bxs-lock-alt'></i>
                    @error('password')
                        <span class="error-message">{{ $message }}</span>
                    @enderror
                </div>
                
                <div class="input-box">
                    <input type="password" id="password_confirmation" name="password_confirmation" required placeholder="Confirmar contraseña">
                    <i class='bx bxs-lock-alt'></i>
                </div>
                
                <button type="submit" class="btn">Registrarse</button>
                
                <div class="social-icons">
                    <a href="#"><i class='bx bxl-facebook'></i></a>
                    <a href="#"><i class='bx bxl-twitter'></i></a>
                    <a href="#"><i class='bx bxl-google'></i></a>
                    <a href="#"><i class='bx bxl-linkedin'></i></a>
                </div>
                
                <div class="login-link">
                    <p>¿Ya tienes cuenta? <a href="{{ route('login') }}">Inicia sesión</a></p>
                </div>
            </form>
        </div>

        <div class="toggle-box">
            <div class="toggle-panel toggle-left">
                <h1>¡ELECTROMOVIL!</h1>
                <p>Ofrecemos precios justos y competitivos sin comprometer la calidad</p>
            </div>
        </div>
    </div>
</body>
</html>