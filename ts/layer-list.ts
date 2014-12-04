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
    layers: HTMLCanvasElement[] = [];
    layerAges: number[] = [];

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

    getLayer(index: number) : HTMLCanvasElement {
      return this.layers[index];
    }

    addLayer(index: number) : HTMLCanvasElement {
      var layer = LayerList.createLayer(this.layerWidth, this.layerHeight);
      this.layers.splice(index, 0, layer);

      // insert the new layer to DOM tree
      this.container.insertBefore(layer, this.container.children[index]);

      this.layerAges.splice(index, 0, 0);
      return layer;
    }

    getIndexForLayer(layer: HTMLCanvasElement) : number {
      for (var i = 0, len = this.layers.length; i < len; i++) {
        if (this.layers[i] === layer) {
          return i;
        }
      }
      return -1;
    }

    resetAge(index: number) {
      this.layerAges[index] = 0;
    }

    grow(index: number) {
      this.layerAges[index]++;
    }

    getDivideThreshold(index: number) {
      var threshold = kInitialThreshold - kWeight * this.layerAges[index];
      return Math.max(kMinimumThreshold, threshold);
    }

    private static createLayer(width: number, height: number) : HTMLCanvasElement {
      var layer: HTMLCanvasElement = document.createElement('canvas');
      layer.style.position = 'absolute';
      layer.width = width;
      layer.height = height;
      return layer;
    }
  }
}
