<?php
require '../config/database.php';

class Model
{

    protected $db_host = DB_HOST;
    protected $db_user = DB_USER;
    protected $db_pass = DB_PASS;
    protected $db_name = DB_NAME;

    protected $conection;
    protected $table;

    public function __construct()
    {
        $this->conectionDB();
    }


    public function conectionDB()
    {
        $this->conection = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);

        if ($this->conection->connect_error) {
            die('Error de conexión' . $this->conection->connect_error);
        }
    }


    // Consultas a la base de datos
    public function getAll()
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function findById($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conection->prepare($sql);
        // Bind the id parameter to the query
        $stmt->bind_param('i', $id);
        // Ejecuta la declaración preparada
        $stmt->execute();
        // Obtiene los resultados de la consulta
        $results = $stmt->get_result();
        // Devuelve los resultados
        return $results->fetch_all(MYSQLI_ASSOC);
    }

    public function create($data)
    {
        if (isset($data['password'])) {
            $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
            $data['password'] = $hashed_password;
        }
        $columns = array_keys($data);
        $columns = implode(', ', $columns);
        $escaped_values = array_map(function ($value) {
            return mysqli_real_escape_string($this->conection, $value);
        }, $data);
        $values = "'" . implode("', '", $escaped_values) . "'";
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$values})";
        $this->conection->query($sql);
        $ultimo = $this->conection->insert_id;
        return $this->findById($ultimo);
    }


    public function update($data)
    {
        // Asegúrate de que el array de datos contenga la clave 'password'
        if (isset($data['password'])) {
            // Hashea la contraseña utilizando password_hash
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        $fields = [];
        $params = [];

        // Separar el id del resto de los campos
        $id = $data['id'];
        unset($data['id']);

        foreach ($data as $key => $value) {
            $fields[] = "{$key} = ?";
            $params[] = $value;
        }

        $params[] = intval($id); // Añadir el id al final del array de parámetros

        $fields = implode(', ', $fields);

        $sql = "UPDATE {$this->table} SET {$fields} WHERE id = ?";
        $stmt = $this->conection->prepare($sql);

        if ($stmt) {
            // Enlaza los parámetros
            $types = str_repeat('s', count($params) - 1) . 'i'; // 'i' representa un entero (integer)
            $stmt->bind_param($types, ...$params);

            // Ejecuta la consulta preparada
            $stmt->execute();

            // Cierra la consulta preparada
            $stmt->close();

            // Devuelve el ID actualizado o lo que necesites
            return $id;
        } else {
            // Maneja el error de preparación de la consulta
            error_log("Error de preparación de la consulta: " . $this->conection->error);
            return null;
        }
    }



    public function delete($id)
    {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
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

    public function numeroPersonas()
    {
        // Consulta preparada para evitar inyeccion SQL
        $sql = "SELECT COUNT(*) AS total
        FROM {$this->table}";
        $stmt = $this->conection->prepare($sql);
        // Ejecuta la declaración preparada
        $stmt->execute();
        // Obtiene los resultados de la consulta
        $results = $stmt->get_result();
        // Devuelve los resultados
        return $results->fetch_assoc()['total'];
    }
}
