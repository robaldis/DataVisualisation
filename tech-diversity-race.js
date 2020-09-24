function TechDiversityRace() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Race';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-race';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // The list of pie charts that should be showed on screen
  this.companyPies = [];

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // // Create a select DOM element.
    // this.select = createSelect();
    // this.select.position(350, 40);

    // // Fill the options with all company names.
    // var companies = this.data.columns;
    // // First entry is empty.
    // for (let i = 1; i < companies.length; i++) {
    //   this.select.option(companies[i]);
    // }

    this.companyPies = [];

    this.companyPies.push(new TechDiversityRacePie(this.data));
    this.companyPies.push(new TechDiversityRacePie(this.data));



    for (var i = 0; i < this.companyPies.length; i++){
      this.companyPies[i].setPie(i, this.companyPies.length);
    }
  };

  this.destroy = function() {
    for (var i = 0; i < this.companyPies.length; i++) {
      this.companyPies[i].destroy()
    }
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    for (var i = 0; i < this.companyPies.length; i++) {


      this.companyPies[i].draw();


    }
  };
}
