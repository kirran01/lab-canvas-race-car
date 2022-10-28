const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const backgroundImg = new Image(); // Create new <img> element
backgroundImg.src = "./images/road.png"; // Set source path
const carImg = new Image();
carImg.src = "./images/car.png";

class Car {
  constructor(x, y) {
    this.carXPosition = x;
    this.carYposition = y;
  }

  moveLeft() {
    this.carXPosition -= 10;
  }

  moveRight() {
    this.carXPosition += 10;
  }

  //draw method is needed as the car will be continuously drawn every frame, this method will take the dynamic 
  //position coordinates of the car. 


  drawCar() {
    ctx.drawImage(carImg, this.carXPosition, this.carYposition, 50, 75);
  }
}


//initial position is declared with new keyword
const car = new Car(canvas.width / 2 - 25, canvas.height - 80);
let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      car.moveLeft();
      console.log(car.carXPosition);
      break;

    case "ArrowRight":
      car.moveRight();
      break;
  }
});

let animationLoop = () => {
  console.log("loop running");
  clearCanvas();
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  car.drawCar();
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    setInterval(animationLoop, 16);
  }
};
