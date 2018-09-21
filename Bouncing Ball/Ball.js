function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.speed = createVector(random(-2, 2), random(-2, 2));
  this.col = new col(51, 51, 51);

  this.show = function() {
    noStroke();
    fill(this.col.r, this.col.g, this.col.b);
    ellipse(this.x, this.y, 5);
  }
  this.update = function() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    if(this.x >= width) {
      this.speed.x *= -1;
      this.hit();
    }
    if(this.x <= 0) {
      this.speed.x *= -1;
      this.hit();
    }
    if(this.y >= height) {
      this.speed.y *= -1;
      this.hit();
    }
    if(this.y <= 0) {
      this.speed.y *= -1;
      this.hit();
    }
  }
  function col(r, g, b) {
    this.r= r;
    this.g = g;
    this.b = b;
  }
  this.hit = function() {
    this.col.r = floor(random(255));
    this.col.g = floor(random(255));
    this.col.b = floor(random(255));
    populate(100, 100);
  }
  this.steer = function(dir) {
    var lc = createVector(this.x, this.y);
    var d = dir.sub(lc);
    d.normalize();
    this.x += d.x;
    this.y += d.y;
  }

}
