/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export interface Sprite {
    _age?: number;
    _layer?: Layer;

    paint(context: CanvasRenderingContext2D);
  }
}
