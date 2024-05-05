/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {

  "use strict";

  moment.locale('es-mx');


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

    cargarListaClientes();
    cargarVentaServicios();
    cargarGrafica();
    //realizarLlamadas();

  });

  /* ######################## AGREGADO POR MI ######################## */


  async function realizarLlamadas() {
    try {
      // Lista de productos
      const productos = await fetch('app/productos/obtener.php');
      if (!productos.ok) {
        throw new Error('Error en la primera llamada AJAX');
      }
      const listaProductos = await productos.json();
      console.log(listaProductos);

      // Lista clientes
      const clientes = await fetch('app/clientes/obtener.php');
      if (!clientes.ok) {
        throw new Error('Error en la segunda llamada AJAX');
      }
      const listaClientes = await clientes.json();
      console.log(listaClientes);

      // Lista empleados
      const empleados = await fetch('app/empleados/obtener.php');
      if (!empleados.ok) {
        throw new Error('Error en la tercera llamada AJAX');
      }
      const listaEmpleados = await empleados.json();
      console.log(listaEmpleados);

      // Y así sucesivamente...
    } catch (error) {
      console.error('Error en la llamada AJAX:', error);
    }
  }



  //Cargando usuarios


  let myChart;

  function cargarGrafica() {
    if (myChart) {
      myChart.destroy();
    }

    $.ajax({
      url: "app/productos/grafica_ventas_x_dia.php",
      method: 'GET',
      dataType: 'json',
      success: function (datos) {
        const etiquetas = [];
        const totalCantidad = [];
        const totalSubtotal = [];
        const cantidadAlmacen = [];

        datos.forEach(item => {
          etiquetas.push(item.pro_serv);
          totalCantidad.push(parseInt(item.total_cantidad));
          totalSubtotal.push(parseInt(item.total_subtotal));
          cantidadAlmacen.push(parseInt(item.cantidad));
        });

        const sumaTotalSubtotal = totalSubtotal.reduce((acc, subtotal) => acc + subtotal, 0);
        const ctx = document.getElementById('myChart').getContext('2d');

        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: etiquetas,
            datasets: [{
              label: 'Vendidos',
              data: totalCantidad,
              backgroundColor: 'rgba(169, 50, 38, 0.7)',
              borderWidth: 1
            },
            {
              label: 'Almacén',
              data: cantidadAlmacen,
              backgroundColor: 'rgba(40, 55, 71, 0.7)',
              borderWidth: 1
            },
            {
              label: 'Monto',
              data: totalSubtotal,
              backgroundColor: 'rgba(14, 102, 85, 0.7)',
              borderWidth: 1
            },
            ]
          },
          options: {
            scales: {
              y: {
                min: 0, // Valor mínimo del eje Y
                max: 20, // Valor máximo del eje Y (ajústalo según tus necesidades)
              }
            }
          }
        });

        const sumaTotalDiv = document.getElementById('sumaTotal');
        const sumaTotalFormateada = sumaTotalSubtotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        sumaTotalDiv.innerHTML = `Total: <span class="badge text-bg-dark p-1 fs-4">${sumaTotalFormateada}</span>`;
      }
    });
  }



  function cargarListaClientes() {
    $.ajax({
      url: "app/clientes/lista_clientes.php",
      method: 'GET',
      dataType: 'json',
      success: function (datos) {
        $('#nombre').selectize({
          create: true,
          sortField: 'text',
          persist: false,
          placeholder: 'Ingresar nombre',
          allowEmptyOption: true,
          addPrecedence: true,
          options: datos.map(function (dato) {
            return {
              value: dato.id,
              text: dato.nombre + ' ' + dato.ap
            };
          }),
          create: function (input) {
            return {
              value: input,
              text: input
            };
          },
          render: {
            option_create: function (data, escape) {
              return '<div class="create">Agregar <strong>' + escape(data.input) + '</strong>&hellip;</div>';
            }
          },
        });
      },
    });

  }

  function cargarVentaServicios() {
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
          let iniciaPersonalizado = '';
          let finalizaPersonalizado = '';



          if (element.fperso == null || element.fperso == '0000-00-00 00:00:00') {
            iniciaPersonalizado = 'Sin personalizado';
            finalizaPersonalizado = '';
          } else {
            iniciaPersonalizado = moment(element.fperso).format('D MMM YY');
            finalizaPersonalizado = moment(element.finperso).format('D MMM YY');
          }

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
                <a class="btnEdit" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Editar" data-info='${JSON.stringify(element)}'><i class="ri-edit-fill"></i></a>
                <a class="cambiarServicio d-none" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cambiar" data-info='${JSON.stringify(element)}'><i class="ri-arrow-left-right-fill"></i></a>
                <a class="btnRenovar" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Renovar" data-info='${JSON.stringify(element)}'><i class="ri-loop-left-fill" ></i></a>
                <a class="btnDelet" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Eliminar" data-id='${element.id}'><i class="ri-close-fill"></i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${iniciaPersonalizado} - ${finalizaPersonalizado}">${coach}</i></a>
                <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${validarServicio}" class="bg-${status} indicador"></a>
              </div>
              <div class="d-flex justify-content-between gap-1">
                <select class="form-select form-select-sm actualizarServicio mt-1 d-none"></select>
                <select class="form-select form-select-sm coach mt-1 d-none">
                <option value="">Ninguno</option>
                <option value="grecia">Grecia</option>
                <option value="armando">Armando</option>
                </select>
              </div>
            </div>
          </div>
        </div>`;
        })

        $("#tarjetaClientes").html(template);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        cargarProductos();
      },
    });

    /* 
        $.ajax({
          url: "app/productos/obtener.php",
          type: "GET",
          success: function (response) {
            let productos = JSON.parse(response);
            let templateServicios = `
              <option selected value="">Escoge el servicio</option>
              `;
            productos.forEach((element) => {
    
              let unidad = element.unidad != null ? element.unidad : "";
              if (element.categoria == 'servicios') {
    
                templateServicios += `
                <option value="${element.id}">${element.pro_serv}</option>
                `;
    
              }
    
            })
    
            $(".actualizarServicio").html(templateServicios);
          },
        }); */




  }

  function cargarProductos() {
    $.ajax({
      url: "app/productos/obtener.php",
      type: "GET",
      success: function (response) {
        let productos = JSON.parse(response);
        let templateProductos = ``;
        let copiaServicios = "";
        let templateServicios = `
        <option selected value="">Elije servicio</option>
        `;
        productos.forEach((element) => {

          let unidad = element.unidad != null ? element.unidad : "";

          if (element.categoria != 'servicios') {
            templateProductos += `
            <div class="box-img ${element.categoria}" 
            data-producto='${JSON.stringify(element)}' 
            style="background-image:url(assets/img/products/${element.img})">
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
        copiaServicios = templateServicios

        $("#catalogoProductos").html(templateProductos);
        $("#tipoMembresia").html(templateServicios);
        $(".actualizarServicio").html(copiaServicios);
      },
    });

  }

  /*  $("#membresia").click(function () {
     $.ajax({
       url: "app/clientes/obtener.php",
       type: "GET",
       success: function (response) {
         let datos = JSON.parse(response);
         let template = cargarVentaServicios(datos);
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
          $("#tarjetaClientes").html(filtrarVentaServicios(busquedaCliente));
          /* Usar los tooltips para indicar tipo de membresia o detalles de insignias */
          const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
          const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

        } else {
          alertify.error('No existe registro del usuario.')
        }

      },
    });

  })

  function filtrarVentaServicios(clientes) {
    let template = ``;
    clientes.forEach((element) => {
      let inicia = element.servicio == 'VISITA' ? 'Hoy' : moment(element.fecha).format('D MMM YY');
      let termina = element.servicio == 'VISITA' ? moment(element.vence).format('D MMM YY') : moment(element.vence).format('D MMM YY');
      let email = element.email != '' ? element.email : 'Pendiente';
      let status = '';
      let coach = element.couch != '' ? element.couch.substring(0, 2).toUpperCase() : 'N';
      let validarServicio = '';
      let iniciaPersonalizado = '';
      let finalizaPersonalizado = '';

      if (element.fperso == null || element.fperso == '0000-00-00 00:00:00') {
        iniciaPersonalizado = 'Sin personalizado';
        finalizaPersonalizado = '';
      } else {
        iniciaPersonalizado = moment(element.fperso).format('D MMM YY');
        finalizaPersonalizado = moment(element.finperso).format('D MMM YY');
      }

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
            <a class="btnEdit" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Editar" data-info='${JSON.stringify(element)}'><i class="ri-edit-fill"></i></a>
            <a class="cambiarServicio d-none" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cambiar" data-info='${JSON.stringify(element)}'><i class="ri-arrow-left-right-fill"></i></a>
            <a class="btnRenovar" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Renovar" data-info='${JSON.stringify(element)}'><i class="ri-loop-left-fill" ></i></a>
            <a class="btnDelet" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Eliminar" data-id='${element.id}'><i class="ri-close-fill"></i></a>
            <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${iniciaPersonalizado} - ${finalizaPersonalizado}">${coach}</i></a>
            <a data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${validarServicio}" class="bg-${status} indicador"></a>
          </div>
          <div class="d-flex justify-content-between gap-1">
            <select class="form-select form-select-sm actualizarServicio mt-1 d-none"></select>
            <select class="form-select form-select-sm coach mt-1 d-none">
            <option value="">Ninguno</option>
            <option value="grecia">Grecia</option>
            <option value="armando">Armando</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;
    })
    cargarProductos();
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

    let unidad = producto.unidad;
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


    const productosArray = [];

    listaCompra.forEach((elemento) => {
      const producto = {
        p_s: elemento,
        cantidad: 1,
        fecha: moment().format('YYYY-MM-DD H:mm:ss'),
        idempleado: 2,
        descuento: $("#descuento").val()

      };

      // Agregar el producto al nuevo array
      productosArray.push(producto);
    });


    $.ajax({
      url: "app/productos/venta_producto.php",
      type: "POST",
      datatype: "json",
      data: {
        productosArray
      },
      success: function (response) {

        listaCompra = [];
        totalPrecio = 0;

        $('#aplicarDescuento').attr('disabled', false);
        $("#descuento").val(0);
        if (listaCompra.length == 0) {
          $('#offcanvasScrolling').offcanvas('hide');
        }

        alertify.success("Venta realizada.");
        cargarGrafica();

      },
    });

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
          alertify.error('El usuario ya esta registrado.');
          $('#registrarCliente').attr('disabled', true);
        } else {
          $('#registrarCliente').attr('disabled', false);
        }

      }
    });
  });

  //Registrar cliente
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
        alertify.success("Usuario registrado.");
        let selectize = $('#nombre')[0].selectize;
        selectize.clear();
      },
    });



  });

  //Editar servicio
  $(document).on('click', '.btnEdit', function (e) {
    e.preventDefault();
    const datosUsuario = $(this).data('info');
    //console.log(datosUsuario)
    $(this).closest(".member-info").find(".btnEdit").toggleClass('d-none');
    $(this).closest(".member-info").find(".cambiarServicio").toggleClass('d-none');
    $(this).closest(".member-info").find(".actualizarServicio").toggleClass('d-none');
    $(this).closest(".member-info").find(".coach").toggleClass('d-none');
    $(this).closest(".member-info").find(".btnRenovar").toggleClass('d-none');
    $(this).closest(".member-info").find(".btnDelet").toggleClass('d-none');

    $(this).closest(".member-info").find(".actualizarServicio").val(datosUsuario.p_s);
    $(this).closest(".member-info").find(".coach").val(datosUsuario.couch);

  });

  //Cambiar servicio
  $(document).on('click', '.cambiarServicio', function (e) {
    // checar cuando asigno solo a instructor, tambien se modifica la fecha de la membresía
    e.preventDefault();
    const datosUsuario = $(this).data('info');
    $(this).closest(".member-info").find(".btnEdit").toggleClass('d-none');
    $(this).closest(".member-info").find(".cambiarServicio").toggleClass('d-none');
    $(this).closest(".member-info").find(".actualizarServicio").toggleClass('d-none');
    $(this).closest(".member-info").find(".coach").toggleClass('d-none');
    $(this).closest(".member-info").find(".btnRenovar").toggleClass('d-none');
    $(this).closest(".member-info").find(".btnDelet").toggleClass('d-none');

    let tipoMembresia = $(this).closest(".member-info").find(".actualizarServicio").val();

    let coachActual = $(this).closest(".member-info").find(".coach").val();
    let servicioActual = $(this).closest(".member-info").find(".actualizarServicio").val();

    if (datosUsuario.couch == coachActual && datosUsuario.p_s == servicioActual) return;

    //Datos a mandar

    let fechaActual = moment().format('YYYY-MM-DD H:mm:ss')

    let idServicioActual = datosUsuario.id;
    let idEmplado = 2;

    let vence = '';
    let fechaPersonalizado = '';
    let iniciaPersonalizadoFormat = null;
    let finPersonalizado = '';
    let finPersonalizadoFormat = null;
    let coach = $(this).closest(".member-info").find(".coach").val();

    if (tipoMembresia == 24 || tipoMembresia == 70 || tipoMembresia == 71 || tipoMembresia == 75 || tipoMembresia == 80) {
      vence = moment().add(1, 'months');
    }
    if (tipoMembresia == 25 || tipoMembresia == 69) {
      vence = moment();
    }
    if (tipoMembresia == 26) {
      vence = moment().add(7, 'days');
    }
    if (tipoMembresia == 27) {
      vence = moment().add(15, 'days');
    }
    if (coach != '') {
      fechaPersonalizado = moment();
      iniciaPersonalizadoFormat = fechaPersonalizado.format('YYYY-MM-DD H:mm:ss');
      finPersonalizado = moment().add(1, 'months');
      finPersonalizadoFormat = finPersonalizado.format('YYYY-MM-DD H:mm:ss');
    }

    if (vence == '' && coach == '' || vence == '' && coach != '') return;
    let venceFormat = vence.format('YYYY-MM-DD H:mm:ss');

    $.ajax({
      url: "app/clientes/cambiar_servicio.php",
      type: "POST",
      dataType: "json",
      data: {
        id: idServicioActual,
        p_s: tipoMembresia,
        cantidad: 1,
        fecha: fechaActual,
        idempleado: idEmplado,
        vence: venceFormat,
        couch: coach,
        fperso: iniciaPersonalizadoFormat,
        finperso: finPersonalizadoFormat
      },

      success: function (response) {
        if (response === true) {
          alertify.success("Servicio actualizado.");

          setTimeout(() => {
            cargarVentaServicios();
          }, 1000);
        }
      },
    });

  });

  //Renovar servicio
  $(document).on('click', '.btnRenovar', function (e) {
    e.preventDefault();
    const renovarUsuario = $(this).data('info');

    let fechaInicia = $(this).closest(".member-info").find(".inicia");
    let fechaTermina = $(this).closest(".member-info").find(".termina");
    let tipoServicio = $(this).closest(".member-info").find(".servicio");


    let idServicio = renovarUsuario.id;
    let mandarInicio = moment().format('YYYY-MM-DD H:mm:ss');
    let mandarFin = '';

    if (tipoServicio.text() == 'VISITA' || tipoServicio.text() == 'VISITA ESTUDIANTE') {
      fechaTermina.text(moment().format('D MMM YY'));
      mandarFin = moment().format('YYYY-MM-DD H:mm:ss');
      $(this).closest(".member-info").find(".indicador").toggleClass('bg-danger');
      $(this).closest(".member-info").find(".indicador").toggleClass('bg-warning');
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
      },
    });

  });

  //Eliminar servicio

  $(document).on('click', '.btnDelet', function (e) {
    e.preventDefault();
    const idUsuario = $(this).data('id');
    $.ajax({
      url: "app/clientes/eliminar_servicio.php",
      type: "POST",
      datatype: "json",
      data: {
        id: idUsuario
      },

      success: function (response) {
        alertify.error("Membresía eliminada.");
        setTimeout(() => {
          cargarVentaServicios();
        }, 1000);
      },
    });
  });



  //Llamadas para llenar tablas de datos

  let filaProducto = null;
  let idProducto = null;
  let tablaProductos = $("#productosCat").DataTable({
    language: {
      decimal: ',',
      emptyTable: 'No hay datos',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 a 0 de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: '>',
        previous: '<'
      },
      processing: 'Procesando...',
      search: 'Buscar:'
    },
    lengthMenu: [
      [5, 10, 15, -1],
      [5, 10, 15, 'Todos']
    ],

    ajax: {
      url: "app/productos/obtener.php",
      method: "GET",
      dataSrc: "",
    },
    columns: [{
      data: "id"
    },
    {
      data: "codigo"
    },
    {
      data: "pro_serv"
    },
    {
      data: "descripcion"
    },
    {
      data: "unidad"
    },
    {
      data: "compra"
    },
    {
      data: "precio"
    },
    {
      data: "cantidad"
    },
    {
      data: "categoria"
    },
    {
      data: "img",
      render: function (data, type, row) {
        if (data == null) {
          return `<div class="image-container"><img src="assets/img/nodis.png" alt="Imagen"></div>`;
        } else {
          return `<div class="image-container"><img src="assets/img/products/${data}" alt="Imagen"></div>`;
        }
      }
    },
    {
      defaultContent: "<div class='d-flex'><button class='btnEditar btn'><i class='bi bi-pen'></i></button><button class='btnBorrar btn '><i class='bi bi-trash'></i></button></div>",
    },
    ],
    columnDefs: [{
      targets: [0, 4, 5, 6, 7, 8],
      className: 'text-center'
    },
    {
      targets: [0],
      className: 'ocultar-columna'
    },
    ],

    rowCallback: function (row, data) {

      $($(row).find("td")[5]).css("color", "#DF3816");
      $($(row).find("td")[5]).css("font-weight", "500");
      $($(row).find("td")[6]).css("color", "#1BA354");
      $($(row).find("td")[6]).css("font-weight", "500");

      if (data['cantidad'] <= 3 && data['categoria'] != 'SERVICIO') {
        $($(row).find("td")[7]).css("background-color", "#F5B7B1");
        $($(row).find("td")[7]).css("color", "#B72949");
        $($(row).find("td")[7]).css("font-weight", "500");
      } else if (data['cantidad'] >= 4 && data['categoria'] != 'SERVICIO') {
        //$($(row).find("td")[6]).css("background-color", "#D0ECE7");
        $($(row).find("td")[7]).css("color", "#2980B9");
        $($(row).find("td")[7]).css("font-weight", "500");
      }

    },
  });

  //Controles para productos

  $("#abrirModal").click(function () {
    $("#actualizarProducto").addClass('d-none');
    $("#agregarProducto").removeClass('d-none');
    $('.imagen-cliente').attr('src', 'assets/img/products/muestra.png');
  })

  // Añadir evento change para cargar la imagen desde el input file
  $('#imagen').change(function () {
    const input = this;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $('.imagen-cliente').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);

    }
  });

  // Función para comprimir la imagen usando el elemento canvas
  function compressImage(image, callback) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let maxWidth = 800; // Ancho máximo deseado
    let maxHeight = 600; // Alto máximo deseado

    let img = new Image();
    img.onload = function () {
      let width = img.width;
      let height = img.height;

      // Comprobar si es necesario redimensionar
      if (width > maxWidth || height > maxHeight) {
        let ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // Obtener el Blob de la imagen comprimida desde el canvas
      canvas.toBlob(function (blob) {
        callback(blob);
      }, 'image/jpeg', 0.7); // Calidad de compresión JPEG
    }
    img.src = URL.createObjectURL(image);
  }

  $("#agregarProducto").click(function (e) {
    e.preventDefault();
    let codigo = $.trim($("#codigo").val()).toUpperCase();
    let nombre = $.trim($("#producto").val()).toUpperCase();
    let descripcion = $.trim($("#des").val()).toUpperCase();
    let unidad = $.trim($("#unidad").val()).toUpperCase();
    let compra = $("#compra").val();
    let precio = $("#precio").val();
    let cantidad = $("#cantidad").val();
    let categoria = $.trim($("#categoria").val()).toUpperCase();
    let imagenInput = document.getElementById('imagen');
    let imagen = imagenInput.files[0];

    if (codigo == '' || nombre == '' || unidad == '' || compra == '' || precio == '' || cantidad == '' || categoria == '') {
      return;
    }

    // Crea un objeto FormData para enviar la imagen correctamente
    let formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('pro_serv', nombre);
    formData.append('descripcion', descripcion);
    formData.append('unidad', unidad);
    formData.append('compra', compra);
    formData.append('precio', precio);
    formData.append('cantidad', cantidad);
    formData.append('categoria', categoria);

    // Comprimir la imagen antes de agregarla al formData
    compressImage(imagen, function (compressedImageBlob) {
      // Obtener el nombre original del archivo
      let fileName = imagen.name;
      // Agregar la imagen comprimida al formData con el nombre original
      formData.append('img', compressedImageBlob, fileName);

      $.ajax({
        url: "app/productos/agregar_producto.php",
        type: "POST",
        data: formData, // Usa el objeto FormData en lugar de un objeto plano
        processData: false, // Evita que jQuery procese los datos
        contentType: false, // Evita que jQuery establezca el tipo de contenido
        success: function (response) {
          tablaProductos.ajax.reload(null, false);
          $("#staticBackdrop").modal("hide");
          $("#formProductos").trigger("reset");

        },
        error: function (error) {
          console.error('Error al enviar la imagen:', error);
        }
      });
    });


  });


  $("#cancelar").click(() => {
    idProducto = null;
    filaProducto = null;
    $("#formProductos").trigger("reset");
  })


  $(document).on("click", ".btnEditar", function () {
    filaProducto = $(this).closest("tr");
    idProducto = parseInt(filaProducto.find("td:eq(0)").text());
    let codigo = filaProducto.find("td:eq(1)").text();
    let nombre = filaProducto.find("td:eq(2)").text();
    let descripcion = filaProducto.find("td:eq(3)").text();
    let unidad = filaProducto.find("td:eq(4)").text();
    let compra = filaProducto.find("td:eq(5)").text();
    let precio = filaProducto.find("td:eq(6)").text();
    /* let ingreso = parseInt(filaProducto.find("td:eq(8)").text());
    let fechaIngreso = filaProducto.find("td:eq(9)").text(); 
    let almacen = parseInt(filaProducto.find("td:eq(10)").text());
    */
    let cantidad = filaProducto.find("td:eq(7)").text();
    let categoria = filaProducto.find("td:eq(8)").text();
    /*  let precioNumber = parseInt(precio.replace(/[^\d.-]/g, ''));
 
     let fecha = moment(fechaIngreso, "DD/MM/YYYY");
     let fechaFormateada = fecha.format("YYYY-MM-DD"); */

    let imagen = filaProducto.find("td:eq(9) img");
    let src = imagen.attr("src");

    $("#codigo").val(codigo);
    $("#producto").val(nombre);
    $("#des").val(descripcion);
    $("#unidad").val(unidad);
    $("#compra").val(compra);
    $("#precio").val(precio);
    $("#cantidad").val(cantidad);
    $("#categoria").val(categoria);
    $('.imagen-cliente').attr('src', src).css({
      'width': '80',
      'height': '80'
    });
    $("#staticBackdrop").modal("show");
    $("#actualizarProducto").removeClass('d-none');
    $("#agregarProducto").addClass('d-none');

    $("#actualizarProducto").click(function () {
      let codigo = $("#codigo").val().toUpperCase();
      let nombre = $("#producto").val().toUpperCase();
      let descripcion = $("#des").val().toUpperCase();
      let unidad = $("#unidad").val().toUpperCase();
      let compra = $("#compra").val();
      let precio = $("#precio").val();
      let cantidad = $("#cantidad").val();
      let categoria = $("#categoria").val().toUpperCase();
      let imagenInput = document.getElementById('imagen');
      let nuevaImagen = imagenInput.files[0];

      if (codigo == '' || nombre == '' || unidad == '' || compra == '' || precio == '' || cantidad == '' || categoria == '') {
        return;
      }

      // Crea un objeto FormData para enviar la imagen correctamente
      let formData = new FormData();
      formData.append('id', idProducto);
      formData.append('codigo', codigo);
      formData.append('pro_serv', nombre);
      formData.append('descripcion', descripcion);
      formData.append('unidad', unidad);
      formData.append('compra', compra);
      formData.append('precio', precio);
      formData.append('cantidad', cantidad);
      formData.append('categoria', categoria);


      compressImage(nuevaImagen, function (compressedImageBlob) {
        let fileName = nuevaImagen.name;
        formData.append('img', compressedImageBlob, fileName);

        $.ajax({
          url: "app/productos/actualizar_producto.php",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            tablaProductos.ajax.reload(null, false);
            $("#staticBackdrop").modal("hide");
            $("#formProductos").trigger("reset");

          },
          error: function (error) {
            console.error('Error al enviar la imagen:', error);
          }
        });
      });



    })

  });

  $(document).on("click", ".btnBorrar", function () {
    let fila = $(this).closest("tr");
    let id = parseInt($(this).closest("tr").find("td:eq(0)").text());

    $.ajax({
      url: "app/productos/eliminar_producto.php",
      type: "POST",
      datatype: "json",
      data: {
        id: id
      },
      success: function () {
        tablaProductos.ajax.reload(null, false);
        alertify.error('Producto eliminado.')
      }
    })

  })








  let tablaClientes = $("#clientes").DataTable({

    language: {
      decimal: ',',
      emptyTable: 'No hay datos',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 a 0 de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: '>',
        previous: '<'
      },
      processing: 'Procesando...',
      search: 'Buscar:'
    },
    lengthMenu: [
      [5, 10, 15, -1],
      [5, 10, 15, 'Todos']
    ],
    ajax: {
      url: "app/clientes/lista_clientes.php",
      method: "GET",
      dataSrc: "",
    },
    columns: [{
      data: "id"
    },
    {
      data: "nombre"
    },
    {
      data: "ap"
    },
    {
      data: "gen"
    },
    {
      data: "email"
    },
    {
      defaultContent: "<div class='d-flex justify-content-center'><button class='btnEditar btn'><i class='bi bi-pen'></i></button><button class='btnBorrar btn'><i class='bi bi-trash'></i></button><button class='btn enviarCredencial'><i class='bi bi-send-check'></i></button></div>"

    },
    ],
    columnDefs: [{
      targets: [0, 3, 5],
      className: 'text-center'
    },
    {
      targets: [0],
      className: 'ocultar-columna'
    },
    ],

    rowCallback: function (row, data) {
      if (data['email'] == '') {
        $($(row).find("td")[4]).css("background-color", "#F2D7D5");
      }
    },
  });


  let tablaEmpleados = $("#empleados").DataTable({
    language: {
      decimal: ',',
      emptyTable: 'No hay datos',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 a 0 de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: '>',
        previous: '<'
      },
      processing: 'Procesando...',
      search: 'Buscar:'
    },
    lengthMenu: [
      [5, 10, 15, -1],
      [5, 10, 15, 'Todos']
    ],
    ajax: {
      url: "app/empleados/obtener.php",
      method: "GET",
      dataSrc: "",
    },
    columns: [{
      data: "id"
    },
    {
      data: "nombre"
    },
    {
      data: "ap"
    },
    {
      data: "role"
    },
    {
      data: "password"
    },
    {
      defaultContent: "<div class='d-flex'><button class='btnEditar btn'><i class='bi bi-pen'></i></button><button class='btnBorrar btn '><i class='bi bi-trash'></i></button></div>",
    },
    ],
    columnDefs: [{
      targets: [0, 5],
      className: 'text-center'
    },
    {
      targets: [0],
      className: 'ocultar-columna'
    },
    ],

  });




})()