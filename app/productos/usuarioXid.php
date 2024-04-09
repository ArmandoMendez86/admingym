<?php
require '../clases/producto.php';

$id = $_POST['id'];
$servicio = new Producto;
echo json_encode($servicio->ventaServicioXidCliente($id));
