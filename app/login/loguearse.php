<?php
require '../clases/login.php';


header('Content-Type: application/json');

$datos = $_POST;

$usuario = trim($datos['usuario']);
$password = trim($datos['password']);

$loguearse = new Login;
$login = $loguearse->autenticar($usuario, $password);

if ($login) {
    session_start();
    $_SESSION['usuario'] = $login['nombre'];
    $_SESSION['idrol'] = $login['idrol'];
    $_SESSION['id'] = $login['id'];
    $_SESSION['login'] = true;
    echo json_encode([

        'success' => true,

    ]);
} else {
    echo json_encode(['success' => false]);
}
