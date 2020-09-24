function TechDiversityRacePie(data) {

    this.company = undefined;
    this.select = createSelect()
    this.select.position(width/2, height);

    this.data = data;

    // Create a new pie chart object.
    this.pie = new PieChart(width / 2, height / 2, width * 0.4)

    // Fill the options with all company names.
    var companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }


    this.setPie = function (index, total) {
        var spacing = 500;
        this.select.position(((width + 50 / 2) / total) + index * spacing, height / total)
        this.pie = new PieChart(((width / 2) / total) + index * spacing, ((height / 2)/ total), (width * 0.4)/total)
    }


    this.draw = function () {

        // Get the value of the company we're interested in from the
        // select item.
        var companyName = this.select.value();

        // Get the column of raw data for companyName.
        var col = this.data.getColumn(companyName);

        // Convert all data strings to numbers.
        col = stringsToNumbers(col);

        // Copy the row labels from the table (the first item of each row).
        var labels = this.data.getColumn(0);

        // Colour to use for each category.
        var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];

        // Make a title.
        var title = 'Employee diversity at ' + companyName;

        // Draw the pie chart!
        this.pie.draw(col, labels, colours, title);
    }

    this.setCompany = function (company) {
        this.company = company;
    }

    this.destroy = function () {
        this.select.remove();
    }
}