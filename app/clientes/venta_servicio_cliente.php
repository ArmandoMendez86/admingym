<?php
require '../clases/cliente.php';

// Establecer la zona horaria a la Ciudad de México
date_default_timezone_set('America/Mexico_City');

// Obtener la fecha actual en el formato deseado
$fecha_actual = date('Y-m-d');

$data = $_POST;

/* echo json_encode($data);
return; */
$usuario = [
    'nombre' => $data['nombre'],
    'ap' => $data['ap'],
    'gen' => $data['gen'],
    'email' => $data['email'],
];

$cliente = new Cliente;
$id = $cliente->createUser($usuario);

$registroZumba = [
    'idcliente' => $id,
    'precio' => 25,
    'des' => 5,
    'fecha' => $fecha_actual,
];

if ($data['p_s'] == 84) {

    $cliente->registrarZumba($registroZumba);
} else {

    $servicio = [

        'p_s' => $data['p_s'],
        'cantidad' => $data['cantidad'],
        'idcliente' => $id,
        'fecha' => $data['fecha'],
        'idempleado' => $data['idempleado'],
        'vence' => $data['vence'],
        'couch' => $data['couch'],
        'fperso' => $data['fperso'],
        'finperso' => $data['finperso'],
        'descuento' => $data['descuento'],
        'tipo_venta' => $data['tipo_venta']
    ];
    $cliente->venderservicioAcliente($servicio);
}


//$data['imagen'] = $_FILES['imagen'];
