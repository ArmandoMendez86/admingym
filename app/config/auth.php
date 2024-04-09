<?php


session_start();

function authFilter()
{
    if (!isset($_SESSION['login'])) {
        header('Location: ../index.php');
        exit;
    }
}
