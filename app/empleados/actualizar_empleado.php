<?php
require '../clases/empleado.php';

$data = $_POST;
$actualizarEmpleado = new Empleado;
$actualizarEmpleado->update($data);
