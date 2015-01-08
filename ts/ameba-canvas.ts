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

    thresholdClosure = (ageSum: number) : number => {
      var threshold = 100 - ageSum;
      return Math.max(10, threshold);
    };

    constructor(container: HTMLElement, threshold?: (number) => number) {
      this.container = container;
      this.layerList = new LayerList(container);
      if (threshold != null) {
        this.thresholdClosure = threshold;
      }
    }

    addSprite(sprite: Sprite) {
      this.spriteList.add(sprite);
      var layer = this.layerList.getLayer(this.layerList.length - 1);
      sprite._age = -1;
      Canvas.drawSprite(sprite, layer);
    }

    removeSprite(index: number) {
      this.spriteList.remove(index);
      this.redrawLayerForIndex(index);
    }

    redrawLayerForIndex(index: number) {
      this.clearLayer(index);

      var layer = this.layerList.getLayer(index);
      var sprites = this.spriteList.getSpritesForLayer(layer);

      if (sprites.length > this.getDivideThreshold(layer)) {
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
      var sprites = this.spriteList.getSpritesForLayer(layer);
      var newLayer = this.layerList.insertLayer(index + 1);
      var spritesLength = sprites.length;
      var divideIndex = Math.floor(spritesLength / 2);

      for (var i = 0; i < divideIndex; i++) {
        Canvas.drawSprite(sprites[i], layer);
      }
      for (i = divideIndex; i < spritesLength; i++) {
        Canvas.drawSprite(sprites[i], newLayer);
      }
    }

    private getDivideThreshold(layer: Layer) : number {
      var sprites = this.spriteList.getSpritesForLayer(layer);
      return this.thresholdClosure(sprites.reduce((sum, sprite) => sum + sprite._age, 0));
    }

    private static drawSprite(sprite: Sprite, layer: Layer) {
      sprite.paint(layer.ctx);
      sprite._age += 1;
      sprite._layer = layer;
    }
  }
}
