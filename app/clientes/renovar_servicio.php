<?php
require '../clases/cliente.php';

$data = $_POST;

$renovarServicio = new Cliente;
$renovarServicio->actualizarCliente($data);
