let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-imag')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-imag')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-imag')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-imag, #show-previous-imag')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-imag') {
            current_imag--;
          } else {
            current_imag++;
          }

          selector = $('[data-imag-id="' + current_imag + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_imag = $sel.data('imag-id');
        $('#imag-gallery-title')
          .text($sel.data('title'));
        $('#imag-gallery-imag')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('imag-id'));
      }

      if (setIDs == true) {
        $('[data-imag-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-imag-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-imag').is(":visible")) {
          $('#show-previous-imag')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-imag').is(":visible")) {
          $('#show-next-imag')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
