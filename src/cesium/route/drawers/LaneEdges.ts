import * as Cesium from "cesium";
import { meterToLat, meterToLon } from "/src/cesium/route/core/ConversionUtils";

export function addBorderLines(
  viewer: Cesium.Viewer,
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
  alt: number,
  lane: { width: number; thickness: number }
) {
  const edgeOffsetW = lane.width / 2;
  const edgeOffsetH = lane.thickness / 2;

  // Latitude gốc dùng để convert meter -> lon
  const latRad = Cesium.Math.toRadians((lat1 + lat2) / 2);

  const mLon = (m: number) => meterToLon(m, latRad);
  const mLat = (m: number) => meterToLat(m);

  // Xác định hướng lane (ngang hay dọc)
  const isHorizontal = lat1 === lat2; // ~ lane không đổi lat

  const edges: Array<[[number, number], [number, number]]> = [];

  if (isHorizontal) {
    // 👉 LANE NGANG → offset theo LAT
    edges.push(
      [
        [lon1, lat1 + mLat(edgeOffsetW)],
        [lon2, lat2 + mLat(edgeOffsetW)]
      ],
      [
        [lon1, lat1 - mLat(edgeOffsetW)],
        [lon2, lat2 - mLat(edgeOffsetW)]
      ]
    );
  } else {
    // 👉 LANE DỌC → offset theo LON
    edges.push(
      [
        [lon1 + mLon(edgeOffsetW), lat1],
        [lon2 + mLon(edgeOffsetW), lat2]
      ],
      [
        [lon1 - mLon(edgeOffsetW), lat1],
        [lon2 - mLon(edgeOffsetW), lat2]
      ]
    );
  }

  //const zTop = alt + edgeOffsetH;
  // const zBottom = alt - edgeOffsetH;
  const zTop = alt + lane.thickness;
  const zBottom = alt;

  edges.forEach(([s, e]) => {
    // 🔹 Viền trên
    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          s[0], s[1], zTop,
          e[0], e[1], zTop
        ]),
        width: 0.7,
        material: Cesium.Color.BLACK,
        clampToGround: false
      }
    });

    // 🔹 Viền dưới
    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          s[0], s[1], zBottom,
          e[0], e[1], zBottom
        ]),
        width: 0.7,
        material: Cesium.Color.BLACK,
        clampToGround: false
      }
    });
  });
}
