var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var FPS = 30;
var baseSpeed = 2;

var keyChecks = {
  up: false,
  down: false
}

var player = {
  width: 20,
  height: 100,
  speed: 8,
  x: canvas.width - 40,
  y: canvas.height - 20,
  draw: function() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    if (this.y <= canvas.height) {
      this.y += this.speed;
    } else {
     this.y = 0;
    }
  }
}

var ball = {
  width: 20,
  height: 20,
  speed: baseSpeed,
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  movingRight: true,
  draw: function() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    if (this.x <= 0 /*&& !this.movingRight*/) {
      this.speed = baseSpeed;
      this.x += this.speed;
    } else if (this.x + this.width > canvas.width /*&& this.movingRight*/) {
      this.speed *= -1;
      this.x += this.speed;
    } else {
      this.x += this.speed;
    }
  }
}

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function handleCollision() {
  if (collides(player, ball)) {
    ball.speed = ball.speed * -1;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  ball.update();
  handleCollision();
}

function draw() {
  ball.draw();
  player.draw();
}

function main() {
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);
}

window.onload = main();