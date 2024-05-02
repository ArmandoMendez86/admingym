<?php
require '../clases/producto.php';

$data = $_POST['productosArray'];
$venta = new Producto;
$venta->venderproductos($data);

$venta->actualizarAlmacen($data);
