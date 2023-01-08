// snake. 24x24 grid on a 480px canvas, so 20px per cell.
// first pass: just draw the snake and let it move with arrow keys.

const GRID = 24;
const CELL = 20;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let snake, dir, nextDir;

function reset() {
  const cy = Math.floor(GRID / 2);
  snake = [
    { x: 6, y: cy },
    { x: 5, y: cy },
    { x: 4, y: cy },
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
}

function step() {
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  // wrap for now, collision handling comes later
  head.x = (head.x + GRID) % GRID;
  head.y = (head.y + GRID) % GRID;
  snake.unshift(head);
  snake.pop();
  draw();
}

function draw() {
  ctx.fillStyle = '#1c1f24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
});

reset();
draw();
setInterval(step, 200);
