<?php
require '../clases/cliente.php';
$data = $_POST;

/* echo json_encode($data);
return; */
$cambiarServicio = new Cliente;
echo json_encode($cambiarServicio->cambiarServicio($data));
