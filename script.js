const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// IMAGEM DA ELDRE
const eldereImg = new Image();
eldereImg.src = "eldre.png";

const box = 40;
let score = 0;

let snake = [
  { x: 200, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let direction = "RIGHT";
let game = setInterval(drawGame, 120);

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function drawGame() {

  // FUNDO PRETO
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // COMIDA
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // COBRINHA COM FOTO DA ELDRE
  snake.forEach(part => {
    ctx.drawImage(eldereImg, part.x, part.y, box, box);
  });

  let head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // COLISÃO
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some((part, index) =>
      index !== 0 &&
      part.x === head.x &&
      part.y === head.y
    )
  ) {
    clearInterval(game);
    alert("Fim de jogo! Pontuação: " + score);
    return;
  }

  snake.unshift(head);

  // COME COMIDA
  if (head.x === food.x && head.y === food.y) {

    score++;
    scoreElement.textContent = score;

    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

  } else {
    snake.pop();
  }
}

// REINICIAR
function restartGame() {
  location.reload();
}