<?php

include('conexion.php');

$nombre = $_POST['NombresCliente'];
$email = $_REQUEST['CorreoCliente'];
$passwordd_user = $_REQUEST['PasswordCliente'];
$passwordd_hash = password_hash($passwordd_user, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO cliente (NombresCliente, CorreoCliente, PasswordCliente) 
                        VALUES (?, ?, ?)");

$stmt->bind_param("sss", $nombre, $email, $passwordd_hash);

if ($stmt->execute()) {
    header("Location: ../sesion.php");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
