/**
 * Created by katashin on 14/11/08.
 */

module AmebaCanvas {
  interface Point {
    x: number;
    y: number;
  }

  export class Drawing implements Sprite {
    private linePoints: Point[] = [];
    x: number;
    y: number;
    style: Style;
    layer: Layer;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    addPoint(x: number, y: number) {
      this.linePoints.push({ x: x - this.x, y: y - this.y });
    }

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement) {
      Util.applyStyle(context, this.style);

      context.beginPath();
      context.moveTo(this.x, this.y);
      this.linePoints.forEach((p) => context.lineTo(p.x + this.x, p.y + this.y));
      context.stroke();
    }
  }
}
