function CommonWordsOnTwitter() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Common words on twitter';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'common-words-on-twitter';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  this.bubbles = [];

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    // Load the data
    this.data = loadTable(
      './data/mostUsedWords/mostUsedWordsOnTwitter.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(data) { // When done populate all the objects with the data.
        self.loaded = true;
        self.populateBubbles(data);

      });
  };

  this.populateBubbles = function (data) {
    for (var i=0; i < data.getRows().length; i++) {
      row = data.getRows()[i]
      this.bubbles.push(new WordBubble(random(100 ,width-100), random(100, height-100),row.getString(0),row.getNum(1), color(random(100,255),random(100,255),random(100,255))));
    }
  }


  this.setup = function() {
    // Font defaults.
    textSize(16);
  };

  this.destroy = function() {

  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    background(240);

    for (var i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].update(this.bubbles);
    }

    for (var i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].draw();
    }

    text ("Most common words used on twitter", width/2, 30)

    console.log(this.bubbles[0])
  };











}
