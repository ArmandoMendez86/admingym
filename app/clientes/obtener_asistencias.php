<?php

require '../clases/asistencia.php';

$obtenerAsistencias = new Asistencia;
echo json_encode($obtenerAsistencias->obtenerAsistencias());
