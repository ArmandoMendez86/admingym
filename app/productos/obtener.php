<?php
require '../clases/producto.php';

$productos = new Producto;
echo json_encode($productos->getAll());
