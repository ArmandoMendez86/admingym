<?php
require '../clases/empleado.php';

$obtenerEmpleados = new Empleado;
echo json_encode($obtenerEmpleados->getAll());
