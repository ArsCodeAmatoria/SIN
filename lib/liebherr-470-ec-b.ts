/** Liebherr 470 EC-B 20 FEM data sheet. 83.0 m jib, LM 1. Serial chart in the cab wins. */

export const EC_B = {
  name: "Liebherr 470 EC-B 20",
  jibM: 83,
  mode: "LM 1",
  minRadiusM: 2.6,
  innerToM: 13.5,
  innerT: 20,
  pdf: "/redtc/charts/liebherrec-b.pdf",
  practice: "/redtc/load-charts/liebherr-470-ec-b",
} as const;

/** Listed radii (m) and gross capacity (t) on the 83.0 m jib, LM 1, after the 20 t inner zone. */
export const EC_B_LM1_83: readonly { r: number; t: number }[] = [
  { r: 24.4, t: 10.07 },
  { r: 26.9, t: 8.96 },
  { r: 29.4, t: 8.04 },
  { r: 31.9, t: 7.27 },
  { r: 35.0, t: 6.48 },
  { r: 37.5, t: 5.93 },
  { r: 40.0, t: 5.46 },
  { r: 42.5, t: 5.04 },
  { r: 45.0, t: 4.67 },
  { r: 47.5, t: 4.33 },
  { r: 50.0, t: 4.04 },
  { r: 52.5, t: 3.77 },
  { r: 55.0, t: 3.52 },
  { r: 57.5, t: 3.3 },
  { r: 60.0, t: 3.1 },
  { r: 62.5, t: 2.91 },
  { r: 65.0, t: 2.74 },
  { r: 67.5, t: 2.57 },
  { r: 70.0, t: 2.43 },
  { r: 72.5, t: 2.29 },
  { r: 75.0, t: 2.16 },
  { r: 77.5, t: 2.04 },
  { r: 80.0, t: 1.93 },
  { r: 83.0, t: 1.8 },
];

const M_TO_FT = 3.280839895;
const KG_TO_LB = 2.2046226218;

export type EcBReadout = {
  radiusM: number;
  radiusFt: number;
  diameterM: number;
  diameterFt: number;
  circM: number;
  circFt: number;
  chartRadiusM: number;
  tonnes: number;
  kg: number;
  lb: number;
  listed: boolean;
  inner: boolean;
};

export function clampRadius(m: number) {
  return Math.min(EC_B.jibM, Math.max(EC_B.minRadiusM, m));
}

function measures(radiusM: number) {
  const diameterM = radiusM * 2;
  const circM = diameterM * Math.PI;
  return {
    radiusM,
    radiusFt: radiusM * M_TO_FT,
    diameterM,
    diameterFt: diameterM * M_TO_FT,
    circM,
    circFt: circM * M_TO_FT,
  };
}

/** Gross capacity. Never interpolate — next longer listed radius. Perimeter is diameter × π. */
export function ecBAt(radiusM: number): EcBReadout {
  const radiusMClamped = clampRadius(radiusM);
  const size = measures(radiusMClamped);
  if (radiusMClamped <= EC_B.innerToM) {
    const kg = Math.round(EC_B.innerT * 1000);
    return {
      ...size,
      chartRadiusM: EC_B.innerToM,
      tonnes: EC_B.innerT,
      kg,
      lb: Math.round(kg * KG_TO_LB),
      listed: true,
      inner: true,
    };
  }
  const row = EC_B_LM1_83.find((item) => item.r >= radiusMClamped) ?? EC_B_LM1_83[EC_B_LM1_83.length - 1];
  const kg = Math.round(row.t * 1000);
  return {
    ...size,
    chartRadiusM: row.r,
    tonnes: row.t,
    kg,
    lb: Math.round(kg * KG_TO_LB),
    listed: Math.abs(row.r - radiusMClamped) < 0.05,
    inner: false,
  };
}
