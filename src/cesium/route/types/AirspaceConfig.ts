export interface AirspaceConfig {
  center: { lon: number; lat: number };
  baseHeight: number;
  verticalSpacing: number;

  layers: number;
  lanesPerDir: number;

  lane: {
    width: number;
    thickness: number;
  };

  dx: number; // half-length horizontal
  dy: number; // half-length vertical
}
