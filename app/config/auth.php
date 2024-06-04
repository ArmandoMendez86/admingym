<?php

session_start();

function authFilter()
{
    if (!isset($_SESSION['login'])) {
        header('Location:login.html');
        exit;
    }
}
