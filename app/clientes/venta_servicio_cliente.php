<?php
require '../clases/cliente.php';

$data = $_POST;
//$data['imagen'] = $_FILES['imagen'];
$usuario = [
    'nombre' => $data['nombre'],
    'ap' => $data['ap'],
    'gen' => $data['gen'],
    'email' => $data['email'],
];

$cliente = new Cliente;
$id = $cliente->createUser($usuario);

$servicio = [

    'p_s' => $data['p_s'],
    'cantidad' => $data['cantidad'],
    'idcliente' => $id,
    'fecha' => $data['fecha'],
    'idempleado' => $data['idempleado'],
    'vence' => $data['vence'],
    'couch' => $data['couch'],
    'fventa' => $data['fventa'],
    'fperso' => $data['fperso'],
    'finperso' => $data['finperso'],
];

$cliente->venderservicioAcliente($servicio);
