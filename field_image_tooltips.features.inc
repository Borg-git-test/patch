<?php
/**
 * @file
 * field_image_tooltips.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function field_image_tooltips_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function field_image_tooltips_image_default_styles() {
  $styles = array();

  // Exported image style: original.
  $styles['original'] = array(
    'label' => 'Original',
    'effects' => array(),
  );

  return $styles;
}

/**
 * Implements hook_paragraphs_info().
 */
function field_image_tooltips_paragraphs_info() {
  $items = array(
    'image_tooltips' => array(
      'name' => 'Image with tooltips',
      'bundle' => 'image_tooltips',
      'locked' => '1',
    ),
  );
  return $items;
}
