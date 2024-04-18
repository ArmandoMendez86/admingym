<?php
require '../clases/cliente.php';

$listaClientes = new Cliente;
echo json_encode($listaClientes->listaClientes());
