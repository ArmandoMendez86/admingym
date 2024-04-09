<?php
require '../clases/producto.php';

$data = $_POST;
$agregarProducto = new Producto;
$agregarProducto->create($data);