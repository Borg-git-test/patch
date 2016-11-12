/**
 * @file
 * Tooltips builder on the node form.
 */

(function ($, Drupal) {
  Drupal.behaviors.tooltipsAutocomplete = {
    attach: function (context, settings) {
      var $tooltipsContainer = $('.paragraphs-item-type-image-tooltips');
      var autocompleteField = '.field-name-field-tooltips-content input';

      // Add tooltips for the node form on page load.
      $tooltipsContainer.find('.field-name-field-tooltips-data').not('.tooltips-processed').each(function() {
        var $this = $(this);
        var tooltisValue = $this.find('input').val();
        if (tooltisValue) {
          var tooltipsData = JSON.parse(tooltisValue);
          var $baseImage = $this.siblings('.field-name-field-tooltip-base-image');
          var tooltip, configLink;
          $.each(tooltipsData, function(index, icon) {
            tooltip = Drupal.theme('image_tooltip_icon_form', icon);
            $(tooltip).appendTo($baseImage).draggable();

            configLink = Drupal.theme('tooltip_config_link', icon.nid);
            $(configLink).insertAfter($this.siblings('.field-name-field-tooltips-content').find('input[id~="' + icon.delta + '"]'));
          });
        }
        $this.addClass('tooltips-processed');
      });

      // Add tooltip on image for the selected node in autocomplete.
      $(autocompleteField).once('add-tooltip').on('autocompleteSelect', function(event, node) {
        var $this = $(this);
        var $baseImage = $this.parents('.field-name-field-tooltips-content').siblings('.field-name-field-tooltip-base-image');

        var iconImageSrc = $this.parents('.field-name-field-tooltips-content').siblings('.field-name-field-tooltip-icon').find('a').attr('href');

        if (!iconImageSrc) {
          iconImageSrc = Drupal.settings.imageTooltip.icon;
        }
        var selectedNode = $this[0].value;

        var selectedMatches = selectedNode.match('\(([1-9])+\)');
        var selectedNid = selectedMatches[0];
        var selectedtitle = selectedNode.replace(/\([0-9]\)/g, '').trim();

        var icon = {
          nid: selectedNid,
          title: selectedtitle,
          src: iconImageSrc,
          delta: $this.attr('id')
        };

        var tooltip = Drupal.theme('image_tooltip_icon_form', icon);
        $(tooltip).appendTo($baseImage).draggable();

        var editTooltipPosition = Drupal.theme('tooltip_config_link', selectedNid);
        $(editTooltipPosition).insertAfter($this);
      });

      // Remove saved tooltip if user ties to change field.
      $(autocompleteField).bind('focus', function(event, node) {
        var $this = $(this);

        var $baseImage = $this.parents('.field-name-field-tooltips-content').siblings('.field-name-field-tooltip-base-image');

        // Add warning if user has not uploaded base image before selecting tooltips.
        if (!$baseImage.find('.image-preview').length || !$baseImage.find('img').attr('src')) {
          var $container = $this.parents('.paragraphs-item-type-image-tooltips');
          if (!$container.find('.tooltips-empty-warning').length) {
            var warningMessage = Drupal.theme('tooltip_warning');
            $(warningMessage).insertBefore($this.parents('.field-name-field-tooltips-content'));
            $this.blur();
          }

          return false;
        }

        // Remove saved tooltip.
        $baseImage.find('.tip[data-delta="' + $this.attr('id') + '"]').remove();
        $this.siblings('.tooltip-config-link').remove();

        var $savedPositionsInput = $this.parents('.field-name-field-tooltips-content').siblings('.field-name-field-tooltips-data input');

        var savedData = $savedPositionsInput.val();
        if (savedData) {
          var savedJson = JSON.parse(savedData);
          savedJson = $.grep(savedJson, function(icon, key) {
            return $this.attr('id') != icon.delta;
          });
          $savedPositionsInput.val(JSON.stringify(savedJson));
        }
      });

      // Save tooltip position in JSON.
      $('.field-name-field-tooltip-base-image', context).once('change-position').on('dragstop',function(ev, ui) {
        var $this = $(this);
        var icon = {
          nid: $(ev.target).data('nid'),
          title: $(ev.target).data('title'),
          src: $(ev.target).data('src'),
          delta: $(ev.target).data('delta'),
          left: ui.position.left,
          top: ui.position.top
        };
        var $savedPositionsField = $this.siblings('.field-name-field-tooltips-data');

        var savedData = $savedPositionsField.find('input').val();
        var savedJson;
        if (savedData) {
          savedJson = JSON.parse(savedData);
          savedJson = $.grep(savedJson, function(icon, key) {
            return $(ev.target).data('delta') != icon.delta;
          });
        }
        else {
          savedJson = []
        }
        savedJson.push(icon);
        $savedPositionsField.find('input').val(JSON.stringify(savedJson));
      });

      // Highlight active tooltip.
      $tooltipsContainer.on('click', '.tooltip-configure-link', function(event, node) {
        var $this = $(this);
        var $conatiner = $this.closest('.paragraphs-item-type-image-tooltips');
        $conatiner.find('.tip').removeClass('active');
        var nid = $this.data('nid');
        $conatiner.find('.tip[data-nid="' + nid + '"]').addClass('active');
        event.preventDefault();
      });

      // Close warning message.
      $tooltipsContainer.on('click', '.tooltips-empty-warning .closebtn', function(event, node) {
        $(this).parent().remove();
      });

      // Add tooltips links that were removed during form rebuild.
      $(document).ajaxComplete(function() {
        $tooltipsContainer.find('.field-name-field-tooltips-data').each(function() {
          var $this = $(this);
          var $tooltipsContentField = $this.siblings('.field-name-field-tooltips-content');
          if (!$tooltipsContentField.find('.tooltip-config-link').length) {
            var tooltisValue = $this.find('input').val();
            if (tooltisValue) {
              var tooltipsData = JSON.parse(tooltisValue);
              var configLink;
              $.each(tooltipsData, function(index, icon) {
                configLink = Drupal.theme('tooltip_config_link', icon.nid);
                $(configLink).insertAfter($tooltipsContentField.find('input[id^="' + icon.delta + '"].form-text'));
              });
            }
          }
        });
      });

    }
  }
})(jQuery, Drupal);
