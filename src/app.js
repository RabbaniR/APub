// Functions

function initializeRoutes() {
  var routes = {
      '/:bookId/:page': loadBook
    };
  var router = Router(routes);
  router.init();
}

function initializeEvents() {
  // Window resize
  $( window ).resize(function() {
    // TODO BUG this causes canvas text to disappear
    //resizeEveryCanvas();
  });
}


//function loadTextToCanvas() {}

function resizeCanvas(id) {
  var canvas = id ? $('canvas#'+ id) : $('canvas');
  canvas.map(function(i, el){
    el.height = $(window).height();
    el.width = 700;
  });
}

function addCanvas(id) {
  $('#app').append('<canvas id="' + id + '" class="fullscreen"></canvas>');
  resizeCanvas(id);
  return document.getElementById(id);
}

function loadBook(book, page) {
  console.log("load book: " + book + page);
  $('#app').empty();

  var text = AnnotatedSets[book].initial_pages[page];
  loadTextToCanvas(text);

  //loadHistoryLayer();

  loadAnnotationLayer();
}

function loadTextToCanvas(text) {
  var canvas = addCanvas("Text");

  CanvasTextWrapper(canvas, text, {
		font: '16px Helvetica, sans-serif',
		verticalAlign: 'middle',
    textAlign: 'center',
    justifyLines: true,
		allowNewLine: true,
		lineHeight: '150%'
	});
}

function loadHistoryLayer(level, image) {
  var canvas = addCanvas("Layer" + level);

}

function loadAnnotationLayer() {
  var canvas = addCanvas("Sketch");
  $(canvas).sketch();

}


// loadPreviousPage()
// loadNextPage()



// Annotating UI
// chooseColor()
// chooseSize()
// clearA()




// Initialize
$(document).ready(function() {
    console.log( "ready!" );
    initializeRoutes();
    initializeEvents();


});
