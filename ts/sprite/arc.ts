/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 11/28/14
 */

module AmebaCanvas {
  export class Arc implements Sprite {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;
    style: Style;
    layer: Layer;

    constructor(x: number, y: number, radius: number);
    constructor(x: number, y: number, radius: number, startAngle?: number, endAngle?: number, anticlockwise: boolean = false) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.startAngle = startAngle || 0;
      this.endAngle = endAngle || 2 * Math.PI;
      this.anticlockwise = anticlockwise;
    }

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement) {
      Util.applyStyle(context, this.style);

      context.beginPath();
      context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
      context.stroke();
      context.fill();
    }
  }
}
