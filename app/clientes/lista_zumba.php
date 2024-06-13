<?php
require '../clases/cliente.php';

$listaZumba = new Cliente;
echo json_encode($listaZumba->listarZumba());