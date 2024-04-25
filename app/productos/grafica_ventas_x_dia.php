<?php
require '../clases/producto.php';

$graficaVentasXdia = new Producto;
echo json_encode($graficaVentasXdia->ventasXdiaGrafica());
