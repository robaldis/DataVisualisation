function Method (method, img, percent, total, maxY, minY, x, y) {
    this.maxY = maxY;
    this.minY = minY;
    this.img = img;
    this.method = method;
    this.percent = percent;
    this.total = total;
    this.x = x;
    this.y = y;

    this.draw = function () {

        image(img,this.x, this.y-img.height, img.width, img.height);
    }
}