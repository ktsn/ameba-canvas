/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 14/11/08
 */

describe('LayerList', function() {

  var layerList;
  var container;

  it('should create a layer when initialized', function() {
    container = document.createElement('div');
    layerList = new AmebaCanvas.LayerList(container);
    expect(container.childNodes.length).toEqual(1);
  });

  describe('addLayer', function() {
    beforeEach(function() {
      container = document.createElement('div');
      layerList = new AmebaCanvas.LayerList(container);
    });

    it('should add a layer', function() {
      layerList.addLayer(0);
      expect(container.childNodes.length).toEqual(2);
    });

    it('should insert a layer to given index', function() {
      var existing = layerList.getLayer(0);
      layerList.addLayer(0);
      expect(container.childNodes[0]).not.toEqual(existing);
      expect(container.childNodes[1]).toEqual(existing);
    });
  });

  describe('getLayer', function() {
    beforeEach(function() {
      container = document.createElement('div');
      layerList = new AmebaCanvas.LayerList(container);
      layerList.addLayer(0);
    });

    it('should get a layer by given index', function() {
      expect(layerList.getLayer(0)).toEqual(container.childNodes[0]);
      expect(layerList.getLayer(1)).toEqual(container.childNodes[1]);
    });
  });

  describe('getIndexForLayer', function() {
    beforeEach(function() {
      container = document.createElement('div');
      layerList = new AmebaCanvas.LayerList(container);
      for (var i = 0; i < 5; i++) {
        layerList.addLayer(0);
      }
    });

    it('should return the index of given layer', function() {
      expect(layerList.getIndexForLayer(container.childNodes[3])).toEqual(3);
    });

    it('should return -1 if the layer is invalid', function() {
      var invalidLayer = document.createElement('canvas');
      expect(layerList.getIndexForLayer(invalidLayer)).toEqual(-1);
    });
  });

});