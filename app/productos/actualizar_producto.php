<?php
require '../clases/producto.php';

$data = $_POST;
$actualizarProducto = new Producto;
$actualizarProducto->update($data);
