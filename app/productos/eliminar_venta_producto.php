<?php
require '../clases/producto.php';

$data = $_POST;
$eliminarVentaProducto = new Producto;
$eliminarVentaProducto->eliminarVentaProducto($data['id']);
$eliminarVentaProducto->restablecerAlmacen($data);
