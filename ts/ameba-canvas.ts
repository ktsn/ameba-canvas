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
      Canvas.drawSprite(sprite, layer);
    }

    removeSprite(index: number) {
      this.spriteList.removeSprite(index);
      this.redrawLayerForIndex(index);
    }

    redrawLayerForIndex(index: number) {
      this.clearLayer(index);

      var layer = this.layerList.getLayer(index);
      layer.age++;
      var sprites = this.spriteList.getSpritesForLayer(layer);

      if (sprites.length > this.layerList.getDivideThreshold(index)) {
        this.divideLayer(index);
      } else {
        sprites.forEach((sprite) => Canvas.drawSprite(sprite, layer));
      }
    }

    redrawLayer(layer: Layer);
    redrawLayer(layer: HTMLCanvasElement);
    redrawLayer(layer: any) {
      var index = this.layerList.getIndexForLayer(layer);
      this.redrawLayerForIndex(index);
    }

    clearLayer(index: number) {
      var layer = this.layerList.getLayer(index);
      layer.ctx.clearRect(0, 0, layer.width, layer.height);
    }

    divideLayer(index: number) {
      var layer = this.layerList.getLayer(index);
      layer.age = 0;
      var sprites = this.spriteList.getSpritesForLayer(layer);
      var newLayer = this.layerList.addLayer(index + 1);
      var spritesLength = sprites.length;
      var divideIndex = Math.floor(spritesLength / 2);

      for (var i = 0; i < divideIndex; i++) {
        Canvas.drawSprite(sprites[i], layer);
      }
      for (i = divideIndex; i < spritesLength; i++) {
        Canvas.drawSprite(sprites[i], newLayer);
      }
    }

    private static drawSprite(sprite: Sprite, layer: Layer) {
      sprite.paint(layer.ctx, layer.el);
      sprite.layer = layer;
    }
  }
}
