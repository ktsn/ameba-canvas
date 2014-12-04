/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export interface Sprite {
    x: number;
    y: number;
    layer: HTMLCanvasElement;

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement);
  }
}
