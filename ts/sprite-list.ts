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

    get(index: number) : Sprite {
      return this.sprites[index];
    }

    getSpritesForLayer(layer: Layer) : Sprite[] {
      var sprites: Sprite[] = [];

      for (var i = this.sprites.length - 1; i >= 0; i--) {
        if (this.sprites[i]._layer === layer) {
          sprites.unshift(this.sprites[i]);
        } else if (sprites.length > 0) {
          break;
        }
      }

      return sprites;
    }
  }
}
