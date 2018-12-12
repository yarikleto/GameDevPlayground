const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

const circleRadiurs = 20;

let circleX = circleRadiurs;
let circleY = circleRadiurs;

let circleSpeedX = 10;
let circleSpeedY = 10;

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;

let paddleX = canvas.clientWidth / 2 - PADDLE_WIDTH;
let paddleY = canvas.clientHeight - PADDLE_HEIGHT;



canvas.addEventListener('mousemove', e => {
  paddleX = e.clientX - PADDLE_WIDTH / 2;
});

const gameLoop = () => {

  circleX += circleSpeedX;
  circleY += circleSpeedY;

  if (circleX < 0) {
    circleX = 0;
    circleSpeedX *= -1;
  } else if (circleX > canvas.clientWidth) {
    circleX = canvas.clientWidth;
    circleSpeedX *= -1;
  }

  if (circleY < 0) {
    circleY = 0;
    circleSpeedY *= -1;
  } else if (circleY > canvas.clientHeight) {
    ballReset();
  }

  if (
    circleX > paddleX &&
    circleX < paddleX + PADDLE_WIDTH &&
    circleY > paddleY &&
    circleY < paddleY + PADDLE_HEIGHT
  ) {
    circleSpeedY *= -1;
  }

  drawReact(0, 0, canvas.clientWidth, canvas.clientHeight, '#37474F');

  drawReact(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, '#F5F5F5'); // paddle
  drawCircle(circleX); // ball

  requestAnimationFrame(gameLoop);
}

const drawReact = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

const drawCircle = (x, y) => {
  canvasContext.fillStyle = '#EEEEEE';
  canvasContext.beginPath();
  canvasContext.arc(circleX, circleY, circleRadiurs, 0, Math.PI * 2);
  canvasContext.fill();
}

const ballReset = () => {
  console.log('Oh shit!');
  circleX = canvas.clientWidth / 2;
  circleY = canvas.clientHeight / 2;
}

gameLoop();
