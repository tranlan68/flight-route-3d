import * as Cesium from "cesium";

export interface RampInput {
  fromLayer: number;
  fromLane: number;
  fromSide: "left" | "right";

  toLayer: number;
  toLane: number;
  toSide: "left" | "right";

  color: Cesium.Color;
}
