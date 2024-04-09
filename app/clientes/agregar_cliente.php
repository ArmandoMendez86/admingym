<?php
require '../clases/cliente.php';

$data = $_POST;
$data['imagen'] = $_FILES['imagen'];
$agregarCliente = new Cliente;
$agregarCliente->createUser($data);
