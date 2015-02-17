/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  export class LayerList {
    container: HTMLElement;
    layerWidth: number;
    layerHeight: number;
    layers: Layer[] = [];

    constructor(container: HTMLElement) {
      this.container = container;
      if (container.style.position === 'static') {
        container.style.position = 'relative';
      }

      this.layerWidth = container.clientWidth;
      this.layerHeight = container.clientHeight;

      this.insertLayer(0);
    }

    get length() : number {
      return this.layers.length;
    }

    setSize(width: number, height: number) {
      this.layers.forEach((layer) => {
        layer.width = width;
        layer.height = height;
      });
    }

    getLayer(index: number) : Layer {
      return this.layers[index];
    }

    findByElement(element: HTMLCanvasElement) : Layer {
      for (var i = 0, len = this.layers.length; i < len; i++) {
        if (this.layers[i].el === element) {
          return this.layers[i];
        }
      }
      return null;
    }

    insertLayer(index: number) : Layer {
      var layer = new Layer(this.layerWidth, this.layerHeight);
      this.layers.splice(index, 0, layer);

      // insert the new layer to DOM tree
      this.container.insertBefore(layer.el, this.container.childNodes[index]);

      return layer;
    }

    getIndex(layer: Layer) : number;
    getIndex(element: HTMLCanvasElement) : number;
    getIndex(arg: any) : number {
      for (var i = 0, len = this.layers.length; i < len; i++) {
        if (this.layers[i] === arg || this.layers[i].el === arg) {
          return i;
        }
      }
      return -1;
    }
  }
}
