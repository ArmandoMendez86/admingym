<?php
require 'model.php';

class Login extends Model
{

    protected $table = 'empleado';

    // Autenticación
    public function autenticar($username, $hashedPassword)
    {
        $sql = "SELECT * FROM {$this->table} WHERE nombre = ?";
        $stmt = $this->conection->prepare($sql);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $results = $stmt->get_result();
        if ($results->num_rows > 0) {
            $user = $results->fetch_assoc();
            $storedHashedPassword = $user['password'];
            if (password_verify($hashedPassword, $storedHashedPassword)) {
                return $user;
            }
        }
        return null;
    }

    public function exit()
    {
        session_start();
        $_SESSION = [];
        header('Location: ../../login.html');
    }
}
