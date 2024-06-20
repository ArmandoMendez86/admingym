<?php
require 'app/config/auth.php';
authFilter();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />

  <title>Administración gimnasio</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <!-- Favicons -->
  <link href="assets/img/logo.jpg" rel="icon" />
  <!-- <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon"> -->

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

  <!-- Template Main CSS File -->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/css/selectize.min.css" />
  <link rel="stylesheet" href="assets/css/themes/alertify.core.css" />
  <link rel="stylesheet" href="assets/css/themes/alertify.default.css" id="toggleCSS" />
  <link rel="stylesheet" href="https://cdn.datatables.net/2.0.6/css/dataTables.bootstrap5.min.css" />
  <link href="assets/css/style.css" rel="stylesheet" />
</head>

<body>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">
      <div class="logo me-auto">
        <!--   <a href="index.html">
          <img src="assets/img/log.png" alt="">
        </a> -->

      </div>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <span class="badge rounded-pill text-bg-danger"><?php echo $_SESSION['usuario']; ?></span>
            <span hidden class="badge rounded-pill text-bg-danger" id="idrol"> <?php echo $_SESSION['id']; ?> </span>
          </li>
          <li>
            <a class="nav-link scrollto" href="#portfolio" id="venta">Venta</a>
          </li>
          <!-- <li><a class="nav-link scrollto" href="#team">Team</a></li> -->
          <li class="dropdown">
            <a href="#"><span>Clientes</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li>
                <a class="nav-link scrollto" href="#team">Membresías</a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#contact">Registro</a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#zumba">Cardio-dance</a>
              </li>
              <!--  <li>
                <a class="nav-link scrollto" href="#">Asistencia</a>
              </li> -->
            </ul>
          </li>

          <?php if ($_SESSION['idrol'] == 1) : ?>
            <li class="dropdown">
              <a href="#"><span>Administración</span> <i class="bi bi-chevron-down"></i></a>
              <ul>
                <li>
                  <a class="nav-link scrollto" href="#productos">Productos</a>
                </li>
                <li>
                  <a class="nav-link scrollto" href="#tabClientes">Clientes</a>
                </li>
                <li>
                  <a class="nav-link scrollto" href="#tabEmpleados">Empleados</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#"><span>Caja</span> <i class="bi bi-chevron-down"></i></a>
              <ul>
                <li>
                  <a class="nav-link scrollto" href="#cancelacionVenta">Cancelación venta</a>
                </li>
                <li>
                  <a class="nav-link scrollto" href="#caja">Corte de caja</a>
                </li>
              </ul>
            </li>
          <?php endif ?>
          <li><a class="getstarted scrollto" href="app/login/cerrar_sesion.php">Salir</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- End Header -->

  <main id="main">


    <!-- ======= Services Section ======= -->
    <!-- <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <div id="sumaTotal" class="mt-5"></div>
        </div>

        <div class="w-100 mx-auto">
          <canvas id="myChart" width="500" height="170"></canvas>
        </div>
      </div>
    </section> -->
    <!-- End Services Section -->

    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio mt-5">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Punto de venta</h2>
          <p>Filtra los productos por categorìa.</p>
        </div>

        <div class="container">
          <div class="menu d-flex justify-content-center align-items-center">
            <label class="badge text-bg-light todos check"><span class="btn-menu p-3" data-filter="todos">Todos</span></label>
            <label class="badge text-bg-light"><span class="btn-menu p-3" data-filter="suplementos">Suplementos</span></label>
            <label class="badge text-bg-light"><span class="btn-menu p-3" data-filter="accesorios">Accesorios</span></label>
            <label class="badge text-bg-light"><span class="btn-menu p-3" data-filter="dulces">Dulces</span></label>
            <label class="badge text-bg-light"><span class="btn-menu p-3" data-filter="bebidas">Bebidas</span></label>
          </div>
          <div class="galeria">
            <div id="catalogoProductos" class="d-flex flex-wrap justify-content-center"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Portfolio Section -->

    <!-- Lista de compras -->

    <div class="d-flex justify-content-end overflow-auto">
      <div class="offcanvas offcanvas text-bg-dark mh-100" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            Lista de venta
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="offcanvas-body">
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <div class="input-group input-group-sm w-50">
              <input type="number" min="1" class="form-control fs-5 text-center text-danger" aria-label="Descuento" value="0" id="descuento" />
              <span class="input-group-text">%</span>
            </div>
            <button class="btn btn-sm btn-info" id="reset">Resetear</button>
            <button class="btn btn-sm btn-danger" id="aplicarDescuento">
              Aplicar
            </button>
          </div>
          <div class="form-group col-md-6 mx-auto mb-3 text-center">
            <label for="tipoVenta">Tipo de venta</label>
            <select class="form-control" style="width: 100%" id="tipoVenta" required>
              <option selected value="publico">Venta al publico</option>
              <option value="regalia">Regalía</option>
            </select>
          </div>
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col" class="d-none">Id</th>
                <th scope="col">Producto</th>
                <th class="text-center" scope="col">Unidad</th>
                <th class="text-center" scope="col">Precio</th>
                <th class="text-center" scope="col">Acción</th>
              </tr>
            </thead>
            <tbody id="listaVenta"></tbody>
            <tfoot>
              <td colspan="2" class="text-end">Total</td>
              <td id="totalPrecio">$0.00</td>
              <td></td>
            </tfoot>
          </table>
          <div class="btnCobrar text-center">
            <button class="btn btn-sm btn-success" id="cobrar">Cobrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de compras finaliza-->

    <!-- Buscador de clientes -->
    <section id="team" class="team section-bg tarjetasClientes">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Membresías</h2>
          <form class="row g-3 justify-content-center">
            <div class="col-auto">
              <label for="staticEmail2" class="visually-hidden">Cliente</label>
              <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Nombre de cliente" />
            </div>
            <div class="col-auto">
              <label for="buscarCliente" class="visually-hidden">Nombre de cliente</label>
              <input type="text" class="form-control" id="nombreCliente" placeholder="Ingresa tu busqueda!" />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3" id="btnBuscarCliente">
                Buscar
              </button>
            </div>
          </form>
        </div>

        <!-- Tarjetas de clientes -->
        <div class="row" id="tarjetaClientes"></div>
      </div>
    </section>


    <!-- ======= Registro de nueva membresía ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Nueva membresía</h2>
          <p>
            Ingresa los datos requeridos para dar de alta a un nuevo cliente,
            todos los datos son obligatorios.
          </p>
        </div>

        <div class="row">
          <div class="col-lg-6 mt-5 mt-lg-0 d-flex align-items-stretch m-auto" style="position: relative">
            <form action="#" method="post" role="form" class="php-email-form" id="formRegistrar">
              <div class="row align-items-center">
                <div class="form-group col-md-6">
                  <label for="name">Nombre</label>
                  <select id="nombre" required></select>
                  <!-- <input type="text" name="name" class="form-control" id="nombre" required> -->
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Nick</label>
                  <input type="text" class="form-control" name="apellido" id="apellido" required />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="name">Correo</label>
                  <input type="email" class="form-control" name="email" id="emailCliente" required />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Sexo</label>
                  <select class="form-control" style="width: 100%" id="genero" required>
                    <option selected value="">Tipo de sexo</option>
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="name">Personalizado</label>
                  <select class="form-control serviciosCoach" style="width: 100%" id="coach" required>
                    <option selected value="">Elige coach</option>
                    <option value="">Ninguno</option>
                    <option value="armando">Armando</option>
                    <option value="grecia">Grecia</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Membresía</label>
                  <select class="form-control serviciosSelect" style="width: 100%" id="tipoMembresia" required></select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="">Descuento</label>
                  <div class="d-flex">
                    <input type="number" class="form-control text-danger text-center fs-5" value="0" aria-label="Descuento" id="descuentoCliente" placeholder="Descuento">
                    <span class="input-group-text text-danger">%</span>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="tipoVentaServicio">Tipo de venta</label>
                  <select class="form-control" style="width: 100%" id="tipoVentaServicio" required>
                    <option selected value="publico">Venta al publico</option>
                    <option value="regalia">Regalía</option>
                  </select>
                </div>
              </div>

              <!--  <div class="my-3">
                <div id="mensaje"></div>
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div> -->
              <div class="text-center">
                <button type="submit" id="registrarCliente">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>



    <!-- ======= Administración ======= -->

    <?php if ($_SESSION['idrol'] == 1) : ?>
      <section id="productos" class="pricing">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2 class="mb-0">Productos y Servicios</h2>
            <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
          </div>

          <!--  <div class="btn_nuevo text-center">
          <i id="abrirModal" class="bi bi-bag-plus fs-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
        </div> -->

          <div class="text-center">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="abrirModal">
              <i class="bi bi-bag-plus-fill fs-5"></i>
            </button>
          </div>
          <div class="table-responsive">
            <table id="productosCat" class="table table-sm table-hover display align-middle" style="width: 100%">
              <thead class="text-uppercase">
                <tr>
                  <th>Id</th>
                  <th>Codigo</th>
                  <th style="width: 180px;">Imagen</th>
                  <th>Producto</th>
                  <th style="width: 250px;">Descripción</th>
                  <th>Unidad</th>
                  <th>Compra</th>
                  <th>Venta</th>
                  <th>Almacén</th>
                  <th>Categoria</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    <?php endif ?>


    <!-- Modal de productos -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Producto
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formProductos">
              <div class="row mb-3">
                <label for="codigo" class="col-sm-3 col-form-label">Codigo</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="codigo" placeholder="Codigo" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="producto" class="col-sm-3 col-form-label">Producto</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="producto" placeholder="Producto" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="des" class="col-sm-3 col-form-label">Descripción</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="des" placeholder="Descripción del producto" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="unidad" class="col-sm-3 col-form-label">Unidad</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="unidad" placeholder="pza, lt, ml" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="compra" class="col-sm-3 col-form-label">Compra</label>
                <div class="col-sm-9">
                  <input type="number" class="form-control" id="compra" placeholder="Precio de compra" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="precio" class="col-sm-3 col-form-label">Venta</label>
                <div class="col-sm-9">
                  <input type="number" class="form-control" id="precio" placeholder="Precio de venta" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="cantidad" class="col-sm-3 col-form-label">Cantidad</label>
                <div class="col-sm-9">
                  <input type="number" class="form-control" id="cantidad" placeholder="cantidad en almacén" min="1" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="categoria" class="col-sm-3 col-form-label">Categoria</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="categoria" placeholder="Suplementos, Accesorios, Bebidas" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="imagen" class="col-sm-3 col-form-label">Imagen</label>
                <div class="col-sm-9">
                  <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*" />
                  <div class="text-center mt-2 w-50">
                    <img src="" alt="Imagen del cliente" class="imagen-cliente" width="100%" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelar">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" id="agregarProducto">
              Guardar
            </button>
            <button type="button" class="btn btn-info" id="actualizarProducto">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= Clientes  ======= -->
    <?php if ($_SESSION['idrol'] == 1) : ?>
      <section id="tabClientes" class="pricing">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2 class="mb-0">Clientes</h2>
            <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
          </div>
          <div class="table-responsive">
            <table id="clientes" class="table table-sm table-hover display align-middle" style="width: 100%">
              <thead class="text-uppercase">
                <tr>
                  <th>Id</th>
                  <th style="width: 150px;">Nombre</th>
                  <th>Apellido</th>
                  <th>Sexo</th>
                  <th>Correo</th>
                  <th>Foto</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    <?php endif ?>

    <!-- Modal clientes -->
    <div class="modal fade" id="staticBackdropCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Agregar Cliente
            </h5>
          </div>
          <div class="modal-body">
            <form id="formClientes" enctype="multipart/form-data">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nameClient" placeholder="Nombre" />
              </div>
              <div class="form-group">
                <label for="paterno">Apellido</label>
                <input type="text" class="form-control" id="ap" placeholder="Apellido paterno" />
              </div>
              <div class="form-group">
                <label for="sexo">Sexo</label>
                <!-- <input type="text" class="form-control" id="ap" placeholder="Apellido paterno"> -->
                <select name="sexo" id="sexo" class="form-control">
                  <option value="H">HOMBRE</option>
                  <option value="M">MUJER</option>
                </select>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="imagen">Foto</label>
                <div class="d-flex align-items-center">
                  <input type="file" class="form-control-file" id="imagen-cliente" accept="image/*" name="imagen" />
                  <div class="text-center mt-2 w-25">
                    <img src="" alt="Imagen del cliente" class="imagen-cliente rounded-circle" width="100%" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelarCliente">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" id="agregarCliente">
              Guardar
            </button>
            <button type="button" class="btn btn-info" id="actualizarCliente">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======= Empleados ======= -->
    <?php if ($_SESSION['idrol'] == 1) : ?>
      <section id="tabEmpleados" class="pricing">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2 class="mb-0">Empleados</h2>
            <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropEmpleado" id="abrirModalEmpleado">
              <i class="bi bi-person-add fs-5"></i>
            </button>
          </div>
          <div class="table-responsive">
            <table id="empleados" class="table table-sm table-hover display align-middle" style="width: 100%">
              <thead class="text-uppercase">
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Rol</th>
                  <th>Contraseña</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    <?php endif ?>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdropEmpleado" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Alta de empleado</h5>
          </div>
          <div class="modal-body">
            <form id="formEmpleados">
              <div class="form-group">
                <label for="nombreEmpleado">Nombre</label>
                <input type="text" class="form-control" id="nombreEmpleado" placeholder="Nombre">
              </div>
              <div class="form-group">
                <label for="apEmpleado">Apellidos</label>
                <input type="text" class="form-control" id="apEmpleado" placeholder="Apellido paterno">
              </div>
              <div class="form-group">
                <label for="pass">Contraseña</label>
                <input type="password" class="form-control" id="pass" placeholder="Contraseña">
              </div>
              <div class="form-group">
                <label for="rol">Rol</label>
                <select class="form-control" id="rol">
                  <option value="1">Aministrador</option>
                  <option value="2">Recepción</option>
                  <option value="3">Instructor</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelarEmpleado">Cancelar</button>
            <button type="button" class="btn btn-primary" id="agregarEmpleado">Guardar</button>
            <button type="button" class="btn btn-info" id="actualizarEmpleado">Actualizar</button>
          </div>
        </div>
      </div>
    </div>


    <!-- ======= Cancelación de venta de productos ======= -->
    <?php if ($_SESSION['idrol'] == 1) : ?>
      <section id="cancelacionVenta" class="pricing">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2 class="mb-0">Cancelación de venta</h2>
            <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
          </div>
          <!--   <div class="text-center">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropEmpleado"
            id="abrirModalEmpleado">
            <i class="bi bi-person-add fs-2"></i>
          </button>
        </div> -->
          <div class="table-responsive">
            <table id="cancelacionVentaProducto" class="table table-sm table-hover display align-middle" style="width: 100%;">
              <thead>
                <tr>
                  <th>id</th>
                  <th>p_s</th>
                  <th style="width: 180px;">Imagen</th>
                  <th style="width: 250px;">Producto</th>
                  <th>Unidad</th>
                  <th>Precio</th>
                  <th>Descuento</th>
                  <th>Cantidad</th>
                  <th>Vendió</th>
                  <th>Subtotal</th>
                  <th>Fecha</th>
                  <th>Venta</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

          </div>
        </div>
      </section>
    <?php endif ?>
    <!-- ======= Corte de caja ======= -->
    <?php if ($_SESSION['idrol'] == 1) : ?>
      <section id="caja" class="pricing">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2 class="mb-0">Corte de caja</h2>
            <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
          </div>
          <!--   <div class="text-center">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropEmpleado"
            id="abrirModalEmpleado">
            <i class="bi bi-person-add fs-2"></i>
          </button>
        </div> -->
          <div class="table-responsive">
            <table id="resumenVentasXdia" class="table table-sm table-hover display align-middle" style="width: 100%;">
              <thead class="text-uppercase">
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Unidad</th>
                  <th>Compra</th>
                  <th>Precio</th>
                  <th>Des(%)</th>
                  <th>Vendidos</th>
                  <th>Monto</th>
                  <th>Ganancia</th>
                  <th>Fecha</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Venta</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th style="font-size:1rem !important;"></th>
                  <th style="color: #fff;border:2px solid #fff;background-color:#34495E;"></th>
                  <th style="color: #fff;border:2px solid #fff;background-color:#17A589;"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    <?php endif ?>

    <!-- ======= Clases de zumba  ======= -->

    <section id="zumba" class="pricing">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2 class="mb-0">Cardio Dance</h2>
          <!--  <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
            consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
            in iste officiis commodi quidem hic quas.</p> -->
        </div>
        <div class="table-responsive">
          <table id="tabZumba" class="table table-sm table-hover display align-middle" style="width: 100%">
            <thead class="text-uppercase">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Precio</th>
                <th>Comisión</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th style="text-align: right;"></th>
                <th style="color: #fff;border:2px solid #fff;background-color:#34495E;"></th>
                <th style="color: #fff;border:2px solid #fff;background-color:#17A589;"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>



  </main>

  <!-- ======= Footer ======= -->
  <!-- <footer id="footer">
    <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <h4>Join Our Newsletter</h4>
            <p>
              Tamen quem nulla quae legam multos aute sint culpa legam noster
              magna
            </p>
            <form action="" method="post">
              <input type="email" name="email" /><input type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 footer-contact">
            <h3>Arsha</h3>
            <p>
              A108 Adam Street <br />
              New York, NY 535022<br />
              United States <br /><br />
              <strong>Phone:</strong> +1 5589 55488 55<br />
              <strong>Email:</strong> info@example.com<br />
            </p>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i class="bx bx-chevron-right"></i> <a href="#">Home</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i> <a href="#">About us</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i> <a href="#">Services</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <i class="bx bx-chevron-right"></i> <a href="#">Web Design</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i>
                <a href="#">Web Development</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i>
                <a href="#">Product Management</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i> <a href="#">Marketing</a>
              </li>
              <li>
                <i class="bx bx-chevron-right"></i>
                <a href="#">Graphic Design</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Social Networks</h4>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra videa magna
              derita valies
            </p>
            <div class="social-links mt-3">
              <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
              <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
              <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
              <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
              <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container footer-bottom clearfix">
      <div class="copyright">
        &copy; Copyright <strong><span>Arsha</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer> -->
  <!-- End Footer -->

  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/jquery-3.7.1.min.js"></script>
  <script src="assets/js/lib/alertify.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/js/standalone/selectize.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.datatables.net/2.0.6/js/dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/2.0.6/js/dataTables.bootstrap5.min.js"></script>
  <script src="assets/js/main.js"></script>
</body>

</html>