//const canvas = document.querySelector('#example');
//const ctx = canvas.getContext('2d');

const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

class Ghost {
  constructor(x,y) {
    this.x = x;
    this.y = y;

    // Load the image
    const img = new Image();
    img.addEventListener('load', () => {
      // Once image loaded => draw
      this.img = img;
      this.draw();
    });
    img.src = 'https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif';
  }
  moveUp() {
    this.y -= 25;
  }
  moveDown() {
    this.y += 25;
  }
  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }
  moveRandom(){
    let myRandomValue = Math.floor(Math.random() * 4);
    switch(myRandomValue){
      case 0:
        this.moveUp();
        break;
      case 1:
        this.moveDown();
        break;
      case 2:
        this.moveLeft();
        break;
      case 3:
        this.moveRight();
        break;
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}

const ghost = new Ghost(25,25);


function clearCanvas(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

window.addEventListener('keydown', function(event){
  
  switch(event.code){
    case 'ArrowUp':
      ghost.moveUp();
      break;
    case 'ArrowDown':
      ghost.moveDown();
      break;
    case 'ArrowLeft':
      ghost.moveLeft();
      break;
    case 'ArrowRight':
      ghost.moveRight();
      break;
  }

  clearCanvas();
  ghost.draw();

});

const ghostsArray = [];

let frameCount = 0;

setInterval(function(){

  frameCount++;

  if(frameCount % 60 === 0){
    const randomX = Math.random() * canvas.width;
    const randomY = Math.random() * canvas.height;

    const myNewGhost = new Ghost(randomX, randomY);

    ghostsArray.push(myNewGhost);
  }

  clearCanvas();

  for(let i = 0; i < ghostsArray.length; i++){
    ghostsArray[i].moveRandom();
    ghostsArray[i].draw();
  }

  //this draws our player;
  ghost.draw();

}, 16)