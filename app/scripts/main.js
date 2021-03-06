﻿var TypingColors = (function($) {
  'use strict';

  // Elements to show colors and text
  var $canvas;
  var context;
  var $textContent;

  // Buttons
  var $toggleModeButton;
  var $textButton;
  var $showKeyboardButton;

  // Dark background div
  var $darkBackground;

  // Keyboard panel
  var $keyboardPanel;

  // Canvas position indexes for painting
  var i = 0;
  var j = 0;

  // Size of the square to be painted
  var squareSize = 40;

  // Canvas width and height
  var canvasWidth;
  var canvasHeight;

  // Map to store the custom color for each key
  var colors = {};

  // Map to store the gradient default color for each key
  var gradientColors = {};

  // Available modes
  var COLORS = 0;
  var TEXT = 1;

  var enabledMode = COLORS;

  function setDefaultGradientColors() {
    
    // First keyboard row
    gradientColors['81'] = ['#ff6b00', '#ffea00'];
    gradientColors['87'] = ['#ffea00', '#bbff00'];
    gradientColors['69'] = ['#bbff00', '#39ff00'];
    gradientColors['82'] = ['#39ff00', '#00ff1a'];
    gradientColors['84'] = ['#00ff1a', '#00ff8e'];
    gradientColors['89'] = ['#00ff8e', '#00fff6'];
    gradientColors['85'] = ['#00fff6', '#00a4ff'];
    gradientColors['73'] = ['#00a4ff', '#001fff'];
    gradientColors['79'] = ['#001fff', '#3400ff'];
    gradientColors['80'] = ['#3400ff', '#b100ff'];

    // Second keyboard row
    gradientColors['65'] = ['#ff8a00', '#fffa00'];
    gradientColors['83'] = ['#fffa00', '#a2ff00'];
    gradientColors['68'] = ['#a2ff00', '#24ff00'];
    gradientColors['70'] = ['#24ff00', '#00ff2d'];
    gradientColors['71'] = ['#00ff2d', '#00ffa3'];
    gradientColors['72'] = ['#00ffa3', '#00fbff'];
    gradientColors['74'] = ['#00fbff', '#0086ff'];
    gradientColors['75'] = ['#0086ff', '#000cff'];
    gradientColors['76'] = ['#000cff', '#4b00ff'];

    // Third keyboard row
    gradientColors['90'] = ['#ffd000', '#dcff00'];
    gradientColors['88'] = ['#dcff00', '#5fff00'];
    gradientColors['67'] = ['#5fff00', '#00ff05'];
    gradientColors['86'] = ['#00ff05', '#00ff69'];
    gradientColors['66'] = ['#00ff69', '#00ffe1'];
    gradientColors['78'] = ['#00ffe1', '#00c7ff'];
    gradientColors['77'] = ['#00c7ff', '#003fff'];
    gradientColors['188'] = ['#003fff', '#1800ff'];
    gradientColors['190'] = ['#1800ff', '#8d00ff'];

    // Enter key
    gradientColors['32'] = ['#5fff00', '#003fff'];
  }

  setDefaultGradientColors();

  return {
    setCanvas: function(canvas) {
      $canvas = $(canvas);
      context = $canvas[0].getContext('2d');
    },

    setTextContent: function(textContent) {
      $textContent = $(textContent);
      $textContent.get(0).textContent = '';
    },

    setToggleModeButton: function(button) {
      $toggleModeButton = $(button);
    },

    setTextButton: function(button) {
      $textButton = $(button);
    },

    setShowKeyboardButton: function(showKeyboardButton) {
      $showKeyboardButton = $(showKeyboardButton);
    },

    setSquareSize: function(newSize) {
      squareSize = newSize;
    },
    
    setDarkBackground: function(darkBackground) {
      $darkBackground = $(darkBackground);
    },

    setKeyboardPanel: function(keyboardPanel) {
      $keyboardPanel = $(keyboardPanel);
    },

    getSize: function() {
      return squareSize;
    },

    setCanvasWidth: function(width) {
      canvasWidth = width;
    },

    setCanvasHeight: function(height) {
      canvasHeight = height;
    },

    incrementX: function() {
      i += squareSize;
      return i;
    },

    decrementX: function() {
      i -= squareSize;
      return i;
    },

    resetX: function() {
      i = 0;
      return i;
    },

    getX: function() {
      return i;
    },

    incrementY: function() {
      j++;
      return j;
    },

    decrementY: function() {
      j--;
      return j;
    },

    resetY: function() {
      j = 0;
      return j;
    },
    
    getY: function() {
      return j;
    },

    addNewLine: function() {
      this.incrementY();
      this.resetX();
    },

    paintSquare: function(keyCode) {
      
    },

    paintGradientSquare: function(context, keyCode) {
      context.beginPath();
      var grd = context.createLinearGradient(i, 0, i + squareSize, 0);
      grd.addColorStop(0, gradientColors[keyCode][0]);
      grd.addColorStop(1, gradientColors[keyCode][1]);
      context.fillStyle = grd;
      context.fillRect(i, squareSize * j, squareSize, squareSize);
    },

    removeLastSquare: function(context) {
      context.clearRect(i - squareSize, squareSize * j, squareSize, squareSize);
      this.decrementX();
    },

    addCharacter: function(character) {
      $textContent.get(0).textContent += character;
    },

    addCharacterByCharCode: function(charCode) {
      var character = String.fromCharCode(charCode);
      $textContent.get(0).textContent += character;
    },

    removeLastCharacter: function() {
      var oldText = $textContent.get(0).textContent;
      $textContent.get(0).textContent = oldText.substring(0, oldText.length - 1);
    },

    setMode: function(mode) {
      if (mode === TEXT) {
        $textButton.addClass('invisible');
        $canvas.addClass('invisible');
        $textContent.removeClass('invisible');
        $textContent.focus();
        enabledMode = TEXT;
      }
      else {
        $textButton.removeClass('invisible');
        $canvas.removeClass('invisible');
        $textContent.addClass('invisible');
        enabledMode = COLORS;
      }
    },

    getEnabledMode: function() {
      return enabledMode;
    },

    keyDownHandler: function(e) {
      
      //console.log(e.keyCode);

      if (e.keyCode === 32) {

        // Add an space character
        if (enabledMode === COLORS) {

          // Don't move scroll when space key is pressed
          e.preventDefault();
          e.stopPropagation();

          this.addCharacter(' ');
        }

        return;
      }

      // Remove last square when the backspace key is pressed
      if (e.keyCode === 8) {
        this.removeLastSquare(context);

        if (enabledMode === COLORS) {
          this.removeLastCharacter();
        }

        return;
      }
      
      // Add a new line when the enter key is pressed
      if (e.keyCode === 13) {
        this.addNewLine();
        return;
      }

      // Paint a squared color
      this.paintGradientSquare(context, e.keyCode + '');
      this.incrementX();

      // If the horizontal limit of the canvas is reached, add a new line
      if (i >= canvasWidth) {
        this.addNewLine();
      }
    },

    keyPressHandler: function(e) {
      if (enabledMode === COLORS) {
        this.addCharacterByCharCode(e.which);
      }
    },

    mouseDownHandler: function(e) {

      // Avoid selecting content
      e.preventDefault();
    },

    toggleButtonClickHandler: function() {
      if (enabledMode === TEXT) {
        this.setMode(COLORS);
      }
      else {
        this.setMode(TEXT);
      }
    },

    showKeyboardButtonClickHandler: function() {
      $darkBackground.show();
      $keyboardPanel.parent().show();

      // Hack for some browsers
      setTimeout(function() {
      
        // Show dark background and keyboard panel config
        $darkBackground.removeClass('hide');
        $keyboardPanel.removeClass('hide');
      }, 50);
    },

    darkBackgroundClickHandler: function() {
      $darkBackground.on('transitionend webkitTransitionEnd', function() {
        $darkBackground.hide();
        $darkBackground.off('transitionend webkitTransitionEnd');
      });

      $keyboardPanel.on('transitionend webkitTransitionEnd', function() {
        $keyboardPanel.parent().hide();
        $keyboardPanel.off('transitionend webkitTransitionEnd');
      });

      // Hide dark background and keyboard panel config
      $darkBackground.addClass('hide');
      $keyboardPanel.addClass('hide');
    }
  };

}(jQuery));

(function(window, $, TypingColors) {

  'use strict';

  var $canvas = $('canvas');
  var $window = $(window);
  var $toggleModeButton = $('#toggle');
  var $showKeyboardButton = $('#show-keyboard');
  var $darkBackground = $('#dark-background');

  // Initialize width and height
  $canvas[0].width = $window.width();
  $canvas[0].height = $window.height();

  [$('html'), $('body'), $('canvas')].forEach(function($element) {
    $element.css('width', $window.width() + 'px');
    $element.css('height', $window.height() + 'px');
  });

  // Initialize TypingColors
  TypingColors.setCanvas($canvas[0]);
  TypingColors.setCanvasWidth($canvas.width());
  TypingColors.setCanvasHeight($canvas.height());
  TypingColors.setSquareSize(40);
  TypingColors.setTextButton($('#change-to-text')[0]);
  TypingColors.setTextContent($('#text-content')[0]);
  TypingColors.setDarkBackground($('#dark-background')[0]);
  TypingColors.setKeyboardPanel($('#keyboard-panel')[0]);
  TypingColors.setToggleModeButton($toggleModeButton[0]);
  TypingColors.setShowKeyboardButton($showKeyboardButton[0]);

  // TODO: Change this to an initialize method of TypingColors
  // Listen events
  $window.on('keydown', TypingColors.keyDownHandler.bind(TypingColors));
  $window.on('keypress', TypingColors.keyPressHandler.bind(TypingColors));
  $toggleModeButton.on('click', TypingColors.toggleButtonClickHandler.bind(TypingColors));
  $toggleModeButton.on('mousedown', TypingColors.mouseDownHandler.bind(TypingColors));
  $showKeyboardButton.on('click', TypingColors.showKeyboardButtonClickHandler.bind(TypingColors));
  $darkBackground.on('click', TypingColors.darkBackgroundClickHandler.bind(TypingColors));

}(window, jQuery, TypingColors));


