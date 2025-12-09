import * as Cesium from "cesium";
import { bezier4 } from "/src/cesium/route/core/GeometryUtils";
import { CurvedPath } from "/src/cesium/route/types/CurvedPath";

export class CurvedBoxDrawer {
  constructor(private viewer: Cesium.Viewer) {}

  draw(path: CurvedPath) {
    if (path.points.length !== 5)
      throw new Error("Curved path must contain 5 control points");

    const positions = bezier4(path.points);

    const shape = [
      new Cesium.Cartesian2(-path.width/2, -path.thickness/2),
      new Cesium.Cartesian2(+path.width/2, -path.thickness/2),
      new Cesium.Cartesian2(+path.width/2, +path.thickness/2),
      new Cesium.Cartesian2(-path.width/2, +path.thickness/2),
    ];

    this.viewer.entities.add({
      polylineVolume: {
        positions,
        shape,
        cornerType: Cesium.CornerType.ROUNDED,
        material: path.color
      }
    });
  }
}
