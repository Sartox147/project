<?php
include ("conexion.php");

// Inicializamos la variable de error
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $CorreoCliente = $_POST['CorreoCliente'];
    $passwordd = $_POST['PasswordCliente'];

    // Preparamos la consulta para obtener el hash de la contraseña
    $sql = "SELECT idcliente, CorreoCliente, PasswordCliente FROM Cliente WHERE CorreoCliente = ?";

    if ($stmt = $conn->prepare($sql)) {
    
        // Bindeamos el parámetro del correo
        $stmt->bind_param("s", $CorreoCliente);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verificamos si la contraseña ingresada coincide con el hash almacenado en la base de datos
            if (password_verify($passwordd, $row['PasswordCliente'])) {
                
                // Almacenamos los datos del usuario en la sesión
                $_SESSION['user_idcliente'] = $row['idcliente'];
                $_SESSION['CorreoCliente'] = $row['CorreoCliente'];

                // Redirigimos al usuario a la página de inicio
                header("Location: ../inicio/usuario.html");
                exit();  
            } else {
                $error_message = 'Correo o contraseña incorrectos.';
            }
        } else {
            $error_message = 'Correo o contraseña incorrectos.';
        }

        $stmt->close();
    } else {
        $error_message = 'Error al preparar la consulta.';
    }
    $conn->close();
}
?> 
<?php if ($error_message != ''): ?>
        <div class="alerta-error" id="alertaError">
            <?php echo $error_message; ?>
        </div>
    <?php endif; ?>
 