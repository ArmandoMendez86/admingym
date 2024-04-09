<?php
require 'model.php';


class Asistencia extends Model
{
    protected $table = 'asistencia';

    public function obtenerAsistencias()
    {
        // Consulta preparada para evitar inyeccion SQL
        $sql = "SELECT cliente.nombre as cliente, cliente.ap as apellido, asistencia.fecha as asistio, empleado.nombre as registro, producto.pro_serv
        from asistencia
        INNER JOIN cliente ON asistencia.idcliente = cliente.id
        INNER JOIN empleado ON asistencia.idempleado = empleado.id
        INNER JOIN producto ON asistencia.p_s = producto.id";

        $stmt = $this->conection->prepare($sql);
        // Ejecuta la declaración preparada
        $stmt->execute();
        // Obtiene los resultados de la consulta
        $results = $stmt->get_result();
        // Devuelve los resultados
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
