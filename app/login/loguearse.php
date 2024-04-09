<?php
require '../clases/login.php';

$usuario = trim($_POST['usuario']);
$password = trim($_POST['password']);

$loguearse = new Login;
$login = $loguearse->autenticar($usuario, $password);

if ($login) {
    session_start();
    $_SESSION['usuario'] = $login['nombre'];
    $_SESSION['rol'] = $login['rol'];
    $_SESSION['id'] = $login['id'];
    $_SESSION['login'] = true;

    if ($_SESSION['rol'] == 1) {
        header('Location: ../../vistas/panel.php');
    } else {
        header('Location: ../../vistas/venta.php');
    }
} else {
    header('Location: ../../index.php');
}
