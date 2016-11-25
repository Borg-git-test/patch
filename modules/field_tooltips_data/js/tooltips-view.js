/**
 * @file
 * Tooltips builder for node view.
 */

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.tooltipsAutocomplete = {
    attach: function (context, settings) {
      $('.paragraph--type--image-tooltips').find('.field--name-field-tooltips-data').not('.tooltips-processed').each(function() {
        var $this = $(this);
        var tooltisValue = $this.find('input').val();
        if (tooltisValue) {
          var tooltipsData = JSON.parse(tooltisValue);
          var $baseImage = $this.siblings('.field--name-field-tooltip-base-image');
          var tooltip;
          $.each(tooltipsData, function(index, icon) {
            tooltip = Drupal.theme('imageTooltipIconView', icon);
            $(tooltip).appendTo($baseImage);
          });
        }
        $this.addClass('tooltips-processed');
      });
    }
  }
})(jQuery, Drupal, drupalSettings);
