<?php
require '../clases/empleado.php';

$id = $_POST['id'];
$eliminarEmpleado = new Empleado;
$eliminarEmpleado->delete($id);
