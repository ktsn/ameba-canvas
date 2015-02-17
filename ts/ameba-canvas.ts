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
    private thSeed: number;

    constructor(container: HTMLElement, thSeed: number) {
      this.container = container;
      this.layerList = new LayerList(container);
      this.thSeed = thSeed || 1000;
    }

    addSprite(sprite: Sprite) {
      this.spriteList.add(sprite);
      var layer = this.layerList.getLayer(this.layerList.length - 1);
      sprite._age = 0;
      Canvas.drawSprite(sprite, layer);
    }

    removeSprite(index: number) {
      var sprite = this.spriteList.get(index);
      this.spriteList.remove(index);
      this.redrawLayer(sprite._layer);
    }

    updateSprite(sprite: Sprite) {
      this.redrawLayer(sprite._layer);
    }

    setSize(width: number, height: number) {
      this.layerList.setSize(width, height);
      this.layerList.layers.forEach(this.redrawLayer);
    }

    private redrawLayer(layer: Layer);
    private redrawLayer(element: HTMLCanvasElement);
    private redrawLayer(arg: any) {
      var layer: Layer;
      if (arg instanceof HTMLCanvasElement) {
        layer = this.layerList.findByElement(arg);
      } else {
        layer = arg;
      }

      Canvas.clearLayer(layer);

      var sprites = this.spriteList.getSpritesForLayer(layer);
      if (sprites.length > this.getDivideThreshold(layer)) {
        this.divideLayer(layer);
      } else {
        sprites.forEach((sprite) => Canvas.drawSprite(sprite, layer));
      }
    }

    private divideLayer(layer: Layer) {
      var sprites = this.spriteList.getSpritesForLayer(layer);
      var newLayer = this.layerList.insertLayer(this.layerList.getIndex(layer) + 1);
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
      var maxAge: number, layerAge: number;
      var sprites: Sprite[] = this.spriteList.sprites;

      maxAge = layerAge = 0;
      sprites.forEach((s) => {
        maxAge += s._age;
        if (s._layer === layer) {
          layerAge += s._age;
        }
      });
      return this.thSeed * (1 - layerAge / maxAge);
    }

    private static clearLayer(layer: Layer) {
      layer.ctx.clearRect(0, 0, layer.width, layer.height);
    }

    private static drawSprite(sprite: Sprite, layer: Layer) {
      sprite.paint(layer.ctx);
      sprite._age += 1;
      sprite._layer = layer;
    }
  }
}
