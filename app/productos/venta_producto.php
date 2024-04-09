<?php
require '../clases/producto.php';

$data = $_POST['datosArray'];
$venta = new Producto;
$venta->venderproductos($data);

$venta->actualizarAlmacen($data);
