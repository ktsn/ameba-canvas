/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export class SpriteList {
    sprites: Sprite[] = [];

    add(sprite: Sprite) {
      this.sprites.push(sprite);
    }

    insert(sprite: Sprite, index: number) {
      this.sprites.splice(index, 0, sprite);
    }

    remove(index: number) {
      this.sprites.splice(index, 1);
    }

    getSpritesForLayer(layer: Layer) : Sprite[] {
      return this.sprites.filter((s) => s._layer == layer);
    }
  }
}
