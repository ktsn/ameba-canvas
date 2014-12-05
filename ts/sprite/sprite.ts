/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export interface Sprite {
    x: number;
    y: number;
    layer: Layer;

    paint(context: CanvasRenderingContext2D, layer: HTMLCanvasElement);
  }
}
