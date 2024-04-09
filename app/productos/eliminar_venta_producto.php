<?php
require '../clases/producto.php';

$id = $_POST['id'];
$eliminarVentaProducto = new Producto;
$eliminarVentaProducto->eliminarVentaProducto($id);
