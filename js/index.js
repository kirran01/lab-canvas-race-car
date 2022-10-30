const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const backgroundImg = new Image(); // Create new <img> element
backgroundImg.src = "./images/road.png"; // Set source path
const carImg = new Image();
carImg.src = "./images/car.png";
let intervalId;

class Car {
  constructor(x, y, width, height) {
    this.carXPosition = x;
    this.carYposition = y;
    this.width = width;
    this.height = height;
  }

  moveLeft() {
    this.carXPosition -= 10;
  }

  moveRight() {
    this.carXPosition += 10;
  }

  collisionCheck(Wall) {
    if (
      this.carXPosition < Wall.carXPosition + Wall.width &&
      this.carXPosition + this.width > Wall.carXPosition &&
      this.carYposition < Wall.carYposition + Wall.height &&
      this.carYposition + this.height > Wall.carYposition
    ) {
      return true;
    } else {
      return false;
    }
  }

  //draw method is needed as the car will be continuously drawn every frame, this method will take the dynamic
  //position coordinates of the car.

  drawCar() {
    ctx.drawImage(carImg, this.carXPosition, this.carYposition, 50, 75);
  }
}

class Wall extends Car {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  wallMoveDown() {
    this.carYposition += 5;
  }

  drawWall() {
    ctx.fillRect(this.carXPosition, this.carYposition, this.width, this.height);
  }
}

//initial position is declared with new keyword
const car = new Car(canvas.width / 2 - 25, canvas.height - 80, 50, 75);
let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      car.moveLeft();
      break;

    case "ArrowRight":
      car.moveRight();
      break;
  }
});

let wallCount = 0;
let framecount = 0;
let wallStorage = [];
let scoreElement = document.getElementById("score");
let scoreValue = 0;

let animationLoop = () => {
  framecount++;

  if (framecount % 60 == 0) {
    let leftWall = new Wall(0, 10, 100, 10);
    let rightWall = new Wall(canvas.width - 100, 10, 100, 10);
    wallStorage.push(leftWall);
    wallStorage.push(rightWall);
    scoreValue++;
    scoreElement.innerHTML = scoreValue;
  }

  clearCanvas();
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height); //draws the background img

  for (let i = 0; i < wallStorage.length; i++) {
    wallStorage[i].wallMoveDown();
    if (car.collisionCheck(wallStorage[i])) {
      clearInterval(intervalId);
    }
    wallStorage[i].drawWall();
  }

  car.drawCar();
};
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    intervalId = setInterval(animationLoop, 16);
  }
};
