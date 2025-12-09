import * as Cesium from "cesium";
import { AirspaceConfig } from "./types/AirspaceConfig";
import { LaneDrawer } from "/src/cesium/route/drawers/LayerDrawer";
import { CurvedPath } from "/src/cesium/route/types/CurvedPath";
import { CurvedBoxDrawer } from "./drawers/CurvedBoxDrawer";

export class AirspaceA3 {
  public laneDrawer: LaneDrawer;
  public curveDrawer: CurvedBoxDrawer;

  constructor(private viewer: Cesium.Viewer, private config: AirspaceConfig) {
    viewer.scene.globe.depthTestAgainstTerrain = false;
    this.laneDrawer = new LaneDrawer(viewer, config);
    this.curveDrawer = new CurvedBoxDrawer(viewer);
  }

  drawAllLanes() {
    for (let layer = 0; layer < this.config.layers; layer++) {
      const horizontal = layer % 2 === 1;

      for (let i = 0; i < this.config.lanesPerDir * 2; i++) {
        const direction =
          (layer % 4 === 0 || layer % 4 === 3)
            ? (i < this.config.lanesPerDir ? "positive" : "negative")
            : (i < this.config.lanesPerDir ? "negative" : "positive");

        this.laneDrawer.drawLane({
          layer,
          isHorizontal: horizontal,
          laneIndex: i,
          direction,
          color: Cesium.Color.CYAN
        });
      }
    }
  }

  drawCurvedPaths(curvedPaths: CurvedPath[]) {
    curvedPaths.forEach(p => this.curveDrawer.draw(p));
  }
}

export type ColorName =
  | "WHITE"
  | "BLACK"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "YELLOW"
  | "CYAN"
  | "MAGENTA"
  | "ORANGE"
  | "GRAY";

function cesiumColor(c: ColorName): Cesium.Color {
  return Cesium.Color[c];
}

export async function loadAirspaceA3(viewer: Cesium.Viewer, url: string) {
  const response = await fetch(url);
  const json = await response.json();

  const a3 = new AirspaceA3(viewer, json.config);

  // --- VẼ LANE ---
  json.lanes.forEach((lane: any) => {
    a3.laneDrawer.drawLane({
      layer: lane.layer,
      isHorizontal: lane.isHorizontal,
      laneIndex: lane.laneIndex,
      direction: lane.direction,
      color: cesiumColor(lane.color)
    });
  });

  // --- VẼ CURVED PATH ---
  json.curvedPaths.forEach((cp: any) => {
    const points = cp.points.map((p: any) =>
      Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.alt)
    );

    a3.curveDrawer.draw({
      width: cp.width,
      thickness: cp.thickness,
      color: cesiumColor(cp.color),
      points
    });
  });
}
