<?php
require '../clases/producto.php';

$id = $_POST['id'];
$eliminarVentaServicio = new Producto;
$eliminarVentaServicio->eliminarVentaServicio($id);
