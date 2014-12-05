/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 11/20/14
 */

module AmebaCanvas {
  export class Rectangle implements Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    style: Style;
    layer: Layer;

    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement) {
      Util.applyStyle(context, this.style);

      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
      context.fill();
    }
  }
}
