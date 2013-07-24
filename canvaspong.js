var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var halfWidth = canvas.width / 2;
var halfHeight = canvas.height / 2;

var ball = {
  width: 20,
  height: 20,
  x: halfWidth / 2 - (this.width / 2),
  y: halfHeight / 2 - (this.height / 2),
  isMoving: false,
  spawn: function(width, height) {
    var ballWidth = width;
    var ballHeight = height;
    ctx.fillRect(halfWidth-ballWidth,halfHeight-ballHeight,ballWidth,ballWidth);
  },
  move: function(speed) {
    if (!this.isMoving) {
      this.isMoving = true;
      this.x += speed;
    }
  }
}

function main() {
  ball.spawn(20, 20);
  setInterval(function() {
    ball.move(10);
  }, 1);
}

window.onload = main();