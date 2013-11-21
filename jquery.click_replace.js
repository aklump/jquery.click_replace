/**
 * Click on element and it's replaced with another jQuery plugin
 *
 * Allows versions of jQuery without .replaceWith to sort of work
 *
 * @param options
 *
 * @return this
 */
;(function($, undefined) {
"use strict";

$.fn.clickReplace = function($replaceElement, options) {

  var $clickElement = $(this);

  // Do nothing when nothing selected
  if ($clickElement.length === 0) {
    return;
  }

  // Create some defaults, extending them with any options that were provided
  var settings = $.extend({}, $.fn.clickReplace.defaults, options);

  // Hide the replace element
  $replaceElement
  .addClass('hidden')
  .hide();

  if (settings.cursor) {
    $clickElement.css({'cursor': settings.cursor});
  }

  // Resize if needed
  if (settings.resize) {
    var resize = [$replaceElement.width(), $replaceElement.height()];
    $clickElement.width(resize[0]);
    $clickElement.height(resize[1]);
  }

  //Click handler
  $clickElement
  .hover(function () {
    $(this).addClass('hover')
  }, function () {
    $(this).removeClass('hover')
  })
  .click(function () {
    $clickElement
    .hide();
    $replaceElement
    .removeClass('hidden')
    .show();

    if (settings.replaceCallback) {
      settings.replaceCallback($clickElement, $replaceElement)
    }
  });

  return this;
};

$.fn.clickReplace.defaults = {
  // Apply css cursor to the click element; set to false for no affect
  cursor         :'pointer',
  
  // Resize the click element to match the replace element; useful when using
  // an <img> as click for a youtube embed as replace.
  resize         : true,   

  // A function to call when replacing
  replaceCallback       : null
};

})(jQuery);