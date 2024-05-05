<?php
require '../clases/producto.php';

$data = $_POST;
$data['img'] = $_FILES['img'];
/* echo json_encode($data);
return; */
$agregarProducto = new Producto;
$agregarProducto->crearProducto($data);
