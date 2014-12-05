/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/10/31
 */

module AmebaCanvas {
  var kInitialThreshold = 50;
  var kWeight = 1;
  var kMinimumThreshold = 10;

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

      this.addLayer(0);
    }

    get length() : number {
      return this.layers.length;
    }

    getLayer(index: number) : Layer {
      return this.layers[index];
    }

    addLayer(index: number) : Layer {
      var layer = new Layer(this.layerWidth, this.layerHeight);
      this.layers.splice(index, 0, layer);

      // insert the new layer to DOM tree
      this.container.insertBefore(layer.el, this.container.childNodes[index]);

      return layer;
    }

    getIndexForLayer(layer: Layer) : number;
    getIndexForLayer(layer: HTMLCanvasElement) : number;
    getIndexForLayer(layer: any) : number {
      for (var i = 0, len = this.layers.length; i < len; i++) {
        if (this.layers[i] === layer || this.layers[i].el === layer) {
          return i;
        }
      }
      return -1;
    }

    getDivideThreshold(index: number) {
      var threshold = kInitialThreshold - kWeight * this.layers[index].age;
      return Math.max(kMinimumThreshold, threshold);
    }
  }
}
