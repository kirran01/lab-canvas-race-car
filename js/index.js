const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const backgroundImg = new Image(); // Create new <img> element
backgroundImg.src = "./images/road.png"; // Set source path
const carImg = new Image();
carImg.src = "./images/car.png";
console.log(backgroundImg);

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, canvas.width / 2 - 25, canvas.height - 80, 50, 75);
  }
};
