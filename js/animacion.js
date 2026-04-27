$(function () {

  /* ──────────────────────────────────────
     1. FILTRO POR CATEGORÍAS (jQuery)
  ────────────────────────────────────── */
  function filtrar(cat) {
    // Actualiza botones activos
    $('.btn-filtro, .filtro-link').removeClass('activo');
    $('[data-filtro="' + cat + '"]').addClass('activo');

    const $items = $('.post-item');

    if (cat === 'todos') {
      $items.show().removeClass('oculto');
    } else {
      $items.each(function () {
        if ($(this).data('cat') === cat) {
          $(this).show().removeClass('oculto');
        } else {
          $(this).hide().addClass('oculto');
        }
      });
    }

    // Mostrar mensaje si no hay resultados
    const visibles = $('.post-item:visible').length;
    if (visibles === 0) {
      $('#sin-resultados').removeClass('d-none');
    } else {
      $('#sin-resultados').addClass('d-none');
    }
  }

  // Click en botones de filtro (barra superior)
  $('.btn-filtro').on('click', function () {
    filtrar($(this).data('filtro'));
  });

  // Click en links del sidebar
  $('.filtro-link').on('click', function (e) {
    e.preventDefault();
    filtrar($(this).data('filtro'));
    // Scroll suave hacia los artículos
    $('html, body').animate({ scrollTop: $('#articulos-grid').offset().top - 80 }, 400);
  });


  /* ──────────────────────────────────────
     2. SCROLL REVEAL (jQuery + IntersectionObserver)
  ────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    $('.reveal').each(function () {
      io.observe(this);
    });
  } else {
    // Fallback para navegadores sin soporte
    $('.reveal').addClass('visible');
  }


  /* ──────────────────────────────────────
     3. SUSCRIPCIÓN SIDEBAR (jQuery)
  ────────────────────────────────────── */
  $('#btnSuscribir').on('click', function () {
    const email = $('#suscripcionEmail').val().trim();
    if (email && email.includes('@')) {
      $('#suscripcionEmail').val('').prop('disabled', true);
      $('#msg-suscripcion').fadeIn();
    } else {
      $('#suscripcionEmail').addClass('is-invalid');
      setTimeout(function () {
        $('#suscripcionEmail').removeClass('is-invalid');
      }, 1500);
    }
  });


  /* ──────────────────────────────────────
     4. FOOTER FORM (demo, jQuery)
  ────────────────────────────────────── */
  $('#footerForm').on('submit', function (e) {
    e.preventDefault();
    const $btn = $(this).find('button[type="submit"]');
    $btn.html('<i class="fa-solid fa-check me-1"></i>Enviado').prop('disabled', true);
  });

});

$(document).ready(function () {

  $(".hero-title").delay(200).animate({
    opacity: 1,
    top: "-=10"
  }, 1000);

  $(".hero-subtitle").delay(600).animate({
    opacity: 1
  }, 1000);

  $(".btn-hero").delay(1000).animate({
    opacity: 1
  }, 800);

});

function animarContador(id, objetivo, duracion) {
  let actual = 0;
  let incremento = objetivo / (duracion / 50);

  let intervalo = setInterval(function () {
    actual += incremento;
    if (actual >= objetivo) {
      actual = objetivo;
      clearInterval(intervalo);
    }
    $(id).text(Math.floor(actual));
  }, 50);
}

// Detectar cuando entra en pantalla
$(window).on("scroll", function () {
  let trigger = $("#counter1").offset().top - window.innerHeight;

  if ($(window).scrollTop() > trigger) {
    animarContador("#counter1", 1500, 2000);
    animarContador("#counter2", 120, 2000);
    animarContador("#counter3", 45, 2000);
    animarContador("#counter4", 10, 2000);

    $(window).off("scroll"); // evitar repetir
  }
});

$(window).on("scroll", function () {
  $(".reveal").each(function () {
    let top = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let height = $(window).height();

    if (scroll + height > top + 50) {
      $(this).addClass("visible");
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Hover dinámico en filas de tabla
  $('.tabla-precios tbody tr').hover(
    function () {
      $(this).addClass('table-hover-active');
    },
    function () {
      $(this).removeClass('table-hover-active');
    }
  );
});

$(document).ready(function () {
  const $form = $('#contactForm');
  const $modal = new bootstrap.Modal(document.getElementById('confirmModal'));

  // 1. Validación en tiempo real con .on('input')
  $('input, textarea').on('input', function () {
    const input = $(this);
    const isValid = input[0].checkValidity();

    if (isValid) {
      input.addClass('is-valid').removeClass('is-invalid');
    } else {
      input.addClass('is-invalid').removeClass('is-valid');
    }
  });

  // 2. Manejo del Submit
  $form.on('submit', function (e) {
    e.preventDefault();

    // Sanitización básica de valores
    const nombre = $('#nombre').val().trim();
    const email = $('#email').val().trim();
    const mensaje = $('#mensaje').val().trim();

    if (this.checkValidity()) {
      // Mostrar Spinner
      $('#spinner').removeClass('d-none');
      $('#btnText').text('Enviando...');
      $('#btnEnviar').prop('disabled', true);

      // Simulación de envío
      setTimeout(function () {

        $('#spinner').addClass('d-none');
        $('#btnText').text('Enviar');
        $('#btnEnviar').prop('disabled', false);

        // Mostrar Modal y resetear formulario
        $modal.show();
        $form[0].reset();
        $('.form-control').removeClass('is-valid is-invalid');
      }, 2000);

    } else {
      // Si el formulario no es válido, forzar estilos de Bootstrap
      $form.addClass('was-validated');
    }
  });

});

// Filtro por categoría
$("#filtroCategoria").on("change", function () {
  const categoria = $(this).val();

  if (categoria === "") {
    $("#destinosGrid .card").show();
  } else {
    $("#destinosGrid .card").hide();
    $("#destinosGrid .card." + categoria).show();
  }
});

// Filtro por búsqueda
$("#busqueda").on("keyup", function () {
  const texto = $(this).val().toLowerCase();

  $("#destinosGrid .card").each(function () {
    const contenido = $(this).text().toLowerCase();
    $(this).toggle(contenido.includes(texto));
  });
});

$(document).on('click', '#verificarPhishing', function (e) {
  e.preventDefault();

  const respuestas = [];

  $('.phishing-check:checked').each(function () {
    respuestas.push($(this).val());
  });

  const correctas = ['link', 'urgencia', 'datos'];
  const aciertos = respuestas.filter(r => correctas.includes(r)).length;

  if (aciertos === 3) {
    $('#phishingFeedback')
      .removeClass('text-danger')
      .addClass('text-success')
      .html('✅ ¡Correcto! Identificaste todas las señales de phishing.');
  } else {
    $('#phishingFeedback')
      .removeClass('text-success')
      .addClass('text-danger')
      .html('⚠️ Te faltaron señales importantes.');
  }

  setTimeout(() => {
    $('.phishing-check').prop('checked', false);
  }, 1500);
});