(function () {
  "use strict";

  $("#ingresar").click((e) => {
    e.preventDefault();

    let usuario = $("#usuario").val();
    let password = $("#password").val();

    $.ajax({
      url: "app/login/loguearse.php",
      type: "POST",
      datatype: "json",
      data: {
        usuario: usuario,
        password: password,
      },
      success: function (response) {
        /* console.log(response) */
        if (response.success) {
          window.location.href = "index.php";
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud:", status, error);
        alert("Hubo un error en el servidor. Inténtalo de nuevo más tarde.");
      },
    });
  });
})();
