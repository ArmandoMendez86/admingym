/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /* Usar los tooltips para indicar tipo de membresia o detalles de insignias */
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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

  function cargarClientes() {
    $.ajax({
      url: "app/clientes/obtener.php",
      type: "GET",
      success: function (response) {
        let clientes = JSON.parse(response);
        let template = ``;
        clientes.forEach((element) => {
          template += `
        <div class="col-lg-4 mt-3" data-aos="zoom-in" data-aos-delay="100">
          <div class="member d-flex align-items-start">
            <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
            <div class="member-info">
              <h4>${element.nombre} ${element.ap}</h4>
              <span>${element.email}</span>
              <p>Explicabo voluptatem mollitia </p>
              <div class="social">
                <a href=""><i class="ri-twitter-fill"></i></a>
                <a href=""><i class="ri-facebook-fill"></i></a>
                <a href=""><i class="ri-instagram-fill"></i></a>
                <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
              </div>
            </div>
          </div>
        </div>`;
        })
        tarjetas.innerHTML = template;
      },
    });

  }

  function cargarProductos() {
    $.ajax({
      url: "app/productos/obtener.php",
      type: "GET",
      success: function (response) {
        let productos = JSON.parse(response);
        let template = ``;
        productos.forEach((element) => {

          let unidad = element.unidad != null ? element.unidad : "";

          template += `
      <div class="box-img ${element.categoria}" data-producto='${JSON.stringify(element)}'>
        <img src="assets/img/nodis.png" alt="">
        <div class="description-box">
          <p class="m-0">${element.pro_serv}</p>
          <span class="badge text-bg-danger">${unidad}</span>
        </div>
      </div>`;
        })
        catalogoProductos.innerHTML = template;
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
      template += `
        <div class="col-lg-4 mt-3" data-aos="zoom-in" data-aos-delay="100">
          <div class="member d-flex align-items-start">
            <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt=""></div>
            <div class="member-info">
              <h4>${element.nombre} ${element.ap}</h4>
              <span>${element.email}</span>
              <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
              <div class="social">
                <a href=""><i class="ri-twitter-fill"></i></a>
                <a href=""><i class="ri-facebook-fill"></i></a>
                <a href=""><i class="ri-instagram-fill"></i></a>
                <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
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

  let fila = ``;
  let listaCompra = [];

  $(document).on('click', '.box-img', function () {
    $('#listaVenta').html("");
    let producto = $(this).data('producto');
    listaCompra.push(producto.id);
    let unidad = producto.unidad != null ? producto.unidad : "Servicio";
    fila += `
    <tr>
      <td class="d-none">${producto.id}</td>
      <td>${producto.pro_serv}</td>
      <td>${unidad}</td>
      <td>${producto.precio}</td>
      <td><button type="button" class="btn btn-sm btn-outline-danger removeProduct">X</button></td>
    </tr>
    `;
    // Agregar la fila a la tabla
    $('#listaVenta').append(fila);

    console.log(listaCompra)

    if (listaCompra.length > 0) {
      $('#offcanvasScrolling').offcanvas('show');

    }

  });
  $(document).on('click', '.removeProduct', function () {
    // Encuentra la fila más cercana al botón que se hizo clic y la elimina
    $(this).closest('tr').remove();


  });









})()