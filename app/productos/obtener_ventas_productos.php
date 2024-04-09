<?php

require '../clases/producto.php';

$idempleado = $_GET['idempleado'];
$idrol = $_GET['idrol'];
$ventas = new Producto;
echo json_encode($ventas->obtenerVentasProductos($idempleado, $idrol));
