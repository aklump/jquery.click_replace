/**
 * Click on element and it's replaced with another jQuery plugin
 * 
 * @author Aaron Klump, In the Loft Studios, LLC
 * @see http://www.intheloftstudios.com
 * @see https://github.com/aklump/jquery.click_replace
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
  if (settings.autoResize) {
    //$replaceElement.show();
    var resize = [$replaceElement.css('width'), $replaceElement.css('height')];
    $clickElement.width(resize[0]);
    $clickElement.height(resize[1]);
  }

  //Click handler
  $clickElement
  .show()
  .hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  })
  .click(function () {
    $clickElement
    .hide();
    $replaceElement
    .removeClass('hidden')
    .show();

    if (settings.replaceCallback) {
      settings.replaceCallback($clickElement, $replaceElement);
    }
  });

  // Create a response object that contains the revert method
  var response = {};
  response.args = [$clickElement, $replaceElement, settings];
  response.revert = function() {
    $replaceElement.addClass('hidden').hide();
    $clickElement.removeClass('hidden').show();
  };

  return response;
};

$.fn.clickReplace.ver = function() { return '0.0.3'; };

$.fn.clickReplace.defaults = {
  // Apply css cursor to the click element; set to false for no affect
  cursor         :'pointer',
  
  // Resize the click element to match the replace element; useful when using
  // an <img> as click for a youtube embed as replace.
  autoResize            : true,

  // A function to call when replacing
  replaceCallback       : null
};

})(jQuery);