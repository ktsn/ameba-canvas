/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/5/14
 */

module AmebaCanvas {
  export class Layer {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    age: number;

    constructor(width: number, height: number) {
      var el = document.createElement('canvas');
      el.style.position = 'absolute';
      el.width = width;
      el.height = height;
      this.ctx = el.getContext('2d');
      this.el = el;
    }

    set width(w: number) {
      this.el.width = w;
    }

    set height(h: number) {
      this.el.height = h;
    }

    get width() : number {
      return this.el.width;
    }

    get height() : number {
      return this.el.height;
    }
  }
}
