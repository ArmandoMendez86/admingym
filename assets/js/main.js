/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {

  moment.locale('es-mx');

  "use strict";


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    cargarClientes();
    cargarProductos();

  });

  /* ######################## AGREGADO POR MI ######################## */

  //Cargando usuarios

  let tarjetas = document.getElementById("tarjetaClientes");
  let catalogoProductos = document.getElementById("catalogoProductos");
  let tipoMembresia = document.getElementById("tipoMembresia");

  function cargarClientes() {
    $.ajax({
      url: "app/clientes/obtener_venta_servicios.php",
      type: "GET",
      success: function (response) {
        let clientes = JSON.parse(response);
        let template = ``;
        clientes.forEach((element) => {
          let inicia = element.servicio == 'VISITA' ? 'Hoy' : moment(element.fecha).format('D MMM YY');
          let termina = element.servicio == 'VISITA' ? moment(element.vence).format('D MMM YY') : moment(element.vence).format('D MMM YY');
          let email = element.email != '' ? element.email : 'Pendiente';
          let status = '';
          let coach = element.couch != '' ? element.couch.substring(0, 2).toUpperCase() : 'N';
          let validarServicio = '';

          if (moment().isSame(moment(element.vence), 'day')) {
            status = 'warning';
            validarServicio = 'Termina hoy';
          } else if (moment().isBefore(moment(element.vence))) {
            status = 'success';
            validarServicio = 'Servicio activo';
          } else {
            status = 'danger';
            validarServicio = 'Servicio concluido';
          }

          template += `
        <div class="col-lg-4 mt-3" data-aos="zoom-in" data-aos-delay="100">
          <div class="member d-flex align-items-start">
            <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
            <div class="member-info">
              <h4>${element.nombre}</h4>
              <label>${email}</label>
              <div class="d-flex align-items-center gap-2 mt-1">
                <label>Servicio:</label>
                <label class="badge text-bg-secondary text-white servicio">${element.servicio}</label>
              </div>
              <div class="d-flex justify-content-start gap-1 mt-1">
                <label class="text-success inicia">${inicia} </label>
                <label><i class="ri-arrow-right-fill"></i></label>
                <label class="text-danger termina"> ${termina} </label>
              </div>
              <div class="social">
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Editar"><i class="ri-edit-fill btnEdit" data-info='${JSON.stringify(element)}'></i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Renovar servicio"><i class="ri-loop-left-fill btnRenovar" data-info='${JSON.stringify(element)}'></i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Eliminar usuario"><i class="ri-close-fill btnDelet" data-id='${element.id}'></i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Instructor ${element.couch}">${coach}</i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${validarServicio}" class="bg-${status}"></a>
              </div>

            </div>
          </div>
        </div>`;
        })
        tarjetas.innerHTML = template;
        /* Usar los tooltips para indicar tipo de membresia o detalles de insignias */
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      },
    });

  }

  function cargarProductos() {
    $.ajax({
      url: "app/productos/obtener.php",
      type: "GET",
      success: function (response) {
        let productos = JSON.parse(response);
        let templateProductos = ``;
        let templateServicios = `
        <option selected value="">Selecciona el servicio</option>
        `;
        productos.forEach((element) => {

          let unidad = element.unidad != null ? element.unidad : "";

          if (element.categoria != 'servicios') {
            templateProductos += `
            <div class="box-img ${element.categoria}" data-producto='${JSON.stringify(element)}'>
              <img src="assets/img/nodis.png" alt="">
              <div class="description-box">
                <p class="m-0">${element.pro_serv}</p>
                <span class="badge text-bg-danger">${unidad}</span>
              </div>
            </div>`;
          } else {

            templateServicios += `
            <option value="${element.id}">${element.pro_serv}</option>
            `;

          }
        })
        catalogoProductos.innerHTML = templateProductos;
        tipoMembresia.innerHTML = templateServicios;
      },
    });

  }

  /*  $("#membresia").click(function () {
     $.ajax({
       url: "app/clientes/obtener.php",
       type: "GET",
       success: function (response) {
         let datos = JSON.parse(response);
         let template = cargarClientes(datos);
         tarjetas.innerHTML = template;
       },
     });
   }) */

  //  Buscar clientes

  $("#btnBuscarCliente").click(function (e) {
    e.preventDefault();
    let nombreCliente = $("#nombreCliente").val();
    if (nombreCliente == '') return;
    $.ajax({
      url: "app/clientes/buscarXnombre.php",
      type: "GET",
      data: { nombreCliente },
      success: function (response) {
        let busquedaCliente = JSON.parse(response);
        if (busquedaCliente.length > 0) {
          tarjetas.innerHTML = filtrarClientes(busquedaCliente);

        } else {
          tarjetas.innerHTML = '<div class="alert alert-warning text-center" role="alert">No existen registros!</div>';
        }

      },
    });

  })

  function filtrarClientes(clientes) {
    let template = ``;
    clientes.forEach((element) => {
      let inicia = element.servicio == 'VISITA' ? '' : moment(element.fecha).format('D MMM YY');
      let termina = element.servicio == 'VISITA' ? moment(element.vence).format('D MMM YY') : moment(element.vence).format('D MMM YY');
      let email = element.email != '' ? element.email : 'Pendiente';
      let status = '';
      if (moment().isSame(moment(element.vence), 'day')) {
        status = 'warning'; // Due date is today
      } else if (moment().isBefore(moment(element.vence))) {
        status = 'success'; // Due date is in the future
      } else {
        status = 'danger'; // Due date has passed
      }
      template += `
        <div class="col-lg-4 mt-3" data-aos="zoom-in" data-aos-delay="100">
          <div class="member d-flex align-items-start">
            <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
            <div class="member-info">
              <h4>${element.nombre}</h4>
              <label>${email}</label>
              <div class="d-flex align-items-center gap-2">
                <label>Servicio:</label>
                <label class="badge text-bg-info text-white">${element.servicio}</label>
              </div>
              <div class="d-flex justify-content-start gap-2">
                <label>${inicia} </label>
                <label>-</label>
                <label>${termina} </label>
              </div>
              <div class="social">
                <a data-bs-toggle="tooltip" data-bs-title="Editar"><i class="ri-edit-fill btnEdit" data-info='${JSON.stringify(element)}'></i></a>
                <a data-bs-toggle="tooltip" data-bs-title="Renovar servicio"><i class="ri-loop-left-fill"></i></a>
                <a data-bs-toggle="tooltip" data-bs-title="Eliminar usuario"><i class="ri-close-fill"></i></a>
                <a data-bs-toggle="tooltip" data-bs-title="Estatus" class="bg-${status}"></a>
              </div>

            </div>
          </div>
        </div>`;
    })
    return template;
  }


  $(".btn-menu").click(function (e) {
    e.preventDefault();
    let filtro = $(this).attr("data-filter");

    if (filtro == "todos") {
      $(".box-img").show(500);
    } else {
      $(".box-img").not("." + filtro).hide(500);
      $(".box-img").filter("." + filtro).show(500);
    }
  });

  $(".menu label").click(function () {
    $(this).addClass("check").siblings().removeClass("check");
  });


  //Agregar productos a lista de compras
  let listaCompra = [];
  let filasProductos = {};
  let totalPrecio = 0;

  $(document).on('click', '.box-img', function () {
    $('#listaVenta').html("");

    let producto = $(this).data('producto');
    listaCompra.push(producto.id);

    let unidad = producto.unidad != null ? producto.unidad : "Servicio";
    let fila = `
      <tr>
        <td class="d-none">${producto.id}</td>
        <td>${producto.pro_serv}</td>
        <td class="text-center">${unidad}</td>
        <td class="text-center">${producto.precio}</td>
        <td class="text-center"><button type="button" class="btn btn-sm btn-outline-danger removeProduct">X</button></td>
      </tr>
      `;

    filasProductos[producto.id] = fila;

    totalPrecio += parseFloat(producto.precio);

    for (const id of listaCompra) {
      $('#listaVenta').append(filasProductos[id]);
    }

    let precioFormateado = totalPrecio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    $('#totalPrecio').text(precioFormateado);

    if (listaCompra.length > 0) {
      $('#offcanvasScrolling').offcanvas('show');
    }

  });

  //Remover productos 
  $(document).on('click', '.removeProduct', function () {
    let idProducto = parseInt($(this).closest('tr').find('td:first').text());
    let indice = listaCompra.indexOf(idProducto);
    if (indice !== -1) {
      listaCompra.splice(indice, 1);
    }

    $(this).closest('tr').remove();

    let productoEliminado = filasProductos[idProducto];
    let precioEliminado = $(productoEliminado).find('td:eq(3)').text();

    totalPrecio -= parseFloat(precioEliminado);
    let precioFormateado = totalPrecio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    $('#totalPrecio').text(precioFormateado);

    if (listaCompra.length == 0) {
      $('#offcanvasScrolling').offcanvas('hide');
    }
  });


  //Aplicar descuento

  $("#aplicarDescuento").click(function (e) {
    e.preventDefault();
    let porcentajeDescuento = $("#descuento").val();
    let factor = 1 - (parseFloat(porcentajeDescuento) / 100)

    let precioConDescuento = totalPrecio * factor;

    let precioFormateado = precioConDescuento.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    $('#totalPrecio').text(precioFormateado);
    $('#aplicarDescuento').attr('disabled', true);


  });

  //Resetar descuento
  $("#reset").click(function (e) {
    e.preventDefault();
    let precioFormateado = totalPrecio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    $('#totalPrecio').text(precioFormateado);
    $('#aplicarDescuento').attr('disabled', false);


  });

  //Hacer el cobro

  $("#cobrar").click(function (e) {
    e.preventDefault();

    $("#listaVenta").html('');
    $("#totalPrecio").text('');
    $("#descuento").val(0);
    $("#ventaRealizada").toggleClass("d-none");

    listaCompra = [];
    totalPrecio = 0;

    $('#aplicarDescuento').attr('disabled', false);

    if (listaCompra.length == 0) {

      setTimeout(() => {
        $('#offcanvasScrolling').offcanvas('hide');
        $("#ventaRealizada").toggleClass("d-none");
      }, 2500);
    }

  });


  //Registro de clientes

  /* function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-]+)\.[a-zA-Z]{2,}))$/;
    return re.test(email);
  } */


  $("#email").blur(function () {

    let email = $("#email").val();
    if (email == '') return;
    $.ajax({
      url: "app/clientes/buscarXemail.php",
      type: "GET",
      data: { email },
      success: function (response) {
        let busquedaCliente = JSON.parse(response);
        if (busquedaCliente.length > 0) {
          $("#mensaje").html(`
          <div class="alert alert-danger text-center" role="alert">
             El usuario ${email} ya existe!
          </div>
          `);
          $('#registrarCliente').attr('disabled', true);
        } else {
          $("#mensaje").html("");
          $('#registrarCliente').attr('disabled', false);
        }

      }
    });
  });

  $("#registrarCliente").click(function (e) {
    e.preventDefault();
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let email = $("#email").val();
    let gen = $("#genero").val();
    let tipoMembresia = $("#tipoMembresia").val();
    let coach = $("#coach").val();


    if (nombre == '' || apellido == '' || email == '' || gen == '' || tipoMembresia == '') return;

    const fechaActual = moment(); // Obtiene la fecha y hora actual
    const fechaActualFormateada = fechaActual.format('YYYY-MM-DD H:mm:ss');

    let vence = '';
    let fechaPersonalizado = '';
    let iniciaPersonalizadoFormat = '';
    let finPersonalizado = '';
    let finPersonalizadoFormat = '';
    //let venceFormat = vence.format('YYYY-MM-DD H:mm:ss');
    //console.log(fechaActual.format('L')); // Muestra la fecha con formato local (DD/MM/YYYY)

    /* console.log(venceFormat)
    return; */

    /*   let agregandoDias = fechaActual.add(10, 'days');
      console.log(agregandoDias.format('LL')) */

    if (tipoMembresia == 24 || tipoMembresia == 70 || tipoMembresia == 71 || tipoMembresia == 75 || tipoMembresia == 80) {
      vence = fechaActual.add(1, 'months');
    }
    if (tipoMembresia == 25 || tipoMembresia == 69) {
      vence = fechaActual;
    }
    if (tipoMembresia == 26) {
      vence = fechaActual.add(7, 'days');
    }
    if (tipoMembresia == 27) {
      vence = fechaActual.add(15, 'days');
    }
    if (coach != '') {
      fechaPersonalizado = moment();
      iniciaPersonalizadoFormat = fechaPersonalizado.format('YYYY-MM-DD H:mm:ss');
      finPersonalizado = moment().add(1, 'months');
      finPersonalizadoFormat = finPersonalizado.format('YYYY-MM-DD H:mm:ss');
    }

    let venceFormat = vence.format('YYYY-MM-DD H:mm:ss');

    $.ajax({
      url: "app/clientes/venta_servicio_cliente.php",
      type: "POST",
      datatype: "json",
      data: {
        nombre: nombre,
        ap: apellido,
        email: email,
        gen: gen,
        p_s: tipoMembresia,
        cantidad: 1,
        fecha: fechaActualFormateada,
        idempleado: 2,
        vence: venceFormat,
        couch: coach,
        fventa: fechaActualFormateada,
        fperso: iniciaPersonalizadoFormat,
        finperso: finPersonalizadoFormat
      },

      success: function (response) {
        $('#formRegistrar')[0].reset();
        $("#registroExitoso").toggleClass("d-none");
        setTimeout(() => $("#registroExitoso").toggleClass("d-none"), 1700)
      },
    });



  });

  $(document).on('click', '.btnEdit', function (e) {
    e.preventDefault();
    const memberDataString = $(this).data('info');
    console.log(memberDataString);
  });

  $(document).on('click', '.btnRenovar', function (e) {
    e.preventDefault();

    //let fechaActual = moment().format('D MMM YY');
    const renovarUsuario = $(this).data('info');


    let fechaInicia = $(this).closest(".member-info").find(".inicia");
    let fechaTermina = $(this).closest(".member-info").find(".termina");
    let tipoServicio = $(this).closest(".member-info").find(".servicio");

    let idServicio = renovarUsuario.id;
    let mandarInicio = moment().format('YYYY-MM-DD H:mm:ss');
    let mandarFin = '';

    /* console.log(idServicio)
    return */

    if (tipoServicio.text() == 'VISITA' || tipoServicio.text() == 'VISITA ESTUDIANTE') {
      fechaTermina.text(moment().format('D MMM YY'));
      mandarFin = moment().format('YYYY-MM-DD H:mm:ss');
    }
    if (tipoServicio.text() == 'SEMANA') {
      fechaInicia.text(moment().format('D MMM YY'));
      fechaTermina.text(moment().add(7, 'days').format('D MMM YY'));
      mandarFin = moment().add(7, 'days').format('YYYY-MM-DD H:mm:ss');
    }
    if (tipoServicio.text() == 'QUINCENA') {
      fechaInicia.text(moment().format('D MMM YY'));
      fechaTermina.text(moment().add(15, 'days').format('D MMM YY'));
      mandarFin = moment().add(15, 'days').format('YYYY-MM-DD H:mm:ss');
    }
    if (tipoServicio.text() == 'MES' || tipoServicio.text() == 'MES ESTUDIANTE') {
      fechaInicia.text(moment().format('D MMM YY'));
      fechaTermina.text(moment().add(1, 'M').format('D MMM YY'));
      mandarFin = moment().add(1, 'M').format('YYYY-MM-DD H:mm:ss');
    }

    $.ajax({
      url: "app/clientes/renovar_servicio.php",
      type: "POST",
      datatype: "json",
      data: {
        id: idServicio,
        fecha: mandarInicio,
        vence: mandarFin
      },

      success: function (response) {
        alertify.success("Servicio renovado.");

        console.log('renovado')
      },
    });



  });

  $(document).on('click', '.btnDelet', function (e) {
    e.preventDefault();
    const idUsuario = $(this).data('id');
    console.log(idUsuario);
  });






})()