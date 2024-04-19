<?php
require '../clases/cliente.php';
$data = $_POST;
$cambiarServicio = new Cliente;
$cambiarServicio->cambiarServicio($data);