import * as Cesium from "cesium";

export function bezier4(P: Cesium.Cartesian3[], segments = 100): Cesium.Cartesian3[] {
  const C = [1, 4, 6, 4, 1];
  const result: Cesium.Cartesian3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const u = 1 - t;

    let x = 0, y = 0, z = 0;

    for (let k = 0; k < 5; k++) {
      const b = C[k] * Math.pow(u, 4 - k) * Math.pow(t, k);
      x += P[k].x * b;
      y += P[k].y * b;
      z += P[k].z * b;
    }

    result.push(new Cesium.Cartesian3(x, y, z));
  }
  return result;
}
