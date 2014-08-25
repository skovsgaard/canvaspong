var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var FPS = 20;
var baseSpeed = 4;
var upKeyDown = false;
var downKeyDown = false;

function checkKeysDown() {
  document.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) {
      upKeyDown = true;
      console.log('Upkey pressed');
    }
    if(event.keyCode == 40) {
      downKeyDown = true;
      console.log('Downkey pressed');
    }
  });
}

/*function checkKeysUp() {
  document.addEventListener('keyup', function(event) {
    if (event.keyCode == 38) {
      upKeyDown = false;
      console.log('Upkey released');
    } else if (event.keyCode == 40) {
      downKeyDown = false;
      console.log('Downkey released');
    }
  });
}*/

var player = {
  width: 20,
  height: 100,
  speed: baseSpeed * 2,
  x: canvas.width - 40,
  y: canvas.height / 2,
  draw: function() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    if (this.y < canvas.height) {
      if (upKeyDown) {
        this.y -= this.speed;
      }
      if (downKeyDown) {
        this.y += this.speed;
      }
    }
    
    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
    }
    
    if (this.y < 0) {
      this.y = 0;
    }
    upKeyDown = false;
    downKeyDown = false;
  }
};

var enemy = {
  width: 20,
  height: 100,
  speed: baseSpeed + 2,
  x: 20,
  y: canvas.height / 2,
  draw: function() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    if (this.y + this.height <= canvas.height && this.y >= 0) {
      this.y += this.speed;
    } else {
      this.speed *= -1;
      this.y += this.speed;
    } 
  }
};

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
    if (this.x <= 0) {
      //this.speed = baseSpeed;
      //this.x += this.speed;
      this.drop();
    } else if (this.x + this.width > canvas.width) {
      //this.speed *= -1;
      //this.x += this.speed;
      this.drop();
    } else {
      this.x += this.speed;
    }
  },
  drop: function() {
    alert('The ball was dropped!');
    this.x = canvas.width / 2 - 10;
  }
};

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function handleCollision() {
  if (collides(player, ball) || collides(enemy, ball)) {
    ball.speed = ball.speed * -1;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  ball.update();
  handleCollision();
}

function draw() {
  ball.draw();
  player.draw();
  enemy.draw();
}

function main() {
  setInterval(function() {
    checkKeysDown();
    update();
    draw();
  }, 1000/FPS);
}

window.onload = main();
