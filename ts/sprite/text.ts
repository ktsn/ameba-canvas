/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/4/14
 */

module AmebaCanvas {
  export class Text implements Sprite {
    x: number;
    y: number;
    text: string;
    maxWidth: number;
    style: Style;
    layer: HTMLCanvasElement;

    constructor(text: string, x: number, y: number, maxWidth: number = null) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.maxWidth = maxWidth;
    }

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement) {
      Util.applyStyle(context, this.style);
      if (this.maxWidth == null) {
        context.fillText(this.text, this.x, this.y);
        context.strokeText(this.text, this.x, this.y);
      } else {
        context.fillText(this.text, this.x, this.y, this.maxWidth);
        context.strokeText(this.text, this.x, this.y, this.maxWidth);
      }
    }
  }
}
