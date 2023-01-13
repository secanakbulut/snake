// snake. 24x24 grid on a 480px canvas, so 20px per cell.

const GRID = 24;
const CELL = 20;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');

let snake, dir, nextDir, food, score, alive;

function reset() {
  const cy = Math.floor(GRID / 2);
  snake = [
    { x: 6, y: cy },
    { x: 5, y: cy },
    { x: 4, y: cy },
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  alive = true;
  scoreEl.textContent = '0';
  spawnFood();
  overlay.classList.add('hidden');
}

function spawnFood() {
  // pick a random empty cell. brute force, fine for 24x24.
  while (true) {
    const fx = Math.floor(Math.random() * GRID);
    const fy = Math.floor(Math.random() * GRID);
    let onSnake = false;
    for (const s of snake) {
      if (s.x === fx && s.y === fy) { onSnake = true; break; }
    }
    if (!onSnake) {
      food = { x: fx, y: fy };
      return;
    }
  }
}

function step() {
  if (!alive) return;
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // walls
  if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID) {
    return die();
  }
  // self
  for (const s of snake) {
    if (s.x === head.x && s.y === head.y) return die();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreEl.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }

  draw();
}

function die() {
  alive = false;
  overlayTitle.textContent = 'game over';
  overlayText.textContent = `you got ${score}. press space to play again`;
  overlay.classList.remove('hidden');
}

function draw() {
  ctx.fillStyle = '#1c1f24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food
  ctx.fillStyle = '#f0a0a0';
  ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);

  // snake. head a bit brighter.
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#c8f0a0' : '#8ab86a';
    const s = snake[i];
    ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
  }
}

function setDir(nx, ny) {
  if (nx === -dir.x && ny === -dir.y) return;
  nextDir = { x: nx, y: ny };
}

document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'arrowup' || k === 'w') { setDir(0, -1); e.preventDefault(); }
  else if (k === 'arrowdown' || k === 's') { setDir(0, 1); e.preventDefault(); }
  else if (k === 'arrowleft' || k === 'a') { setDir(-1, 0); e.preventDefault(); }
  else if (k === 'arrowright' || k === 'd') { setDir(1, 0); e.preventDefault(); }
  else if (k === ' ' && !alive) { reset(); }
});

reset();
draw();
setInterval(step, 150);
