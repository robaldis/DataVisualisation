function FoodPurcheses74_18() {
    this.data;

    this.name = 'Food Purcheses 74-18';

    this.id = 'food-purcheses-74-18';

    this.loaded = false;

    this.bubbles;
    this.years;

    var c, b;

    this.preload = function () {
        var self = this;
        this.data = loadTable('/data/familyFood/foodPurcheses_1974-2018.csv', 'csv', 'header', function(table) {
            self.loaded = true;
        });
    }

    this.setup = function () {
        c = createCanvas(512,512);
        c.parent('app');

        d = createDiv("").id('buttons')
        d.parent('year-div')
        this.bubbles = [];
        this.years = [];

        for (var i = 5; i < this.data.getColumnCount(); i++) {
            var s = this.data.columns[i]
            this.years.push(s);
            var b = createButton(s)
            b.parent('buttons')
            var self = this;
            b.mousePressed(function () {
                console.log(this.elt.innerHTML)
                var yearString = this.elt.innerHTML
                var yearIndex = self.years.indexOf(yearString)
                for (var i = 0; i < self.bubbles.length; i++) {
                    self.bubbles[i].setYear(yearIndex)
                }
            })
        }



        for (var i = 0; i < this.data.getRowCount(); i++) {
            var r = this.data.getRow(i);
            var name = r.getString("L1")
            if (r.getString("L1") != "") {
                var d = [];
                for (var j = 0; j < this.years.length; j++) {
                    var v = Number(r.get(this.years[j]));
                    d.push(v);
                }
                var b = new Bubble(name, d);

                b.setYear(35);
                this.bubbles.push(b);

            }
        }
    }

    this.destroy = function () {
        yearDiv = select('#buttons');
        yearDiv.remove();

        c = createCanvas(1024,576);
        c.parent('app');
    }

    this.draw = function () {
        background(100);

        push();
        textAlign(CENTER)
        translate(width/2,height/2);
        for (var i = 0; i < this.bubbles.length; i++) {
            this.bubbles[i].updateDir(this.bubbles);
            this.bubbles[i].draw();
        }
        pop();
    }


    function Bubble(_name, data) {
        var getRandomID = function () {
            var alpha = 'abcdefghijklmnopqrstuv0123456789'
            var s = "";
            for (var i = 0; i < 10; i++) {
                s += alpha[floor(random(0,alpha.length))]
            }
            return s

        }



        this.name = _name;
        this.id = getRandomID();

        this.pos = createVector(0,0);
        this.dir = createVector(0,0);

        this.colour = color(random(0,255),random(0,255),random(0,255));
        this.size = 20;
        this.targetSize = this.size;

        this.data = data;

        this.draw = function () {


            fill(this.colour)
            ellipse(this.pos.x, this.pos.y, this.size)

            noStroke()
            fill(0)
            text(this.name,this.pos.x,this.pos.y)


            this.pos.add(this.dir);

            if (this.size < this.targetSize) {
                this.size += 1;
            } else if (this.size > this.targetSize) {
                this.size -= 1;
            }

        }
        this.setYear = function (year_index) {
            var v = this.data[year_index]
            this.targetSize = map(v, 0, 3600, 5,200);
        }
        this.updateDir = function (_bubbles) {
            this.dir = createVector(0,0)
            for (var i = 0; i < _bubbles.length; i++) {
                if (_bubbles[i].id != this.id) {
                    var v = p5.Vector.sub(this.pos, _bubbles[i].pos);
                    var d = v.mag();
                    if (d < this.size / 2 + _bubbles[i].size/2) {
                        if (d == 0) {
                            this.dir.add(p5.Vector.random2D());
                        } else {
                            // There is a collision
                            this.dir.add(v);
                        }
                    }
                }
            }
            this.dir.normalize();
        }


    }

}