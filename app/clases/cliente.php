<?php
require 'model.php';


class Cliente extends Model
{
    protected $table = 'cliente';

    public function createUser($data)
    {

        $columns = array_keys($data);
        $columns = implode(', ', $columns);

        $escaped_values = array_map(function ($value) {
            return mysqli_real_escape_string($this->conection, $value);
        }, $data);

        $values = "'" . implode("', '", $escaped_values) . "'";
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$values})";
        $this->conection->query($sql);

        $ultimo = $this->conection->insert_id;
        return $ultimo;
    }

    public function updateUser($data)
    {

        // Manejar la subida de la nueva imagen si se proporciona
        if (!empty($data['imagen'])) {
            $uploadDir = '../../assets/img/team/';
            $uploadFile = $uploadDir . basename($data['imagen']['name']);
            move_uploaded_file($data['imagen']['tmp_name'], $uploadFile);
            $data['imagen'] = basename($data['imagen']['name']); // Actualizar la ruta de la imagen en los datos
        }
        if ($data['imagen'] == null) {
            unset($data['imagen']);
        }


        $columns = array_keys($data);
        $columns = implode(', ', $columns);

        $fields = [];
        $params = [];

        foreach ($data as $key => $value) {
            $fields[] = "{$key} = ?";
            $params[] = $value;
        }

        $id = $data['id'];
        $params[] = intval($id);

        $fields = implode(', ', $fields);

        $sql = "UPDATE {$this->table} SET {$fields} WHERE id = ?";
        $stmt = $this->conection->prepare($sql);

        if ($stmt) {
            $types = str_repeat('s', count($params) - 1) . 'i';
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $stmt->close();
        } else {
            error_log("Error de preparación de la consulta: " . $this->conection->error);
            return null;
        }
    }

    public function getCliente()
    {
        $sql = "SELECT * FROM {$this->table} LIMIT 9";
        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }


    public function listaClientes()
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    /* Modificado para buscar en venta_servicio */
    public function buscarXidCliente($idCliente)
    {

        $sql = "SELECT * FROM venta_servicio WHERE idcliente = ?";
        $stmt = $this->conection->prepare($sql);
        $stmt->bind_param('i', $idCliente);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function venderservicioAcliente($data)
    {
        $columns = array_keys($data);
        $columns = implode(', ', $columns);
        $escaped_values = array_map(function ($value) {
            return mysqli_real_escape_string($this->conection, $value);
        }, $data);

        $values = "'" . implode("', '", $escaped_values) . "'";

        $sql = "INSERT INTO venta_servicio ({$columns}) VALUES ({$values})";
        $this->conection->query($sql);
        return null;
    }

    /* Valido */
    public function ventaDeServicios()
    {
        $sql = "SELECT venta_servicio.id, venta_servicio.p_s AS p_s, producto.pro_serv AS servicio, cliente.nombre, cliente.ap, cliente.email, cliente.imagen, venta_servicio.idcliente, venta_servicio.fecha, venta_servicio.vence, venta_servicio.couch, venta_servicio.fperso, venta_servicio.finperso, empleado.nombre AS registro 
                FROM venta_servicio
                INNER JOIN producto ON producto.id = venta_servicio.p_s
                INNER JOIN cliente ON cliente.id = venta_servicio.idcliente
                INNER JOIN empleado ON empleado.id = venta_servicio.idempleado
                ORDER BY venta_servicio.fecha DESC LIMIT 15";

        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }


    /* Valido, modificado para buscar por nombre o apellido */
    public function buscarCliente($buscar)
    {
        $buscar = "%$buscar%";
        $sql = "SELECT venta_servicio.id, venta_servicio.p_s AS p_s, producto.pro_serv AS servicio, cliente.nombre, cliente.ap, cliente.email, cliente.imagen, venta_servicio.idcliente, venta_servicio.fecha, venta_servicio.vence, venta_servicio.couch, venta_servicio.fperso, venta_servicio.finperso, empleado.nombre AS registro 
                FROM venta_servicio
                INNER JOIN producto ON producto.id = venta_servicio.p_s
                INNER JOIN cliente ON cliente.id = venta_servicio.idcliente
                INNER JOIN empleado ON empleado.id = venta_servicio.idempleado
                WHERE cliente.nombre LIKE ? OR cliente.ap LIKE ?";

        $stmt = $this->conection->prepare($sql);
        $stmt->bind_param('ss', $buscar, $buscar); // 's' se usa dos veces porque estamos bindeando dos variables
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    /* Valido */
    public function actualizarCliente($data)
    {

        $columns = array_keys($data);
        $columns = implode(', ', $columns);

        $fields = [];
        $params = [];

        foreach ($data as $key => $value) {
            $fields[] = "{$key} = ?";
            $params[] = $value;
        }

        $id = $data['id'];
        $params[] = intval($id);

        $fields = implode(', ', $fields);

        $sql = "UPDATE venta_servicio SET {$fields} WHERE id = ?";
        $stmt = $this->conection->prepare($sql);

        if ($stmt) {
            $types = str_repeat('s', count($params) - 1) . 'i';
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $stmt->close();
        } else {
            error_log("Error de preparación de la consulta: " . $this->conection->error);
            return null;
        }
    }

    public function eliminarCliente($id)
    {

        $sql = "DELETE FROM venta_servicio WHERE id = ?";
        $stmt = $this->conection->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();
        } else {
            // Manejar el error de preparación de la consulta
            // Puedes lanzar una excepción, loguear el error, etc.
            // Ejemplo: throw new Exception($this->conection->error);
        }
    }

    public function cambiarServicio($data)
    {
        $sql = "UPDATE venta_servicio SET p_s = ?, fecha = ?, idempleado = ?, vence = ?, couch = ?, fperso= ?, finperso= ? WHERE id = ?";
        $stmt = $this->conection->prepare($sql);
        $fecha = $data['fecha'];
        $idempleado = $data['idempleado'];
        $vence = $data['vence'];
        $couch = $data['couch'];
        $fperso = $data['fperso'];
        $finperso = $data['finperso'];
        $p_s = $data['p_s'];
        $id = $data['id'];
        $stmt->bind_param('isissssi', $p_s, $fecha, $idempleado, $vence, $couch, $fperso, $finperso, $id);
        $stmt->execute();
        $stmt->close();
        return true;
    }

    public function registrarZumba($data)
    {
        // Obtener el ID del cliente del array de datos
        $cliente_id = $data['idcliente'];

        // Obtener la fecha actual
        $fecha_actual = $data['fecha']; // Formato de fecha 'YYYY-MM-DD'

        // Verificar si el cliente ya está registrado en la fecha actual
        $check_sql = "SELECT COUNT(*) as count FROM zumba WHERE idcliente = '" . mysqli_real_escape_string($this->conection, $cliente_id) . "' AND fecha = '" . mysqli_real_escape_string($this->conection, $fecha_actual) . "'";
        $result = $this->conection->query($check_sql);
        $row = $result->fetch_assoc();

        if ($row['count'] == 0) {
            // Si el cliente no está registrado en la fecha actual, proceder con la inserción
            $columns = array_keys($data);
            $columns = implode(', ', $columns);

            $escaped_values = array_map(function ($value) {
                return mysqli_real_escape_string($this->conection, $value);
            }, $data);

            $values = "'" . implode("', '", $escaped_values) . "'";
            $sql = "INSERT INTO zumba ({$columns}) VALUES ({$values})";
            $this->conection->query($sql);
            echo "Usuario registrado a la clase";
        } else {
            // Si el cliente ya está registrado en la fecha actual, manejarlo según sea necesario
            echo "El usuario ya se encuentra registrado a la clase cardio dance.";
        }
    }

    public function listarZumba()
    {
        $sql = "SELECT zumba.id, cliente.nombre, cliente.ap, zumba.precio, zumba.des, zumba.fecha FROM zumba
    INNER JOIN cliente ON cliente.id = zumba.idcliente";
        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
