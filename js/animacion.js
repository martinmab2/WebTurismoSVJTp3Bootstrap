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