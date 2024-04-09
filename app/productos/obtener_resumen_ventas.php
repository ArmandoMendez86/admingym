<?php

require '../clases/producto.php';

$resumenVentas = new Producto;
echo json_encode($resumenVentas->resumenVentasXdia());
