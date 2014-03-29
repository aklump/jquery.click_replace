/*
 * Click Replace jQuery JavaScript Plugin v0.2
 * http://www.intheloftstudios.com/packages/jquery/jquery.click_replace
 *
 * Click on element and it's replaced with another.
 *
 * Copyright 2013, Aaron Klump
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Sat Mar 29 15:24:28 PDT 2014
 */
;(function($, undefined) {
"use strict";

$.fn.clickReplace = function($replaceElement, options) {
  var $clickElement = $(this);

  // Create some defaults, extending them with any options that were provided
  var settings = $.extend({}, $.fn.clickReplace.defaults, options);  

  if (!$replaceElement) {
    $replaceElement = $($clickElement.data('replace'));
  }

  // Do nothing when nothing selected
  if ($clickElement.length !== 1) {
    //console.log('Only one click element may be passed at at time.');
    return;
  }
  else if ($replaceElement.length === 0) {
    //console.log('Missing replacement element ' + $clickElement.data('replace'));
    return;
  }

  $clickElement
  .show()
  .add($replaceElement).not('.' + settings.cssPrefix + 'processed')
  .addClass(settings.cssPrefix + 'processed ' + settings.cssPrefix + 'click')
  .filter($replaceElement)
  .removeClass(settings.cssPrefix + 'click')
  .addClass(settings.cssPrefix + 'replace');


  // Hide the replace element
  $replaceElement
  .addClass(settings.cssPrefix + 'hidden')
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
    .removeClass(settings.cssPrefix + 'hidden')
    .show();

    if (settings.replaceCallback) {
      settings.replaceCallback($clickElement, $replaceElement);
    }
  });

  // Create a response object that contains the revert method
  var response = {};
  response.args = [$clickElement, $replaceElement, settings];
  response.revert = function() {
    $replaceElement.addClass(settings.cssPrefix + 'hidden').hide();
    $clickElement.removeClass(settings.cssPrefix + 'hidden').show();
  };

  return response;
};

$.fn.clickReplace.defaults = {
  // Apply css cursor to the click element; set to false for no affect
  cursor         :'pointer',
  
  // Resize the click element to match the replace element; useful when using
  // an <img> as click for a youtube embed as replace.
  autoResize            : true,

  // A function to call when replacing
  replaceCallback       : null,

  // A prefix for all css classes
  cssPrefix             : 'cr-'
};

$.fn.clickReplace.version = function() { return '0.1'; };

})(jQuery);