<?php

require '../clases/producto.php';

$regalias = new Producto;
echo json_encode($regalias->obtenerRegalias());
