<?php
require '../clases/producto.php';

$id = $_POST['id'];
$eliminarProducto = new Producto;
$eliminarProducto->delete($id);
