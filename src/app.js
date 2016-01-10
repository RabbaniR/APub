// Global vars
var BookId;
var Page;
var BookStorage;
var Book;

// Initialize
$(document).ready(function() {
    initializeRoutes();
});


function initializeRoutes() {
  var routes = {
      '/:bookId/:page': loadBook
    };
  var router = Router(routes);
  router.init();
}

function initializeEvents() {
  // Arrow navigation
  $(window).keyup(function(ev) {
      var book_length = Book.initial_pages.length;

      switch(ev.keyCode) {
        case 37: //left
          if (Page > 0) { loadPage(Page - 1); }
          break;

        case 39: //right
          if (Page < book_length - 1) { loadPage(Page + 1); }
          break;
      }
   });

   // Back and download
  $("#back").click(function() {
    window.location = "/APub/";
  });

  $('#download').attr( "download", BookId + ".apub.json" );
  $('#download').attr( "href", "data:text," + JSON.stringify(BookStorage.load(BookId)));

  // Listen for clicks and save
  $('#Sketch').bind( "mouseup touchend", function() {
    saveAnnotations();
  });

}


function loadBook(bookid, page) {
  BookId = bookid;
  Page = parseInt(page);
  BookStorage = new LStorage(BookId);
  Book = BookStorage.load(BookId);

  $('#app').empty();
  var text = Book.initial_pages[Page];
  loadTextToCanvas(text);
  Book.annotation_sets.map(function(set, i){
    if (set[Page]) {
      loadHistoryLayer(i, set[Page]);
    }
  });

  loadAnnotationLayer();

  initializeEvents();
}


function addCanvas(id) {
  $('#app').append('<canvas id="' + id + '" class="fullscreen"></canvas>');
  resizeCanvas(id);
  return document.getElementById(id);
}


function resizeCanvas(id) {
  var canvas = id ? $('canvas#'+ id) : $('canvas');
  canvas.map(function(i, el){
    el.width = 740;
    el.height = 860;
  });
}

function loadTextToCanvas(text) {
  var canvas = addCanvas("Text");
  CanvasTextWrapper(canvas, text, {
		font: '18px TimesNewRoman, serif',
		verticalAlign: 'top',
    paddingX: 100,
    paddingY: 60,
		allowNewLine: true,
		lineHeight: '200%'
	});
}

function loadHistoryLayer(level, data) {
  var canvas = addCanvas("Layer" + level);
  var context = canvas.getContext("2d");

  var drawing = new Image();
  drawing.src = data;
  context.drawImage(drawing,0,0);
}

function loadAnnotationLayer() {
  var canvas = addCanvas("Sketch");
  $(canvas).sketch();
  $(canvas).sketch('size', 1);

}

function saveAnnotations() {
  var canvas = document.getElementById("Sketch");
  var context = canvas.getContext("2d");
  var img = canvas.toDataURL("image/png");

  BookStorage.updatePage(BookId, Page, img);
}


function loadPage(page) {
  window.location.hash = '#/' + BookId + '/' + page;
}
