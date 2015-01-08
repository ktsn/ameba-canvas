/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/5/14
 */

describe('SpriteList', function() {

  var spriteList;

  describe('add', function() {
    beforeEach(function() {
      spriteList = new AmebaCanvas.SpriteList();
    });

    it('should add a sprite', function() {
      var sprite = {
        paint: function(ctx) {}
      };
      spriteList.add(sprite);
      expect(spriteList.sprites.length).toEqual(1);
    });
  });

  describe('insert', function() {

    var sprite;
    beforeEach(function() {
      spriteList = new AmebaCanvas.SpriteList();
      spriteList.sprites = [{}, {}, {}];
      sprite = {
        paint: function(ctx) {}
      };
    });

    it('should insert a sprite into given index', function() {
      spriteList.insert(sprite, 2);
      expect(spriteList.sprites[2]).toEqual(sprite);
    });

    it('should insert into boundary index', function() {
      var clone = { paint: function(ctx) {} };
      spriteList.insert(sprite, 0);
      spriteList.insert(clone, spriteList.sprites.length);
      expect(spriteList.sprites[0]).toEqual(sprite);
      expect(spriteList.sprites[spriteList.sprites.length - 1]).toEqual(clone);
    });
  });

  describe('remove', function() {
    var _sprites;

    beforeEach(function() {
      spriteList = new AmebaCanvas.SpriteList();
      _sprites = [];
      for (var i = 0; i < 5; i++) {
        var sprite = {
          paint: function(ctx) {}
        };
        _sprites.push(sprite);
        spriteList.add(sprite);
      }
    });

    it('should remove a sprite', function() {
      spriteList.remove(0);
      expect(spriteList.sprites.length).toEqual(4);
    });

    it('should remove the sprite at given index', function() {
      var index = 3;
      spriteList.remove(index);
      _sprites.splice(index, 1);
      for (var i = 0, ii = _sprites.length; i < ii; i++) {
        expect(spriteList.sprites[i]).toEqual(_sprites[i]);
      }
    });
  });

  describe('getSpritesForLayer', function() {
    var layers;
    var sprites;

    beforeEach(function() {
      spriteList = new AmebaCanvas.SpriteList();
      layers = [];
      layers.push(new AmebaCanvas.Layer(100, 100));
      layers.push(new AmebaCanvas.Layer(200, 200));
      layers.push(new AmebaCanvas.Layer(300, 300));

      sprites = [];
      var sprite;
      for (var i = 0; i < 2; i++) {
        sprite = {
          paint: function(ctx) {}
        };
        spriteList.add(sprite);
        sprite._layer = layers[0];
        sprites.push(sprite);
      }

      sprite = {
        paint: function(ctx) {}
      };
      spriteList.add(sprite);
      sprite._layer = layers[1];
      sprites.push(sprite);
    });

    it('should return the sprites in the given layer', function() {
      var expected = [sprites[0], sprites[1]];
      expect(spriteList.getSpritesForLayer(layers[0])).toEqual(expected);

      expected = [sprites[2]];
      expect(spriteList.getSpritesForLayer(layers[1])).toEqual(expected);
    });

    it('should return the empty array when there are no sprites in the layer', function() {
      expect(spriteList.getSpritesForLayer(layers[2])).toEqual([]);
    });
  });
});
