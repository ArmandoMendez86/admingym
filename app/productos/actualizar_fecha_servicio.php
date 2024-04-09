<?php
require '../clases/producto.php';
$data = $_POST;
$actualizarFecha = new Producto;
$actualizarFecha->actualizarFechaServicio($data);
