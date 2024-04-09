<?php

require '../clases/producto.php';

$ventas = new Producto;
echo json_encode($ventas->obtenerVentasServicios());
