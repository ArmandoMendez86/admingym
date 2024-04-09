<?php
require '../clases/cliente.php';

$data = $_POST;
$data['imagen'] = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;
$actualizarCliente = new Cliente;
$actualizarCliente->updateUser($data);
