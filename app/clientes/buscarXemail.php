<?php
require '../clases/cliente.php';

$buscar = $_GET['email'];
$buscarCliente = new Cliente;
echo json_encode($buscarCliente->buscarCliente($buscar));
