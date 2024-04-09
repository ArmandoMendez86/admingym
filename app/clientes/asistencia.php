<?php
require '../clases/asistencia.php';

$data = $_POST;
$registrarAsistencia = new Asistencia;
$registrarAsistencia->create($data);
