<?php
require '../clases/cliente.php';

$email = $_GET['email'];
$buscarCliente = new Cliente;
echo json_encode($buscarCliente->buscarXemail($email));
