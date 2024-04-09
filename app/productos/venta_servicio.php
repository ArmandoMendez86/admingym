<?php
require '../clases/producto.php';

$data = $_POST;
$venta = new Producto;
$venta->venderservicio($data);
