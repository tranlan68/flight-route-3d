// src/cesium/airspaceA3.ts
import * as Cesium from "cesium";

export function drawAirspaceA3(viewer: Cesium.Viewer) {
  const center = { lon: 105.8, lat: 21.0 };

  const layers = 8;
  const lanesPerDir = 4;
  const baseHeight = 300;
  const verticalSpacing = 70;

  const laneWidth = 30;
  const laneThickness = 30;

  const dx = 0.0035;
  const dy = 0.0035;

  // viewer.scene.morphTo3D(0);
  // viewer.scene.globe.depthTestAgainstTerrain = false;

  const latRad = Cesium.Math.toRadians(center.lat);
  const mToLon = (m: number) => m / (111320 * Math.cos(latRad));
  const mToLat = (m: number) => m / 111320;

  const shape = [
    new Cesium.Cartesian2(-laneWidth / 2, -laneThickness / 2),
    new Cesium.Cartesian2(+laneWidth / 2, -laneThickness / 2),
    new Cesium.Cartesian2(+laneWidth / 2, +laneThickness / 2),
    new Cesium.Cartesian2(-laneWidth / 2, +laneThickness / 2),
  ];

  const fromLLA = (lon: number, lat: number, h: number) =>
    Cesium.Cartesian3.fromDegrees(lon, lat, h);

  // -------------------------------------------------
  // MAIN LOOP (y nguyên theo logic của bạn)
  // -------------------------------------------------
  for (let layer = 0; layer < layers; layer++) {
    const even = layer % 2 === 0;

    if (even) {
      // ★ EVEN LAYER = vertical (green/cyan)
      for (let i = 0; i < lanesPerDir; i++) {
        if (layer % 4 === 0) {
          addStraight(layer, false, i, "positive", Cesium.Color.CYAN);
          //addLaneLabel(layer, i);
          addStraight(layer, false, i + lanesPerDir, "negative", Cesium.Color.LIMEGREEN);
          //addLaneLabel(layer, i + lanesPerDir);
        } else {
          addStraight(layer, false, i, "negative", Cesium.Color.LIMEGREEN);
          //addLaneLabel(layer, i);
          addStraight(layer, false, i + lanesPerDir, "positive", Cesium.Color.CYAN);
          //addLaneLabel(layer, i + lanesPerDir);
        }
      }

    } else {
      // ★ ODD LAYER = horizontal (red/magenta)
      for (let i = 0; i < lanesPerDir; i++) {
        if (layer % 4 === 3) {
          addStraight(layer, true, i, "positive", Cesium.Color.RED);
          //addLaneLabel(layer, i);
          addStraight(layer, true, i + lanesPerDir, "negative", Cesium.Color.MAGENTA);
          //addLaneLabel(layer, i + lanesPerDir);
        } else {
          addStraight(layer, true, i, "negative", Cesium.Color.MAGENTA);
          //addLaneLabel(layer, i);
          addStraight(layer, true, i + lanesPerDir, "positive", Cesium.Color.RED);
          //addLaneLabel(layer, i + lanesPerDir);
        }
      }
    }
  }

  // -------------------------------------------------
  // VÍ DỤ: nối các lane từ layer 0 → layer 1
  // -------------------------------------------------
  // for (let i = 0; i < lanesPerDir; i++) {
  //   addRamp(0, 1, i, Cesium.Color.MAGENTA);
  // }

  //addRamp(0, 7, "right",  1, 0, "left", Cesium.Color.MAGENTA);

  //addRamp1(0, 7, 1, 0, Cesium.Color.MAGENTA);
  //addRamp1(1, 0, 0, 7, Cesium.Color.MAGENTA);

  let height = 300
  let p0 = Cesium.Cartesian3.fromDegrees(105.802254, 20.998852, height);
  let p1 = Cesium.Cartesian3.fromDegrees(105.802390, 20.999050, height + 5);
  let p2 = Cesium.Cartesian3.fromDegrees(105.802562, 20.999480, height + 40);
  let p3 = Cesium.Cartesian3.fromDegrees(105.802971, 20.999696, height + 60);
  let p4 = Cesium.Cartesian3.fromDegrees(105.803266, 20.999843, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802254, 20.998852, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802390, 20.999050, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802562, 20.999480, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.802971, 20.999696, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803266, 20.999843, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802254, 20.998852, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802390, 20.999050, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802562, 20.999480, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.802971, 20.999696, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803266, 20.999843, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802254, 20.998852, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802390, 20.999050, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802562, 20.999480, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.802971, 20.999696, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803266, 20.999843, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);

  height = 300
  p0 = Cesium.Cartesian3.fromDegrees(105.802247, 21.003076, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802385, 21.002749, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802811, 21.002239, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.803271, 21.002122, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803231, 21.002108, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802247, 21.003076, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802385, 21.002749, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802811, 21.002239, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.803271, 21.002122, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803231, 21.002108, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802247, 21.003076, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802385, 21.002749, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802811, 21.002239, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.803271, 21.002122, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803231, 21.002108, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802247, 21.003076, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.802385, 21.002749, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.802811, 21.002239, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.803271, 21.002122, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.803231, 21.002108, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);


  height = 300
  p0 = Cesium.Cartesian3.fromDegrees(105.799820, 21.003135, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799679, 21.002822, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799430, 21.002529, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799029, 21.002235, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798655, 21.002110, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799820, 21.003135, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799679, 21.002822, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799430, 21.002529, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799029, 21.002235, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798655, 21.002110, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799820, 21.003135, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799679, 21.002822, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799430, 21.002529, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799029, 21.002235, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798655, 21.002110, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799820, 21.003135, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799679, 21.002822, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799430, 21.002529, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799029, 21.002235, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798655, 21.002110, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  height = 300
  p0 = Cesium.Cartesian3.fromDegrees(105.799818, 20.998940, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799684, 20.999188, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799447, 20.999471, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799168, 20.999701, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798842, 20.999842, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799818, 20.998940, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799684, 20.999188, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799447, 20.999471, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799168, 20.999701, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798842, 20.999842, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799818, 20.998940, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799684, 20.999188, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799447, 20.999471, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799168, 20.999701, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798842, 20.999842, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.799818, 20.998940, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.799684, 20.999188, height + 5);
  p2 = Cesium.Cartesian3.fromDegrees(105.799447, 20.999471, height + 40);
  p3 = Cesium.Cartesian3.fromDegrees(105.799168, 20.999701, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.798842, 20.999842, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);

  // Các đường phía trong
  height = 300 + 70
  p0 = Cesium.Cartesian3.fromDegrees(105.803697, 21.000811, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.803397, 21.000811, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.802688, 21.001083, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.802391, 21.001472, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.802243, 21.001849, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);

  // height = height + 70 * 2
  // p0 = Cesium.Cartesian3.fromDegrees(105.803697, 21.000811, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.803397, 21.000811, height + 50);
  // p2 = Cesium.Cartesian3.fromDegrees(105.802688, 21.001083, height + 55);
  // p3 = Cesium.Cartesian3.fromDegrees(105.802391, 21.001472, height + 60);
  // p4 = Cesium.Cartesian3.fromDegrees(105.802243, 21.001849, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.803589, 21.001150, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.803589, 21.001150, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.802725, 21.000694, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.802389, 21.000406, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.802247, 21.000031, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);

  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.803697, 21.000811, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.803397, 21.000811, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.802688, 21.001083, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.802391, 21.001472, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.802243, 21.001849, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);

  height = 300 + 70
  p0 = Cesium.Cartesian3.fromDegrees(105.800271, 20.999837, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.800648, 20.999711, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.800884, 20.999542, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998951, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998651, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);

  // height = height + 70 * 2
  // p0 = Cesium.Cartesian3.fromDegrees(105.800271, 20.999837, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.800648, 20.999711, height + 10);
  // p2 = Cesium.Cartesian3.fromDegrees(105.800884, 20.999542, height + 15);
  // p3 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998951, height + 20);
  // p4 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998651, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);

  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.801916, 20.999833, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.801676, 20.999707, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.801296, 20.999492, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.800967, 20.999150, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.800859, 20.998917, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);

  // height = height + 70 * 2
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.800271, 20.999837, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.800648, 20.999711, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.800884, 20.999542, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998951, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.801209, 20.998651, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);

  height = 300 + 70
  p0 = Cesium.Cartesian3.fromDegrees(105.802191, 21.002106, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.801635, 21.002241, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.801218, 21.002624, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003365, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003665, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  // height = height + 70 * 2
  // p0 = Cesium.Cartesian3.fromDegrees(105.802191, 21.002106, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.801635, 21.002241, height + 10);
  // p2 = Cesium.Cartesian3.fromDegrees(105.801218, 21.002624, height + 15);
  // p3 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003365, height + 20);
  // p4 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003665, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.MAGENTA);

  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.800001, 21.002117, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.800339, 21.002240, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.800825, 21.002619, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.801072, 21.003064, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.801204, 21.003253, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  // height = height + 70 * 2
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.802191, 21.002106, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.801635, 21.002241, height + 10);
  p2 = Cesium.Cartesian3.fromDegrees(105.801218, 21.002624, height + 15);
  p3 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003365, height + 20);
  p4 = Cesium.Cartesian3.fromDegrees(105.800866, 21.003665, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  height = 300 + 70
  p0 = Cesium.Cartesian3.fromDegrees(105.798403, 21.001132, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.798703, 21.001131, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.799433, 21.000822, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.799678, 21.000479, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.799824, 21.000127, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);

  // height = height + 70 * 2
  // p0 = Cesium.Cartesian3.fromDegrees(105.798403, 21.001132, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.798703, 21.001131, height + 50);
  // p2 = Cesium.Cartesian3.fromDegrees(105.799433, 21.000822, height + 55);
  // p3 = Cesium.Cartesian3.fromDegrees(105.799678, 21.000479, height + 60);
  // p4 = Cesium.Cartesian3.fromDegrees(105.799824, 21.000127, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);
  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.798454, 21.000790, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.798454, 21.000790, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.799383, 21.001324, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.799682, 21.001654, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.799823, 21.001947, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);

  height = height + 70 * 2
  p0 = Cesium.Cartesian3.fromDegrees(105.798403, 21.001132, height);
  p1 = Cesium.Cartesian3.fromDegrees(105.798703, 21.001131, height + 50);
  p2 = Cesium.Cartesian3.fromDegrees(105.799433, 21.000822, height + 55);
  p3 = Cesium.Cartesian3.fromDegrees(105.799678, 21.000479, height + 60);
  p4 = Cesium.Cartesian3.fromDegrees(105.799824, 21.000127, height + 70);
  drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.RED);


  // height = 300 + 70 * 3
  // p0 = Cesium.Cartesian3.fromDegrees(105.801916, 20.999833, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.801676, 20.999707, height + 10);
  // p2 = Cesium.Cartesian3.fromDegrees(105.801296, 20.999492, height + 15);
  // p3 = Cesium.Cartesian3.fromDegrees(105.800967, 20.999150, height + 20);
  // p4 = Cesium.Cartesian3.fromDegrees(105.800859, 20.998917, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.CYAN);

  // height = 300 + 70 * 3
  // p0 = Cesium.Cartesian3.fromDegrees(105.800001, 21.002117, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.800339, 21.002240, height + 10);
  // p2 = Cesium.Cartesian3.fromDegrees(105.800825, 21.002619, height + 15);
  // p3 = Cesium.Cartesian3.fromDegrees(105.801072, 21.003064, height + 20);
  // p4 = Cesium.Cartesian3.fromDegrees(105.801204, 21.003253, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.LIMEGREEN);

  // height = 300 + 70 * 3
  // p0 = Cesium.Cartesian3.fromDegrees(105.803589, 21.001133, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.803389, 21.001133, height + 50);
  // p2 = Cesium.Cartesian3.fromDegrees(105.802725, 21.000694, height + 55);
  // p3 = Cesium.Cartesian3.fromDegrees(105.802389, 21.000406, height + 60);
  // p4 = Cesium.Cartesian3.fromDegrees(105.802247, 21.000031, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.ORANGE);

  // height = 300 + 70 * 3
  // p0 = Cesium.Cartesian3.fromDegrees(105.798454, 21.000790, height);
  // p1 = Cesium.Cartesian3.fromDegrees(105.798454, 21.000790, height + 50);
  // p2 = Cesium.Cartesian3.fromDegrees(105.799383, 21.001324, height + 55);
  // p3 = Cesium.Cartesian3.fromDegrees(105.799682, 21.001654, height + 60);
  // p4 = Cesium.Cartesian3.fromDegrees(105.799823, 21.001947, height + 70);
  // drawCurvedBoxBetweenFivePoints(viewer, p0, p1, p2, p3, p4, laneWidth, laneThickness, Cesium.Color.ORANGE);

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      105.81140200396275,
      20.991330141985213,
      1186.8278906839164
    ),
    orientation: {
      heading: Cesium.Math.toRadians(313.5464252726931),
      pitch: Cesium.Math.toRadians(-25.915761984299664),
      roll: 0,
    },
  });


function addLaneArrow(lon1: number, lat1: number, lon2: number, lat2: number, alt: number, color: Cesium.Color) {
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

function addRamp1(
  fromLayer: number,
  fromLaneIndex: number,
  toLayer: number,
  toLaneIndex: number,
  color: Cesium.Color
) {
  const s = getLaneMidpoint(fromLayer, fromLaneIndex);
  const e = getLaneMidpoint(toLayer, toLaneIndex);

  const h1 = s.h;
  const h2 = e.h;

  // ⭐ offset nhẹ để ramp lệch ra ngoài → không đè lane
  const sideOffset = laneWidth * 1.2;

  // ⭐ Xác định hướng rẽ (trái/phải) dựa trên laneIndex
  const turnRight = toLaneIndex > fromLaneIndex;

  const dx = turnRight ? mToLon(sideOffset) : -mToLon(sideOffset);
  const dy = turnRight ? mToLat(sideOffset) : -mToLat(sideOffset);

  // ⭐ Ramp cong phải nằm trong mặt phẳng 2D → 2 control points trong lon/lat
  const p0 = Cesium.Cartesian3.fromDegrees(s.lon, s.lat, h1);

  const p1 = Cesium.Cartesian3.fromDegrees(
    s.lon + dx,
    s.lat + dy,
    h1 + (h2 - h1) * 0.25
  );

  const p2 = Cesium.Cartesian3.fromDegrees(
    e.lon + dx,
    e.lat + dy,
    h1 + (h2 - h1) * 0.75
  );

  const p3 = Cesium.Cartesian3.fromDegrees(e.lon, e.lat, h2);

  const curve = bezier3D(p0, p1, p2, p3, 80);

  addVolume(curve, color);
}

  function bezier3D(
    p0: Cesium.Cartesian3,
    p1: Cesium.Cartesian3,
    p2: Cesium.Cartesian3,
    p3: Cesium.Cartesian3,
    seg = 40
  ) {
    const out: Cesium.Cartesian3[] = [];
    for (let i = 0; i <= seg; i++) {
      const t = i / seg;
      const u = 1 - t;

      const x =
        u * u * u * p0.x +
        3 * u * u * t * p1.x +
        3 * u * t * t * p2.x +
        t * t * t * p3.x;

      const y =
        u * u * u * p0.y +
        3 * u * u * t * p1.y +
        3 * u * t * t * p2.y +
        t * t * t * p3.y;

      const z =
        u * u * u * p0.z +
        3 * u * u * t * p1.z +
        3 * u * t * t * p2.z +
        t * t * t * p3.z;

      out.push(new Cesium.Cartesian3(x, y, z));
    }
    return out;
  }

  function addVolume(pos: Cesium.Cartesian3[], color: Cesium.Color) {
    viewer.entities.add({
      polylineVolume: {
        positions: pos,
        shape,
        cornerType: Cesium.CornerType.ROUNDED,
        material: color, // không trong suốt
      },
    });
  }

  function addStraight(
    layer: number,
    isHorizontal: boolean,
    offset: number,
    direction: "positive" | "negative",
    color: Cesium.Color
  ) {
    const alt = baseHeight + layer * verticalSpacing;
    const off = (offset - 0.5) * laneWidth * 1.2;

    let lon1, lon2, lat1, lat2;

    if (isHorizontal) {
      lon1 = center.lon - dx + (mToLon(lanesPerDir * laneWidth));
      lon2 = center.lon + dx + (mToLon(lanesPerDir * laneWidth));
      lat1 = center.lat + mToLat(off);
      lat2 = lat1;
      if (direction === "negative") [lon1, lon2] = [lon2, lon1];
    } else {
      lon1 = center.lon + mToLon(off);
      lon2 = lon1;
      lat1 = center.lat - dy + (mToLat(lanesPerDir * laneWidth));
      lat2 = center.lat + dy + (mToLat(lanesPerDir * laneWidth));
      if (direction === "negative") [lat1, lat2] = [lat2, lat1];
    }

    addVolume(
      Cesium.Cartesian3.fromDegreesArrayHeights([
        lon1,
        lat1,
        alt,
        lon2,
        lat2,
        alt,
      ]),
      color
    );
    // addLaneArrow(
    //   Cesium.Cartesian3.fromDegrees(lon1, lat1, alt + laneThickness/2 + 0.5),
    //   Cesium.Cartesian3.fromDegrees(lon2, lat2, alt + laneThickness/2 + 0.5),
    //   Cesium.Color.BLACK
    // );
    addLaneArrow(lon1, lat1, lon2, lat2, alt, Cesium.Color.BLACK)



    // ------------------------------------------
  // 2) VẼ 4 VIỀN (dùng polyline với width ~ 2)
  // ------------------------------------------
  const edgeOffsetW = laneWidth / 2;
  const edgeOffsetH = laneThickness / 2;

  const edges = [];

  if (isHorizontal) {
    // Horizontal → viền trên/dưới: thay đổi lat
    edges.push([[lon1, lat1 + mToLat(edgeOffsetW)], [lon2, lat2 + mToLat(edgeOffsetW)]]);
    edges.push([[lon1, lat1 - mToLat(edgeOffsetW)], [lon2, lat2 - mToLat(edgeOffsetW)]]);
  } else {
    // Vertical → viền trái/phải: thay đổi lon
    edges.push([[lon1 + mToLon(edgeOffsetW), lat1], [lon2 + mToLon(edgeOffsetW), lat2]]);
    edges.push([[lon1 - mToLon(edgeOffsetW), lat1], [lon2 - mToLon(edgeOffsetW), lat2]]);
  }

  // Luôn vẽ 4 góc (độ cao ± thickness/2)
  const zTop = alt + laneThickness;
  const zBottom = alt;

  edges.forEach(edge => {
    const [s, e] = edge;

    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          s[0], s[1], zTop,
          e[0], e[1], zTop,
        ]),
        width: 0.5,
        material: Cesium.Color.BLACK,
        clampToGround: false
      },
    });

    viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          s[0], s[1], zBottom,
          e[0], e[1], zBottom,
        ]),
        width: 0.5,
        material: Cesium.Color.BLACK,
        clampToGround: false
      },
    });
  });
  }

  function addLaneLabel(layer: number, laneIndex: number) {
  const p = getLaneMidpoint(layer, laneIndex);

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.h + 5),
    label: {
      text: `L${layer}-N${laneIndex}`,
      font: "18px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      heightReference: Cesium.HeightReference.NONE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
  });
}

  // -------------------------------------------------
  // NEW: HÀM XÁC ĐỊNH MIDPOINT CỦA LANE BẤT KỲ Ở 1 TẦNG
  // -------------------------------------------------
  function getLaneMidpoint(layer: number, laneIndex: number) {
    const alt = baseHeight + layer * verticalSpacing;
    const off = (laneIndex - 0.5) * laneWidth * 1.2;

    const isHorizontal = layer % 2 === 1; // odd = horizontal, even = vertical

    if (isHorizontal) {
      // horizontal lane → shift lat
      return {
        lon: center.lon,
        lat: center.lat + mToLat(off),
        h: alt,
      };
    }

    // vertical lane → shift lon
    return {
      lon: center.lon + mToLon(off),
      lat: center.lat,
      h: alt,
    };
  }

  function getLaneSidePoint(layer: number, laneIndex: number, side: "left" | "right") {
  const base = getLaneMidpoint(layer, laneIndex);
  const isHorizontal = layer % 2 === 1;

  const offset = laneWidth / 2; // nửa lane → đúng mặt

  if (isHorizontal) {
    // lane ngang → mặt bên theo LAT
    const lat = base.lat + (side === "left" ? -mToLat(offset) : mToLat(offset));
    return { lon: base.lon, lat, h: base.h };
  } else {
    // lane dọc → mặt bên theo LON
    const lon = base.lon + (side === "left" ? -mToLon(offset) : mToLon(offset));
    return { lon, lat: base.lat, h: base.h };
  }
}

  function addRamp(
  fromLayer: number,
  fromLaneIndex: number,
  fromSide: "left" | "right",
  toLayer: number,
  toLaneIndex: number,
  toSide: "left" | "right",
  color: Cesium.Color
) {
  // ⭐ Lấy mặt bên đúng hướng
  const start = getLaneSidePoint(fromLayer, fromLaneIndex, fromSide);
  const end   = getLaneSidePoint(toLayer, toLaneIndex, toSide);

  const h1 = start.h;
  const h2 = end.h;

  // ⭐ control points tạo đường cong 'S' giống figure
  const mid1 = {
    lon: (start.lon + end.lon) / 2,
    lat: (start.lat + end.lat) / 2,
    h: h1 + (h2 - h1) * 0.25,
  };

  const mid2 = {
    lon: (start.lon + end.lon) / 2,
    lat: (start.lat + end.lat) / 2,
    h: h1 + (h2 - h1) * 0.80,
  };

  const p0 = Cesium.Cartesian3.fromDegrees(start.lon, start.lat, start.h);
  const p1 = Cesium.Cartesian3.fromDegrees(mid1.lon, mid1.lat, mid1.h);
  const p2 = Cesium.Cartesian3.fromDegrees(mid2.lon, mid2.lat, mid2.h);
  const p3 = Cesium.Cartesian3.fromDegrees(end.lon, end.lat, end.h);

  const curve = bezier3D(p0, p1, p2, p3, 80);

  addVolume(curve, color);
}

function drawCurvedBoxBetweenFivePoints(
  viewer: Cesium.Viewer,
  p0: Cesium.Cartesian3,
  p1: Cesium.Cartesian3,
  p2: Cesium.Cartesian3,
  p3: Cesium.Cartesian3,
  p4: Cesium.Cartesian3,
  width: number,
  thickness: number,
  color: Cesium.Color,
  segments = 100
) {
  // Tiết diện hộp
  const shape = [
    new Cesium.Cartesian2(-width / 2, -thickness / 2),
    new Cesium.Cartesian2(+width / 2, -thickness / 2),
    new Cesium.Cartesian2(+width / 2, +thickness / 2),
    new Cesium.Cartesian2(-width / 2, +thickness / 2),
  ];

  // 5 control points
  const P = [p0, p1, p2, p3, p4];

  // Hệ số nhị thức bậc 4: 1, 4, 6, 4, 1
  const C = [1, 4, 6, 4, 1];

  const positions: Cesium.Cartesian3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const u = 1 - t;

    let x = 0, y = 0, z = 0;

    // Bezier bậc 4
    for (let k = 0; k < 5; k++) {
      const b = C[k] * Math.pow(u, 4 - k) * Math.pow(t, k);

      x += P[k].x * b;
      y += P[k].y * b;
      z += P[k].z * b;
    }

    positions.push(new Cesium.Cartesian3(x, y, z));
  }

  // Vẽ polyline volume
  viewer.entities.add({
    polylineVolume: {
      positions,
      shape,
      material: color,
      cornerType: Cesium.CornerType.ROUNDED,
    },
  });
}

}
