
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['email']) && !empty($_POST['email'])) {
    include('../../phpqrcode/qrlib.php');
    require 'PHPMailer/PHPMailer/src/Exception.php';
    require 'PHPMailer/PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/PHPMailer/src/SMTP.php';
    $codesDir = "codes/";
    //$codeFile = date('d-m-Y-h-i-s') . '.png';
    $codeFile = $_POST['email'] . '.png';
    $tamaño = 5;
    $margen = 2;
    QRcode::png($_POST['email'],  $codesDir . $codeFile, QR_ECLEVEL_L, $tamaño, $margen);

    $texto = $_POST['nombre'] . " " . $_POST['apellido'];
    $email = $_POST['email'];

    // Rutas de las imágenes
    $rutaCodigoQR =  $codesDir . $codeFile;
    $rutaPlantilla = '../../img/plantilla.png';

    // Cargar imágenes
    $codigoQR = imagecreatefrompng($rutaCodigoQR);
    $plantilla = imagecreatefrompng($rutaPlantilla);

    // Obtener dimensiones de la plantilla
    $anchoPlantilla = imagesx($plantilla);
    $altoPlantilla = imagesy($plantilla);

    // Superponer el código QR en la plantilla (en el centro)
    $xQR = ($anchoPlantilla - imagesx($codigoQR)) / 2;
    $yQR = ($altoPlantilla - imagesy($codigoQR)) / 1.3;
    imagecopy($plantilla, $codigoQR, $xQR, $yQR, 0, 0, imagesx($codigoQR), imagesy($codigoQR));



    // Configuración para el texto
    $colorTexto = imagecolorallocate($plantilla, 255, 255, 255);
    $fuente = __DIR__ . '/fonts/rubik.ttf';
    $tamañoFuente = 26;
    $angulo = 0;

    // Posición del texto en la parte inferior central
    $xTexto = ($anchoPlantilla - imagettfbbox($tamañoFuente, $angulo, $fuente, $texto)[2]) / 2;
    $yTexto = $altoPlantilla - 400;


    $colorTextoDos = imagecolorallocate($plantilla, 255, 255, 255);
    $fuenteDos = __DIR__ . '/fonts/open.ttf';
    $yTextoDos = $altoPlantilla - 124;
    $tamañoFuenteDos = 20;
    $xTextoDos = ($anchoPlantilla - imagettfbbox($tamañoFuenteDos, $angulo, $fuenteDos, $email)[2]) / 2;

    // Agregar texto a la imagen
    imagettftext($plantilla, $tamañoFuente, $angulo, $xTexto, $yTexto, $colorTexto, $fuente, $texto);
    imagettftext($plantilla, $tamañoFuenteDos, $angulo, $xTextoDos, $yTextoDos, $colorTextoDos, $fuenteDos, $email);


    // Guardar la imagen final
    $rutaCredencial = "../../img/$codeFile";
    imagepng($plantilla, $rutaCredencial);


    // Borramos la imagen PNG
    unlink($rutaCodigoQR);

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
            a nuestras instalaciones, es por ello que te hacemos llegar tu credencial digital, cualquier duda o sugerencia,
            puedes hacernosla llegar a este correo, gracias.
    
        </p>
    
    </body>
    
    </html>';

    $mail = new PHPMailer(true);
    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Port       = '465';                                    //TCP port to connect to; use 587 if you have set
        $mail->Username   = 'gymscorpion@myadminsite.online';                     //SMTP username
        $mail->Password   = 'Linux861215#-';                               //SMTP password
        $mail->SMTPSecure = 'ssl';

        // Configuración del correo
        $mail->setFrom('gymscorpion@myadminsite.online', 'Scorpion Sport & Gym');
        //$mail->addReplyTo('armando.mendez.dev@gmail.com', 'Armando linux');
        $mail->addAddress('armando.mendez.dev@gmail.com');
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Envío de credencial';
        $mail->addAttachment($rutaCredencial, 'credencial.png');
        $mail->Body    = $cuerpo;
        $mail->send();

        echo 'Credencial enviada!!';
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}






/* echo '<img src="../app/clientes/' . $rutaCredencial . ' "/>'; */
