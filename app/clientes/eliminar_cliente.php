<?php
require '../clases/cliente.php';

$id = $_POST['id'];
$eliminarCliente = new Cliente;
$eliminarCliente->delete($id);
