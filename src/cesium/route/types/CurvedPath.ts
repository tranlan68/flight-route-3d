import * as Cesium from "cesium";

export interface CurvedPath {
  width: number;
  thickness: number;
  color: Cesium.Color;
  points: Cesium.Cartesian3[]; // p0 → p4 (5 points)
}
