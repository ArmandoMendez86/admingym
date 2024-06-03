<?php

require 'model.php';

class Empleado extends Model


{

    protected $table = 'empleado';

    public function listaEmpleados()
    {
        $sql = "SELECT empleado.id, nombre, ap, rol.role, empleado.password FROM empleado
        INNER JOIN rol ON rol.id = empleado.idrol";
        $stmt = $this->conection->prepare($sql);
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_all(MYSQLI_ASSOC);
    }
}
