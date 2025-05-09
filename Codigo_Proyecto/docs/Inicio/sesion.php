<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login ElectroMovil</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
    rel='stylesheet'>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="../interfaz_inicio_de_sesion/style.css">
</head>
<body>
    <div class="wrapper">
        <span class="rotate-bg"></span>
        <span class="rotate-bg2"></span>

        <div class="form-box login">
            <h2 class="title animation" style="--i:0; --j:21">ElectroMovil</h2>
            <form action="../Base_De_Datos/Iniciosesion.php" method="post" autocomplete="off">

                <div class="input-box animation" style="--i:1; --j:22">
                    <input type="text" id="CorreoCliente" name="CorreoCliente" required>
                    <label for="">Usuario o Correo</label>
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box animation" style="--i:2; --j:23">
                    <input type="password" id="PasswordCliente" name="PasswordCliente" required>
                    <label for="">Clave</label>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button onclick="" type="submit" class="btn animation" style="--i:3; --j:24">Iniciar</button>
                <div class="linkTxt animation" style="--i:5; --j:25">
                    <p>No tienes una cuenta? <a href="#" class="register-link">Registrarse</a></p>
                </div> 
            </form>
        </div>

        <div class="info-text login" style="color: white;">
            <h1 class="animation" style="--i:0; --j:20 ">Bienvenido!</h1>
            <p class="animation" style="--i:1; --j:21" >Soluciones rápidas y confiables para sus electrodomésticos</p>
        </div>







        <div class="form-box register">

            <h2 class="title animation" style="--i:17; --j:0">Registro</h2>
            <form action="../Base_De_Datos/register.php" method="post"  autocomplete="off">
                <div class="input-box animation" style="--i:18; --j:1">
                    <input type="text" id="NombresCliente" name="NombresCliente" required>
                    <label>Nombres</label>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box animation" style="--i:19; --j:2">
                    <input type="email" id="CorreoCliente" name="CorreoCliente" required>
                    <label>Correo</label>
                    <i class='bx bxs-envelope'></i>
                </div>
                <div class="input-box animation" style="--i:20; --j:3">
                    <input type="password" id="PasswordCliente" name="PasswordCliente" required>
                    <label>Clave</label>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button onclick="registrook()" type="submit" class="btn animation" style="--i:21;--j:4">Registrarse</button>
                <div class="linkTxt animation" style="--i:22; --j:5">
                    <p>Ya tienes cuenta? <a href="#" class="login-link">Iniciar</a></p>
                </div>
            </form>
            <script>
                function registrook() {
                    alert("¡Te registraste correctamente!");
                }
                function errorcontraseña(){
                    alert("Contraseña incorrecta!");

                }
            </script>
            </div>
        <div class="info-text register" style="color: white;">
            <h2 class="animation" style="--i:17; --j:0;">ElectroMovil!</h2>
            <p class="animation" style="--i:18; --j:1;">Ofrecemos precios justos y competitivos sin comprometer la calidad</p>
        </div>
    </div>
    <script>
        // Obtén el botón y la alerta
        const botonIniciar = document.getElementById("iniciarBtn");
        const alerta = document.getElementById("alerta");

        // Añadir evento al botón para mostrar la alerta
        botonIniciar.addEventListener("click", function(event) {
            event.preventDefault(); // Evita que el formulario se envíe si es un formulario
            alerta.style.display = "block"; // Muestra la alerta
        });
    </script>

    <!--Script.js-->
    <script src="../interfaz_inicio_de_sesion/script.js"></script>
</body>

</html> 