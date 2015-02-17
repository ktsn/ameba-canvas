# Ameba Canvas

Ameba Canvas is a canvas element optimizer for fast redrawing.

# Installation

Please build the project by following command (Requires Grunt).
The compiled JS file is at `/js/ameba-canvas.js`

```bash
$ npm install
$ grunt build
```

# Usage

Ameba Canvas uses the strategy pattern to manage objects.
You should define the object drawn on canvas elements for your application.
The following code is the example of the definition.
You must define "paint" method on the object.

```JavaScript
var Rect = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

// You have to define "paint" method on all Ameba Canvas objects.
// ctx is CanvasRenderingContext2D
Rect.prototype.paint = function(ctx) {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fill();
};
```

After defining the object, you can add the object to Ameba Canvas.

```JavaScript
var container = document.getElementById('div');
var ameba = new AmebaCanvas.Canvas(container);

var rect = new Rect(10, 10, 100, 200);
ameba.addSprite(rect);
```
