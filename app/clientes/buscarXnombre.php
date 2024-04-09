<?php
require '../clases/cliente.php';

$buscar = $_GET['nombreCliente'];
$buscarCliente = new Cliente;
echo json_encode($buscarCliente->buscarCliente($buscar));
