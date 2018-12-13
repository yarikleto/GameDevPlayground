const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');

const generateBrickSMap = (count) => {
  const maxRowSize = Math.trunc(canvas.clientWidth / BRICK_WIDTH);

  const rowCount = Math.ceil(count / maxRowSize);

  const map = [];

  for (let i = 0; i < count; i++) {
    if (i === 0 || i % maxRowSize === 0) {
      map.push([]);
    }

    map[map.length - 1].push({ isLive: true });
  }
  return map;
}

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

const circleStaticSpeed = 10;
const circleRadiurs = 20;

const PADDLE_WIDTH = 200;
const PADDLE_HEIGHT = 10;

const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20;
const BRICK_SPACE = 10;
const bricksMap = generateBrickSMap(150);

let circleX = canvas.clientWidth / 2;
let circleY = canvas.clientHeight / 2;

let circleSpeedX = circleStaticSpeed;
let circleSpeedY = circleStaticSpeed;


let paddleX = canvas.clientWidth / 2 - PADDLE_WIDTH;
let paddleY = canvas.clientHeight - PADDLE_HEIGHT;



canvas.addEventListener('mousemove', e => {
  paddleX = e.clientX - PADDLE_WIDTH / 2;

  // For debug
  // circleX = e.clientX;
  // circleY = e.clientY;
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
    circleY > paddleY
  ) {
    circleSpeedY *= -1;

    const centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
    const ballDistanceFromPaddleCenterX = circleX - centerOfPaddleX;

    circleSpeedX = ballDistanceFromPaddleCenterX * (circleStaticSpeed / PADDLE_WIDTH);
  }

  drawReact(0, 0, canvas.clientWidth, canvas.clientHeight, '#37474F');

  drawBricks();
  drawReact(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, '#F5F5F5'); // paddle
  drawCircle(circleX); // ball

  requestAnimationFrame(gameLoop);
}

const drawBricks = () => {
  bricksMap.forEach((row, i) => {
    row.forEach((brick, j) => {
      const BRICK_X = BRICK_WIDTH * j + BRICK_SPACE * j;
      const BRICK_Y = BRICK_HEIGHT * i + BRICK_SPACE * i;

      if (
        brick.isLive &&
        circleX + circleRadiurs > BRICK_X &&
        circleX - circleRadiurs < BRICK_X + BRICK_WIDTH &&
        circleY + circleRadiurs > BRICK_Y &&
        circleY - circleRadiurs < BRICK_Y + BRICK_HEIGHT
      ) {
        brick.isLive = false;

        if (circleSpeedY < 0) {
          circleSpeedY *= -1;
        }
      }

      if (brick.isLive) drawReact(BRICK_X, BRICK_Y, BRICK_WIDTH, BRICK_HEIGHT, '#FBE9E7');
    });
  });
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
