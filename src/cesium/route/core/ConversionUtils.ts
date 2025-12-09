export function meterToLon(m: number, latRad: number) {
  return m / (111320 * Math.cos(latRad));
}

export function meterToLat(m: number) {
  return m / 111320;
}
