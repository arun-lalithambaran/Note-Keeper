var b = [];
function populate(x, y) {
  b.push(new Ball(x, y, 5));
}
function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.canvas.setAttribute("class", "canvas");
  for(var i = 0; i < 20; i++) {
    b.push(new Ball(random(width), random(height)));
  }
}
function draw() {
  background(64, 71, 109);
  for(var i = 0; i < b.length; i++) {
    b[i].show();
    b[i].update();
    b[i].steer(createVector(mouseX,mouseY));
  }
  if(b.length > 200) {
    b.splice(0, 1);
  }
}
var loc = [];
function mousePressed() {
  for(var i = 0; i < b.length; i++) {
    loc[i] = b[i].speed;
    b[i].speed = createVector(0, 0);
  }
}
function mouseReleased() {
  for(var i = 0; i < b.length; i++) {
    b[i].speed = loc[i];
  }
}
