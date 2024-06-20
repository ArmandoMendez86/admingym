<?php
require '../clases/cliente.php';

$idCliente = $_GET['idCliente'];
$buscarCliente = new Cliente;
echo json_encode($buscarCliente->buscarXidCliente($idCliente));
