$(function () {
  $('.flip-card').on('click', function (e) {
    // Si el click fue en rating/botones/links, no hacer flip
    if ($(e.target).closest('.rating, .rating-star, button, a').length) return;
    $(this).find('.flip-card-inner').toggleClass('flipped');
  });

  // Rating con estrellas (Agencias)
  function renderStars($rating, value) {
    $rating.find('.rating-star').each(function () {
      const starValue = Number($(this).data('value'));
      const $icon = $(this).find('i');
      if (starValue <= value) {
        $icon.removeClass('fa-regular').addClass('fa-solid');
      } else {
        $icon.removeClass('fa-solid').addClass('fa-regular');
      }
    });
  }

  $(document).on('mouseover', '.rating', function (e) {
    const $btn = $(e.target).closest('.rating-star');
    if (!$btn.length) return;
    const $card = $btn.closest('.flip-card');
    const $rating = $btn.closest('.rating');
    const hoverValue = Number($btn.data('value'));
    const selectedValue = Number($card.data('rating') || 0);
    renderStars($rating, hoverValue || selectedValue);
  });

  $(document).on('mouseleave', '.rating', function () {
    const $card = $(this).closest('.flip-card');
    const selectedValue = Number($card.data('rating') || 0);
    renderStars($(this), selectedValue);
  });

  $(document).on('click', '.rating', function (e) {
    const $btn = $(e.target).closest('.rating-star');
    if (!$btn.length) return;
    e.preventDefault();
    e.stopPropagation();

    const $card = $btn.closest('.flip-card');
    const value = Number($btn.data('value'));
    const $rating = $btn.closest('.rating');

    $card.data('rating', value);
    renderStars($rating, value);

    const agencia = $card.data('agencia') || 'Agencia';
    $card.find('.rating-label').text(`Calificaste ${agencia} con ${value} estrella${value === 1 ? '' : 's'}.`);
  });

  // Evitar que links internos disparen flip (opcional)
  $(document).on('click', '.flip-card a', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  // Botón "Calificar" (dorso): volver al frente y enfocar estrellas
  $(document).on('click', '.js-calificar', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $card = $(this).closest('.flip-card');
    $card.find('.flip-card-inner').removeClass('flipped');
    setTimeout(function () {
      $card.find('.rating-star').first().trigger('focus');
    }, 50);
  });
});