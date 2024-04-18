<?php
require '../clases/cliente.php';

$id = $_POST['id'];
$eliminarServicio = new Cliente;
$eliminarServicio->eliminarCliente($id);