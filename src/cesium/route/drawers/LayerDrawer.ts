import * as Cesium from "cesium";
import { meterToLat, meterToLon } from "/src/cesium/route/core/ConversionUtils";
import { AirspaceConfig } from "/src/cesium/route/types/AirspaceConfig";
import { LaneInput } from "/src/cesium/route/types/LaneModel";
import { addBorderLines } from "/src/cesium/route/drawers/LaneEdges";

export class LaneDrawer {
  constructor(private viewer: Cesium.Viewer, private config: AirspaceConfig) {}

  drawLane(l: LaneInput) {
    const { center, baseHeight, verticalSpacing, lane } = this.config;

    const latRad = Cesium.Math.toRadians(center.lat);

    const alt = baseHeight + l.layer * verticalSpacing;
    const baseOffset = (l.laneIndex - 0.5) * lane.width * 1.2;

    let lon1, lon2, lat1, lat2;

    if (l.isHorizontal) {
      lat1 = center.lat + meterToLat(baseOffset);
      lat2 = lat1;

      lon1 = center.lon - this.config.dx;
      lon2 = center.lon + this.config.dx;

      if (l.direction === "negative") [lon1, lon2] = [lon2, lon1];
    } else {
      lon1 = center.lon + meterToLon(baseOffset, latRad);
      lon2 = lon1;

      lat1 = center.lat - this.config.dy;
      lat2 = center.lat + this.config.dy;

      if (l.direction === "negative") [lat1, lat2] = [lat2, lat1];
    }

    const pos = Cesium.Cartesian3.fromDegreesArrayHeights([
      lon1, lat1, alt,
      lon2, lat2, alt
    ]);

    this.viewer.entities.add({
      polylineVolume: {
        positions: pos,
        shape: [
          new Cesium.Cartesian2(-lane.width/2, -lane.thickness/2),
          new Cesium.Cartesian2(+lane.width/2, -lane.thickness/2),
          new Cesium.Cartesian2(+lane.width/2, +lane.thickness/2),
          new Cesium.Cartesian2(-lane.width/2, +lane.thickness/2),
        ],
        material: l.color,
        cornerType: Cesium.CornerType.ROUNDED
      }
    });

    this.addLaneArrow(this.viewer, lon1, lat1, lon2, lat2, alt, lane.thickness, Cesium.Color.BLACK)

    addBorderLines(this.viewer, lon1, lat1, lon2, lat2, alt, lane);
  }

  addLaneArrow(viewer: Cesium.Viewer, lon1: number, lat1: number, lon2: number, lat2: number, alt: number, laneThickness: number, color: Cesium.Color) {
    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          lon1, lat1, alt + laneThickness + 3,   // ✔ đặt hẳn trên lane
          lon2, lat2, alt + laneThickness + 3,
        ]),
        width: 12,                               // ✔ arrow đủ lớn
        clampToGround: false,
        material: new Cesium.PolylineArrowMaterialProperty(color),
      },
    });
  }
}
