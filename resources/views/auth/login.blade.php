<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login ElectroMovil</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/auth/login/style.css') }}">
</head>
<body>
    <div class="container">
        <div class="form-box login">
            <form method="POST" action="{{ route('login') }}" autocomplete="off">
                @csrf
                <h1>Iniciar Sesión</h1>
                
                <div class="input-box">
                    <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus placeholder="Correo electrónico">
                    <i class='bx bxs-user'></i>
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
                
                <div class="remember-forgot">
                    <label>
                        <input type="checkbox" name="remember"> Recordarme
                    </label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}">¿Olvidaste tu contraseña?</a>
                    @endif
                </div>
                
                <button type="submit" class="btn">Iniciar</button>
                
                <div class="register-link">
                    <p>¿No tienes una cuenta? <a href="{{ route('register') }}">Regístrate</a></p>
                </div>
            </form>
        </div>

        <div class="toggle-box">
            <div class="toggle-panel">
                <h1>¡Bienvenido de vuelta!</h1>
                <p>Soluciones rápidas y confiables para sus electrodomésticos</p>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/auth/login/script.js') }}"></script>
    <script>
        @if($errors->any())
            @foreach($errors->all() as $error)
                console.error("{{ $error }}");
            @endforeach
        @endif
    </script>
</body>
</html> 