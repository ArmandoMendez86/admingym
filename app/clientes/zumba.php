<?php
require '../clases/cliente.php';

$data = $_POST;
$registrarClaseZumba = new Cliente;
$registrarClaseZumba->registrarZumba($data);