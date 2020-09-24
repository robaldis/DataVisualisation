function SuicideByMethod() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Suicide by method';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'suicide-by-method';

  this.needsUpdating = true;
  // Property to represent whether data has been loaded.
  this.loaded = false;

  this.plcArea = [[50,170], // star
                  [212,220], // tower
                  [220,263], // trees
                  [260,289], // flowers
                  [310,360], // sandcastle
                  [400,480], // boat
                  [510,510] // grass
                  ];
  this.methImages = ["star.png","tower.png","tree.png","flower.png","sandCastle.png","boat.png","grass.png"];
  this.loadedImg = [];
  this.method = [];
  this.tiles = [];



  // Image size constants
  const BACKGROUND_WIDTH = width;  // as wide as the canvas
  const BACKGROUND_HEIGHT = height*0.85; // 90% of the canvas height

  const Deaths2018 = 6500;
  const PPT = 10; // Person Per Tile, how many people are represented per tile


  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    // populate all the images for each method.
    for (var i = 0; i < this.methImages.length; i++) {
      this.loadedImg.push(loadImage("assets/tiles/" + this.methImages[i]));
    }
    // Load the background
    this.image = loadImage("assets/suicideBackground_3.jpg");
    // Load the data
    this.data = loadTable(
      './data/suicide/suicideData.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function() { // When done populate all the objects with the data.
        self.loaded = true;
        self.populateTiles();
      });
  };

  this.quickSort = function(originalArr) {
    if (originalArr.length <= 1) {
       return originalArr;
    } else {
      var leftArr = [];
      var rightArr = [];
      var newArr = [];
      var pivot = originalArr.pop(); //  Take a pivot value
      var length = originalArr.length;
      for (var i = 0; i < length; i++) {
        if (originalArr[i].y <= pivot.y) { // using pivot value start comparing
          leftArr.push(originalArr[i]);
        } else {
          rightArr.push(originalArr[i]);
        }
      }
    return newArr.concat(this.quickSort(leftArr), pivot, this.quickSort(rightArr));
  }
 }

  this.populateTiles = function() {

    // The max in min value of x for the tile
    var maxX = BACKGROUND_WIDTH;
    var minX = 20;

    // This is going to populate the tiles array with all the objects that need to show up on the screen.
    // For every catorgory in the data
    for (var i = 0; i < this.data.getRows().length; i++) {
      var row = this.data.getRows()[i];

      var method = row.getString(0);
      this.method.push(method);
      // Add up the total percent for male and female
      var percent = row.getNum(1) + row.getNum(2);
      // convert that percent into number of people
      var total = floor((((percent/100)/2) * Deaths2018)/PPT);

      var maxY = this.plcArea[i][0];
      var minY = this.plcArea[i][1];


      for (var j = 0; j < total; j++) {
        var img = this.loadedImg[i];
        // pick a random place for the x aand y within the range
        var x = random(minX,maxX);
        var y = random(minY, maxY);
        // Add a new Tile to the tiles with all the data to represent each one.
        this.tiles.push(new Method(method, img, percent, total, maxY, minY, x, y));
      }
    }
    // Allows us to draw the tiles from top to bottom so there is not overlaping
    this.tiles = this.quickSort(this.tiles);
  };


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
    // Draw background image
    image(this.image, 20, 20, BACKGROUND_WIDTH, BACKGROUND_HEIGHT)
    // Draw each tile
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw();
    }

    // Draw all the extra bits to understand the image.
    this.drawKey();

  };

  this.drawKey = function () {
    textAlign(LEFT);
    text ("Each tile represents 10 people died by each catagory", 20,35)
    for (var i = 0; i < this.loadedImg.length; i++) {
      image(this.loadedImg[i], 30+i*150, 520, 32,32);
      textAlign(CENTER)
      text(this.method[i], 30+i*150, 565)
    }
  }










}
