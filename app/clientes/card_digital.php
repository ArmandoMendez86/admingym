
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['id']) && !empty($_POST['id'])) {
    require 'PHPMailer/PHPMailer/src/Exception.php';
    require 'PHPMailer/PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/PHPMailer/src/SMTP.php';
    $correo = $_POST['email'];
    $cuerpo = '<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .logo {
                width: 15%;
                margin: 0 auto;
            }
    
            .logo img {
                width: 100%;
                
            }
            .saludo {
                color: green;
                font-size: 2.3rem;
                font-weight: bold;
            }
    
            .gym {
                color: blue;
                font-size: 1.2rem;
                font-weight: bold;
            }
            p {
                text-align: justify;
                font-size: large;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 1.5;
            }
            .link{
                text-align:center;
            }
        </style>
    </head>
    <body>
        <div class="logo">
            <img src="https://scontent.faca1-1.fna.fbcdn.net/v/t1.6435-9/150110048_1096971094041664_469810189433869339_n.jpg?stp=c0.8.206.206a_dst-jpg_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=c21ed2&_nc_eui2=AeGmd0JJTZfEjf_Je1grhsLMZZ9tsN9Y3-hln22w31jf6K7PYkzgB_4Xu7umTJfbpaBh0_bHDYTnRNb5xIU2HwmV&_nc_ohc=-fdmk0duWlwAX9rGCme&_nc_ht=scontent.faca1-1.fna&oh=00_AfBymeljWv9CtYr44FvDy7QYBkOsAJaRNCmH6JSvmtmglw&oe=65B2E579" alt="">
        </div>
        <p>
            <span class="saludo">H</span>ola, en <span class="gym">Scorpion Sport & Gym</span> nos estamos actualizando, es
            por eso que hemos
            implementado credenciales digitales
            con el fin de prestar un mejor servicio para nuestros valiosos clientes, además de agilizar el proceso de
            ingreso
            a nuestras instalaciones, puedes mandar la foto que desees incluir a tu credencial digital, enviandola a este correo o de manera personal en recepción, cualquier duda o sugerencia,
            puedes hacerla llegar a este correo, gracias.
        </p>
        <div class="link">
            <a href="localhost/admin_plantilla/vistas/card.php?id=' . $_POST['id'] . '">Click aqui!!</a>
        </div>
    </body>
    </html>';

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Port       = '465';                                    //TCP port to connect to; use 587 if you have set
        $mail->Username   = 'gymscorpion@myadminsite.online';                     //SMTP username
        $mail->Password   = 'Linux861215#-';                               //SMTP password
        $mail->SMTPSecure = 'ssl';

        $mail->setFrom('gymscorpion@myadminsite.online', 'Scorpion Sport & Gym');
        $mail->addAddress($correo);
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Envío de credencial';
        $mail->Body    = $cuerpo;
        $mail->send();

        echo 'Credencial enviada!!';
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}






/* echo '<img src="../app/clientes/' . $rutaCredencial . ' "/>'; */
