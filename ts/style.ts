/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 11/20/14
 */

module AmebaCanvas {
  export interface Style {
    lineWidth?: number;
    lineCap?: string;
    lineJoin?: string;
    miterLimit?: number;
    lineDash?: number[];
    lineDashOffset?: number;

    font?: string;
    textAlign?: string;
    textBaseline?: string;
    direction?: string;

    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;

    fillStyle?: string;
    strokeStyle?: string;
  }
}
