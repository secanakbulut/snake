# snake

classic snake on a canvas. arrow keys, gets faster as you grow.

built this one weekend. no libraries, just html, css and a canvas. 24x24 grid, snake starts at length 3, food spawns in random empty cells, eating it adds a segment. hit a wall or yourself and it ends.

## controls

- arrow keys or wasd to move
- space to restart after game over

## speed

starts at 200ms per tick. every food eaten shaves 8ms off, with a floor at 60ms so it does not become unplayable. you actually feel a jump in pace every 5 or so foods.

## high score

stored in localStorage under `snake.best`. clear it from devtools if you want to reset.

## run it

just open `index.html` in a browser. that is it. no build, no server.

```
open index.html
```

## files

- `index.html` markup
- `style.css` dark theme
- `game.js` loop, input, drawing

## license

PolyForm Noncommercial 1.0.0. play with it, fork it, do not sell it. see LICENSE.
