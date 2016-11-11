/**
 * @file
 * Tooltips builder for node view.
 */

(function ($, Drupal) {
  Drupal.behaviors.tooltipsAutocomplete = {
    attach: function (context, settings) {
      $('.paragraphs-item-image-tooltips').find('.field-name-field-tooltips-data').not('.tooltips-processed').each(function() {
        var $this = $(this);
        var tooltisValue = $this.find('input').val();
        if (tooltisValue) {
          var tooltipsData = JSON.parse(tooltisValue);
          var $baseImage = $this.siblings('.field-name-field-tooltip-base-image');
          var tooltip;
          $.each(tooltipsData, function(index, icon) {
            tooltip = Drupal.theme('image_tooltip_icon_view', icon);
            $(tooltip).appendTo($baseImage);
          });
        }
        $this.addClass('tooltips-processed');
      });
      Drupal.behaviors.ZZCToolsModal.attach(context);
    }
  }
})(jQuery, Drupal);
