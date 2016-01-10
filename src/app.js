// Functions

function initializeRoutes() {
  var routes = {
      '/:bookId/:page': loadBook
    };
  var router = Router(routes);
  router.init();
}

//function initializeKeybindings() {}

//function loadTextToCanvas() {}


function loadBook(book, page) {
  console.log("load book: " + book + page);







}

// loadTextToCanvas() -> dom manipulation
// loadAnnotationLayer()




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
    //initializeKeybindings();


});
