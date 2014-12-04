/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export class Canvas {
    container: HTMLElement;
    layerList: LayerList;
    spriteList = new SpriteList();

    constructor(container: HTMLElement) {
      this.container = container;
      this.layerList = new LayerList(container);
    }

    addSprite(sprite: Sprite) {
      this.spriteList.addSprite(sprite);
      var layer = this.layerList.getLayer(this.layerList.length - 1);
      Canvas.drawSprite(sprite, layer.getContext('2d'));
    }

    removeSprite(index: number) {
      this.spriteList.removeSprite(index);
      this.redrawLayerForIndex(index);
    }

    redrawLayerForIndex(index: number) {
      this.clearLayer(index);

      var layer = this.layerList.getLayer(index);
      this.layerList.grow(index);
      var sprites = this.spriteList.getSpritesForLayer(layer);

      if (sprites.length > this.layerList.getDivideThreshold(index)) {
        this.divideLayer(index);
      } else {
        var context = layer.getContext('2d');
        sprites.forEach((sprite) => Canvas.drawSprite(sprite, context));
      }
    }

    redrawLayer(layer: HTMLCanvasElement) {
      var index = this.layerList.getIndexForLayer(layer);
      this.redrawLayerForIndex(index);
    }

    clearLayer(index: number) {
      var layer = this.layerList.getLayer(index);
      var context = layer.getContext('2d');
      context.clearRect(0, 0, layer.width, layer.height);
    }

    divideLayer(index: number) {
      var layer = this.layerList.getLayer(index);
      this.layerList.resetAge(index);
      var sprites = this.spriteList.getSpritesForLayer(layer);
      var newLayer = this.layerList.addLayer(index + 1);
      var spritesLength = sprites.length;
      var divideIndex = Math.floor(spritesLength / 2);

      var layerContext = layer.getContext('2d');
      var newLayerContext = newLayer.getContext('2d');

      for (var i = 0; i < divideIndex; i++) {
        Canvas.drawSprite(sprites[i], layerContext);
      }
      for (i = divideIndex; i < spritesLength; i++) {
        Canvas.drawSprite(sprites[i], newLayerContext);
      }
    }

    private static drawSprite(sprite: Sprite, context: CanvasRenderingContext2D) {
      sprite.paint(context, context.canvas);
      sprite.layer = context.canvas;
    }
  }
}
