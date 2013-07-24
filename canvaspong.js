var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var FPS = 30;
var basePoint = {
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10
}

var ball = {
  width: 20,
  height: 20,
  speed: 2,
  x: basePoint.x,
  y: basePoint.y,
  draw: function() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0,0,0';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    if (this.x <= canvas.width) {
      this.x += this.speed;
    } else {
      this.x = 0;
    }
  }
}

function main() {
  setInterval(function() {
    ball.update();
    ball.draw();
  }, 1000/FPS);
}

window.onload = main();