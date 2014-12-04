/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 11/28/14
 */

module AmebaCanvas {
  export class Image implements Sprite {
    x: number;
    y: number;
    width: number;
    height: number;

    private clipX: number;
    private clipY: number;
    private clipWidth: number;
    private clipHeight: number;

    image: HTMLElement;
    layer: HTMLCanvasElement;

    constructor(image: HTMLElement, x: number, y: number);
    constructor(image: HTMLElement, x: number, y: number, width?: number, height?: number) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width || null;
      this.height = height || null;
    }

    clip(x: number, y: number, width: number, height: number) {
      this.clipX = x;
      this.clipY = y;
      this.clipWidth = width;
      this.clipHeight = height;
    }

    cancelClip() {
      this.clipX = this.clipY = this.clipWidth = this.clipHeight = null;
    }

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement) {
      this.width = this.width || (<any>this.image).width;
      this.height = this.height || (<any>this.image).height;
      if (this.clipX == null || this.clipY == null || this.clipWidth == null || this.clipHeight == null) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        context.drawImage(this.image, this.clipX, this.clipY, this.clipWidth, this.clipHeight, this.x, this.y, this.width, this.height);
      }
    }
  }
}
