function LStorage(book) {
    //Constructor
    this.allBooks = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : AnnotatedBooks;

    this.load = function(book) {
      return this.allBooks[book];
    };

    this.save = function() {
      localStorage.setItem('Books', JSON.stringify(this.allBooks));
    };

    this.updatePage = function(bookid, page, img) {
  		this.allBooks[bookid].annotation_sets[0][page] = img;
      this.save();
  	};

    this.clear = function(){
      localStorage.clear();
    };

}
