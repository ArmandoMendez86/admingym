<?php
require '../clases/cliente.php';

$clientes = new Cliente;
echo json_encode($clientes->ventaDeServicios());