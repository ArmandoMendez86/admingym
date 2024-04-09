<?php

require '../clases/producto.php';

$ventasAll = new Producto;
echo json_encode($ventasAll->ventasProductosAll());
