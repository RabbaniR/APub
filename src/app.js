// Functions

function initializeRoutes() {
  var routes = {
      '/:bookId/:page': loadBook
    };
  var router = Router(routes);
  router.init();
}

function initializeEvents() {
  $( window ).resize(function() {
    //resizeEveryCanvas();
  });

  $(window).keyup(function(ev) {
      var hash = window.location.hash.split('/');
      var bookid = hash[1];
      var page = parseInt(hash[2]);
      var book_length = AnnotatedSets[bookid].initial_pages.length;

      switch(ev.keyCode) {
        // left
        case 37:
          if (page > 0) {
            loadPage(page - 1);
          }
          break;

        //right
        case 39:
          if (page < book_length - 1) {
            loadPage(page + 1);
          }
          break;
      }


   });

}

function resizeCanvas(id) {
  var canvas = id ? $('canvas#'+ id) : $('canvas');
  canvas.map(function(i, el){
    el.width = 740;
    el.height = 800;
  });
}

function addCanvas(id) {
  $('#app').append('<canvas id="' + id + '" class="fullscreen"></canvas>');
  resizeCanvas(id);
  return document.getElementById(id);
}

function loadBook(bookid, page) {
  $('#app').empty();
  var book = AnnotatedSets[bookid];
  var text = book.initial_pages[page];
  loadTextToCanvas(text);

  book.annotation_sets.map(function(set, i){
    if (set.annotated_pages[page]) {
      loadHistoryLayer(level, set.annotated_pages[page]);
    }
  });

  loadAnnotationLayer();
}

function loadTextToCanvas(text) {
  var canvas = addCanvas("Text");
  CanvasTextWrapper(canvas, text, {
		font: '16px Helvetica, sans-serif',
		verticalAlign: 'top',
    paddingX: 105,
    paddingY: 40,
		allowNewLine: true,
		lineHeight: '150%'
	});
}

function loadHistoryLayer(level, data) {
  var canvas = addCanvas("Layer" + level);
  var context = canvas.getContext("2d");

  context.putImageData(data, 0, 0);
}

function loadAnnotationLayer() {
  var canvas = addCanvas("Sketch");
  $(canvas).sketch();
  $(canvas).sketch('size', 1);

}

function saveAnnotations() {
  var canvas = document.getElementById("Sketch");
  var context = canvas.getContext("2d");
  var data = context.getImageData(0, 0, canvas.width, canvas.height);

  return data;
}


function loadPage(page) {
  var hash = window.location.hash.split('/');

  window.location.hash = '#/' + hash[1] + '/' + page;
}




// Initialize
$(document).ready(function() {
    console.log( "ready!" );
    initializeRoutes();
    initializeEvents();


});
