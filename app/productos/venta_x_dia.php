<?php
require '../clases/producto.php';

$ventasXdia = new Producto;
$ventasProductos = $ventasXdia->totalVentasXdiaProductos();
$ventasServicios = $ventasXdia->totalVentasXdiaServicios();
$ventas = [
    'productos' => $ventasProductos,
    'servicios' => $ventasServicios,
];

echo json_encode($ventas);
