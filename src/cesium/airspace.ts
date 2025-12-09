// src/cesium/airspaceA3.ts
import * as Cesium from "cesium";

export interface AirspaceConfig {
  center?: { lon: number; lat: number };
  layers?: number;
  lanesPerDirection?: number;
  baseHeight?: number;
  verticalSpacing?: number;
  laneWidth?: number;
  laneThickness?: number; // chiều cao của “hộp”
  dx?: number; // chiều dài theo đông–tây
  dy?: number; // chiều dài theo bắc–nam
}

/**
 * Vẽ Airspace Design A3 (theo Figure 6 của paper)
 * lanes = hộp 3D (PolylineVolume) để nhìn rõ ở mọi góc
 */
export function drawAirspace(
  viewer: Cesium.Viewer,
  config?: AirspaceConfig
) {
  const cfg = {
    center: { lon: 105.8, lat: 21.0 },
    layers: 4,
    lanesPerDirection: 2,
    baseHeight: 300, // cao để tránh bị OSM che
    verticalSpacing: 40,
    laneWidth: 30,
    laneThickness: 12, // CHIỀU CAO HỘP
    dx: 0.004,
    dy: 0.004,
    ...config,
  };

  const {
    center,
    layers,
    lanesPerDirection,
    baseHeight,
    verticalSpacing,
    laneWidth,
    laneThickness,
    dx,
    dy,
  } = cfg;

  // 🔥 Đảm bảo 3D Mode
  viewer.scene.morphTo3D(0);
  viewer.scene.globe.depthTestAgainstTerrain = false;

  // =============================
  // 1) Hàm dựng một lane 3D
  // =============================
  function addLane3D(
    isHorizontal: boolean,
    layerIndex: number,
    direction: "positive" | "negative",
    offsetIndex: number
  ) {
    const altitude = baseHeight + layerIndex * verticalSpacing;
    const offsetMeters = (offsetIndex - 0.5) * laneWidth * 1.5;
    const offsetDeg = offsetMeters / 111320; // chuyển m sang độ

    let lon1, lat1, lon2, lat2;
    if (isHorizontal) {
      // Đông – Tây
      lon1 = center.lon - dx;
      lon2 = center.lon + dx;
      lat1 = center.lat + offsetDeg;
      lat2 = lat1;

      if (direction === "negative") {
        [lon1, lon2] = [lon2, lon1];
      }
    } else {
      // Bắc – Nam
      lon1 = center.lon + offsetDeg;
      lon2 = lon1;
      lat1 = center.lat - dy;
      lat2 = center.lat + dy;

      if (direction === "negative") {
        [lat1, lat2] = [lat2, lat1];
      }
    }

    const positions = Cesium.Cartesian3.fromDegreesArrayHeights([
      lon1,
      lat1,
      altitude,
      lon2,
      lat2,
      altitude,
    ]);

    // Hình dạng mặt cắt 3D (hộp chữ nhật)
    const shape = [
        new Cesium.Cartesian2(-laneWidth/2, -laneThickness/2),
        new Cesium.Cartesian2(laneWidth/2, -laneThickness/2),
        new Cesium.Cartesian2(laneWidth/2, laneThickness/2),
        new Cesium.Cartesian2(-laneWidth/2, laneThickness/2)
    ];

    // Màu lane
    const color =
      isHorizontal
        ? direction === "positive"
          ? Cesium.Color.RED
          : Cesium.Color.DARKRED
        : direction === "positive"
        ? Cesium.Color.BLUE
        : Cesium.Color.DARKBLUE;

    viewer.entities.add({
      polylineVolume: {
        positions,
        shape,
        cornerType: Cesium.CornerType.ROUNDED,
        material: color.withAlpha(0.85),
      },
    });
  }

  // =============================
  // 2) Dựng tất cả layers + lanes
  // =============================
  for (let layer = 0; layer < layers; layer++) {
    const even = layer % 2 === 0;
    const horizontalDir = even ? "positive" : "negative";
    const verticalDir = even ? "positive" : "negative";

    for (let i = 0; i < lanesPerDirection; i++) {
      // Đông – Tây
      addLane3D(true, layer, horizontalDir, i);
      addLane3D(
        true,
        layer,
        horizontalDir === "positive" ? "negative" : "positive",
        i + lanesPerDirection
      );

      // Bắc – Nam
      addLane3D(false, layer, verticalDir, i);
      addLane3D(
        false,
        layer,
        verticalDir === "positive" ? "negative" : "positive",
        i + lanesPerDirection
      );
    }
  }

  // =============================
  // 3) Fly camera tới đúng vùng
  // =============================
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 2000),
    orientation: {
      heading: 0,
      pitch: -0.8,
      roll: 0,
    },
    duration: 1.5,
  });

  console.log("Airspace A3 rendered");
}
