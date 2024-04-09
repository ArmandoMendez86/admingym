<?php
require '../clases/producto.php';

$data = $_POST;
$regalia = new Producto;
$regalia->createRegalia($data);

$conversion = [$data];

$regalia->actualizarAlmacen($conversion);
