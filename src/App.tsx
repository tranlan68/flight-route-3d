import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import Toastify from "toastify-js";
import { initViewer } from "./cesium/viewer";
import { loadOsmData } from "./cesium/osmLoader";    // file riêng
import { drawNetwork } from "./viewer/network/drawNetwork";
import Notification from "./Notification";
import { MAP_OSM_URL, FLIGHT_PATHS_URL, CESIUM_BASE_URL, CESIUM_ION_TOKEN, ROUTE_HEIGHT, ROUTE_WIDTH} from "./constants";
import {
  enableNodeSelection,
  startScenario,
} from "/src/viewer/network/nodeSelect";
import { createCylinderBetween, createCircleShape } from "/src/cesium/geometry";

import { drawAirspace } from "./cesium/airspace";
import { drawAirspaceA3 } from "./cesium/airspaceA3";

function App() {
  const cesiumRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cesiumRef.current) return;
    (window as any).CESIUM_BASE_URL = CESIUM_BASE_URL;
    Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN;
    let viewer = initViewer(cesiumRef.current.id);
    viewerRef.current = viewer;

    // Chờ viewer DOM hoàn toàn ready trước khi load data
  (async () => {
    loadOsmData(viewer, MAP_OSM_URL);
    //drawNetwork(viewer, FLIGHT_PATHS_URL, ROUTE_HEIGHT, ROUTE_WIDTH);
    //drawAirspaceA3(viewer, {center: {lon:105.53522805597483, lat: 20.999445490154468}});
    drawAirspaceA3(viewer);

//     viewer.scene.morphTo3D(0);

// // DEBUG SETTINGS
// viewer.scene.globe.depthTestAgainstTerrain = false;
// viewer.scene.highDynamicRange = false;
// viewer.scene.globe.enableLighting = false;
// viewer.scene.fog.enabled = false;

// // DEBUG CAMERA
// viewer.camera.setView({
//   destination: Cesium.Cartesian3.fromDegrees(105.8, 21.0, 1500),
//   orientation: {
//     pitch: -0.8,
//   }
// });

// // DEBUG: add test corridor
// viewer.entities.add({
//   polylineVolume: {
//     positions: Cesium.Cartesian3.fromDegreesArrayHeights([
//       105.8, 21.0, 500,
//       105.81, 21.0, 500
//     ]),
//     shape: createCircleShape(30, 10),
//     material: Cesium.Color.RED
//   }
// });

// // Print number of entities
// console.log("Entities:", viewer.entities.values.length);
  })();

    

    return () => viewer.destroy();
  }, []);


  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>

      {/* Cesium container */}
      <div
        id="cesiumContainer"
        ref={cesiumRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />

    </div>
  );
}

export default App;