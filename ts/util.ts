/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 11/20/14
 */

module AmebaCanvas {
  export class Util {
    static applyStyle(context: CanvasRenderingContext2D, style: Style) {
      if (style.lineDash !== undefined) {
        context.setLineDash(style.lineDash);
        delete style.lineDash;
      }

      var styleNames = Object.keys(style);
      for (var i = 0, len = styleNames.length; i < len; i++) {
        var name = styleNames[i];
        if (context[name] !== style[name]) {
          context[name] = style[name];
        }
      }
    }
  }
}
