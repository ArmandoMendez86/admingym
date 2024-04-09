<?php
require '../clases/empleado.php';

$data = $_POST;
$agregarEmpleado = new Empleado;
$agregarEmpleado->create($data);
