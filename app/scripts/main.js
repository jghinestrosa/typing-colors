(function(window, document, $) {

  var colors = {};
  var $canvas = $('canvas');
  var context = $canvas[0].getContext('2d');

  // Parent elements
  var elements = [$('html'), $('body'), $canvas];

  // Indexes for canvas position of painting
  var i = 0;
  var j = 0;

  // Size of the square to be painted
  var size = 40;

  // Width and height of the initial window
  var width = $(window).width();
  var height = $(window).height();

  var COLORS = 0;
  var TEXT = 1;
  var $toggleButton = $('#toggle');
  var $textButton = $('#change-to-text');
  var enabledMode = COLORS;

  // First row
  colors['81'] = ['#ff6b00', '#ffea00'];
  colors['87'] = ['#ffea00', '#bbff00'];
  colors['69'] = ['#bbff00', '#39ff00'];
  colors['82'] = ['#39ff00', '#00ff1a'];
  colors['84'] = ['#00ff1a', '#00ff8e'];
  colors['89'] = ['#00ff8e', '#00fff6'];
  colors['85'] = ['#00fff6', '#00a4ff'];
  colors['73'] = ['#00a4ff', '#001fff'];
  colors['79'] = ['#001fff', '#3400ff'];
  colors['80'] = ['#3400ff', '#b100ff'];

  // Second row
  colors['65'] = ['#ff8a00', '#fffa00'];
  colors['83'] = ['#fffa00', '#a2ff00'];
  colors['68'] = ['#a2ff00', '#24ff00'];
  colors['70'] = ['#24ff00', '#00ff2d'];
  colors['71'] = ['#00ff2d', '#00ffa3'];
  colors['72'] = ['#00ffa3', '#00fbff'];
  colors['74'] = ['#00fbff', '#0086ff'];
  colors['75'] = ['#0086ff', '#000cff'];
  colors['76'] = ['#000cff', '#4b00ff'];

  // Third row
  colors['90'] = ['#ffd000', '#dcff00'];
  colors['88'] = ['#dcff00', '#5fff00'];
  colors['67'] = ['#5fff00', '#00ff05'];
  colors['86'] = ['#00ff05', '#00ff69'];
  colors['66'] = ['#00ff69', '#00ffe1'];
  colors['78'] = ['#00ffe1', '#00c7ff'];
  colors['77'] = ['#00c7ff', '#003fff'];
  colors['188'] = ['#003fff', '#1800ff'];
  colors['190'] = ['#1800ff', '#8d00ff'];

  // Enter
  colors['32'] = ['#5fff00', '#003fff'];

  // Initialize parent elements size
  $canvas[0].width = width;
  $canvas[0].height = height;
  elements.forEach(function($element) {
     $element.css('width', width + 'px');
     $element.css('height', height + 'px');
  });


  $toggleButton.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (enabledMode === TEXT) {
      setMode(COLORS);
    }
    else {
      setMode(TEXT);
    }
  });

  function setMode(mode) {
    if (mode === TEXT) {
      $textButton.removeClass('invisible');
      enabledMode = TEXT;
    }
    else {
      $textButton.addClass('invisible');
      enabledMode = COLORS;
    }
  }

  // Paint a squared gradient
  function paint(keyCode) {
    context.beginPath();
    var grd = context.createLinearGradient(i, 0, i+size, 0);
    grd.addColorStop(0, colors[keyCode][0]);
    grd.addColorStop(1, colors[keyCode][1]);
    context.fillStyle = grd;
    context.fillRect(i, size*j, size, size);
  }

  window.addEventListener('keydown', function(e) {

    // Don't move scroll when enter key is pressed
    if (e.keyCode === 32) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Paint a color
    paint(e.keyCode + '');
    i += size;

    if (i >= $canvas[0].width) {
      j++;
      i = 0;
    }
  });

}(window, document, jQuery));
