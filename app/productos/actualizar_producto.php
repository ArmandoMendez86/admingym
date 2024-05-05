<?php
require '../clases/producto.php';

$data = $_POST;
$data['img'] = isset($_FILES['img']) ? $_FILES['img'] : null;
$actualizarProducto = new Producto;
$actualizarProducto->actualizarProducto($data);
