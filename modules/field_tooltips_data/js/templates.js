/**
 * @file
 * Templates for tooltips.
 */

(function ($) {

  Drupal.theme.prototype.image_tooltip_icon_form = function(icon) {
    var html = '';
    html += '<div class="tip ui-draggable" id="tooltip-icon-' + icon.nid + '" data-nid="' + icon.nid + '" data-title="' + icon.title + '" data-src="' + icon.src + '" data-delta="' + icon.delta + '" style="position: relative; left: ' + icon.left + 'px; top: ' + icon.top + 'px;">';
    html += '<img class="tooltip-icon" src="' + icon.src + '" title="' + icon.title + '">';
    html += '</div>';
    return html;
  };

  Drupal.theme.prototype.image_tooltip_icon_view = function(icon) {
    var html = '';
    html += '<div class="tip" data-nid="' + icon.nid + '" style="position: relative; left: ' + icon.left + 'px; top: ' + icon.top + 'px;">';
    html += '<a href="/tooltip/' + icon.nid + '/nojs" class="ctools-use-modal ctools-modal-tooltip" title="' + icon.title + '">';
    html += '<img class="tooltip-icon" id="tooltip-icon-' + icon.nid + '" src="' + icon.src + '">';
    html += '</a>';
    html += '</div>';
    return html;
  };

  Drupal.theme.prototype.tooltip_config_link = function(nid) {
    var html = '';
    html += '<div class="tooltip-config-link">';
    html += '<a href="#tooltip-icon-' + nid + '" class="tooltip-configure-link" data-nid="' + nid + '">';
    html += Drupal.t('Canage position for this tooltip');
    html += '</a>';
    html += '</div>';
    return html;
  };

})(jQuery);
