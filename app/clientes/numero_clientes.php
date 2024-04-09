<?php
require '../clases/cliente.php';
$numoClientes = new Cliente;
echo $numoClientes->numeroPersonas();
