import * as Cesium from "cesium";

export type LaneDirection = "positive" | "negative";

export interface LaneInput {
  layer: number;
  isHorizontal: boolean;
  laneIndex: number;
  direction: LaneDirection;
  color: Cesium.Color;
}
