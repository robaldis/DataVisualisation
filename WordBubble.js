function WordBubble (x, y, name, count,colour) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.count = count;
    this.vec = createVector(random(-1,1), random(-1,1));
    this.size;
    this.colour = colour;

    this.draw = function () {
        fill(this.colour);
        this.size = map(this.count, 50, 300, 10, 100);
        ellipse(this.x, this.y, this.size);
        fill(0);
        textSize(20)
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    };

    this.update = function (bubbles) {
        // update x based on dx
        this.x += this.vec.x;
        this.y += this.vec.y;

        // is the bubble cose to a wall
        if (this.x + this.size/2 >= width || this.x - this.size/2 <= 0) {
            this.vec.x = this.vec.x * -1;
        }
        if (this.y + this.size/2 >= height || this.y - this.size/2  <= 0) {
            this.vec.y = this.vec.y * -1;
        }

        for (var i = 0; i < bubbles.length; i++) {
            if (bubbles[i].name == this.name) {
                break;
            } else {
                if (dist(this.x, this.y, bubbles[i].x, bubbles[i].y) < this.size/2 + bubbles[i].size/2) {

                    this.vec.x = ((this.x - bubbles[i].x) * 0.03);
                    this.vec.y = ((this.y - bubbles[i].y) * 0.03);

                    bubbles[i].vec.x = -((this.x - bubbles[i].x) * 0.03);
                    bubbles[i].vec.y = -((this.y - bubbles[i].y) * 0.03);
                }
            }
        }
    }
}