/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export class SpriteList {
    sprites: Sprite[] = [];

    addSprite(sprite: Sprite) {
      this.sprites.push(sprite);
    }

    removeSprite(index: number) {
      this.sprites.splice(index, 1);
    }

    getSpritesForLayer(layer: Layer) : Sprite[] {
      return this.sprites.filter((s) => s._layer == layer);
    }
  }
}
