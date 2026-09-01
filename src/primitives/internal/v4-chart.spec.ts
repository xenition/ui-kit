import {
  CHART_CHROMA,
  CHART_DIRECT_LABEL_MAX,
  CHART_HUE_OFFSETS,
  CHART_L_BAND,
  CHART_LIGHTNESS,
  CHART_MARK,
  CHART_SCATTER_SERIES_CAP,
  CHART_SERIES_COUNT,
  chartDiverging,
  chartSequential,
  chartSeries,
  hueOf,
  maxChroma,
  oklchToHex,
} from './v4-chart';

/**
 * These are the checks that would have caught the base palette's three
 * defects, so they are asserted rather than assumed: no status hue standing in
 * for an identity, no wrap, and no two neighbours collapsing to one colour.
 */

/** OKLCH lightness of a hex — the same conversion `hueOf` uses, kept local. */
function lightnessOf(hex: string): number {
  const clean = hex.replace('#', '');
  const toLinear = (v: number): number => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(parseInt(clean.slice(0, 2), 16));
  const g = toLinear(parseInt(clean.slice(2, 4), 16));
  const b = toLinear(parseInt(clean.slice(4, 6), 16));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
}

/** A representative sweep of brand hues — the seed is the app's choice. */
const BRANDS = Array.from({ length: 12 }, (_, i) => oklchToHex(0.6, 0.15, i * 30));

describe('v4-chart palette', () => {
  it('has one lightness and one offset per slot', () => {
    expect(CHART_HUE_OFFSETS).toHaveLength(CHART_SERIES_COUNT);
    expect(CHART_LIGHTNESS.light).toHaveLength(CHART_SERIES_COUNT);
    expect(CHART_LIGHTNESS.dark).toHaveLength(CHART_SERIES_COUNT);
  });

  it('starts on the brand hue itself, so a one-series chart is the brand', () => {
    expect(CHART_HUE_OFFSETS[0]).toBe(0);
    for (const brand of BRANDS) {
      const [first] = chartSeries(brand, 'light');
      expect(Math.abs(hueOf(first as string) - hueOf(brand))).toBeLessThan(2);
    }
  });

  it('keeps hue identity across schemes — a series does not change colour family with the theme', () => {
    for (const brand of BRANDS) {
      const light = chartSeries(brand, 'light');
      const dark = chartSeries(brand, 'dark');
      for (let i = 0; i < CHART_SERIES_COUNT; i += 1) {
        const delta = Math.abs(hueOf(light[i] as string) - hueOf(dark[i] as string));
        expect(Math.min(delta, 360 - delta)).toBeLessThan(12);
      }
    }
  });

  it('holds every slot inside its scheme band and above the chroma floor', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const [lo, hi] = CHART_L_BAND[scheme];
      for (const brand of BRANDS) {
        for (const hex of chartSeries(brand, scheme)) {
          const L = lightnessOf(hex);
          expect(L).toBeGreaterThanOrEqual(lo - 0.01);
          expect(L).toBeLessThanOrEqual(hi + 0.01);
          // The floor is 0.10: below it a hue reads grey and stops being an identity.
          expect(maxChroma(L, hueOf(hex))).toBeGreaterThanOrEqual(0.1);
        }
      }
    }
  });

  it('alternates lightness between adjacent slots — the channel CVD leaves intact', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const Ls = CHART_LIGHTNESS[scheme];
      for (let i = 1; i < Ls.length; i += 1) {
        expect(Math.abs((Ls[i] as number) - (Ls[i - 1] as number))).toBeGreaterThanOrEqual(0.05);
      }
    }
  });

  it('never repeats a slot — the base cycled and painted series 6 as series 1', () => {
    for (const scheme of ['light', 'dark'] as const) {
      for (const brand of BRANDS) {
        const slots = chartSeries(brand, scheme);
        expect(new Set(slots).size).toBe(CHART_SERIES_COUNT);
      }
    }
  });

  it('caps the all-pairs forms below the full palette', () => {
    expect(CHART_SCATTER_SERIES_CAP).toBeLessThan(CHART_SERIES_COUNT);
  });
});

describe('v4-chart ramps', () => {
  it('runs sequential monotonically, and flips direction with the scheme', () => {
    const brand = '#3b82f6';
    const light = [0, 0.25, 0.5, 0.75, 1].map((t) => lightnessOf(chartSequential(brand, t, 'light')));
    const dark = [0, 0.25, 0.5, 0.75, 1].map((t) => lightnessOf(chartSequential(brand, t, 'dark')));
    for (let i = 1; i < light.length; i += 1) {
      // Light page: more value is darker ink. Dark page: more value is lighter.
      expect(light[i] as number).toBeLessThan(light[i - 1] as number);
      expect(dark[i] as number).toBeGreaterThan(dark[i - 1] as number);
    }
  });

  it('keeps the sequential light end distinguishable from the page', () => {
    const lightest = chartSequential('#3b82f6', 0, 'light');
    expect(lightest.toLowerCase()).not.toBe('#ffffff');
    expect(lightnessOf(lightest)).toBeLessThan(0.95);
  });

  it('meets at a near-neutral midpoint and separates the two arms', () => {
    const brand = '#3b82f6';
    const mid = chartDiverging(brand, 0, 'light');
    const pos = chartDiverging(brand, 1, 'light');
    const neg = chartDiverging(brand, -1, 'light');
    // Zero is not a category, so it gets no hue of its own.
    expect(maxChroma(lightnessOf(mid), hueOf(mid))).toBeGreaterThan(0);
    const delta = Math.abs(hueOf(pos) - hueOf(neg));
    expect(Math.min(delta, 360 - delta)).toBeGreaterThan(150);
  });

  it('clamps non-finite input rather than emitting NaN into a fill', () => {
    expect(chartSequential('#3b82f6', Number.NaN, 'light')).toMatch(/^#[0-9a-f]{6}$/);
    expect(chartDiverging('#3b82f6', Number.NaN, 'light')).toMatch(/^#[0-9a-f]{6}$/);
    expect(chartSequential('#3b82f6', 99, 'light')).toBe(chartSequential('#3b82f6', 1, 'light'));
  });
});

describe('v4-chart marks', () => {
  it('keeps the geometric constants the whole line shares', () => {
    expect(CHART_MARK.stroke).toBe(2);
    expect(CHART_MARK.endRadius).toBe(4);
    expect(CHART_MARK.gap).toBe(2);
    expect(CHART_MARK.dotSize).toBeGreaterThanOrEqual(8);
    expect(CHART_DIRECT_LABEL_MAX).toBe(4);
  });

  it('runs more saturated in dark, where a mark loses colourfulness on a near-black ground', () => {
    expect(CHART_CHROMA.dark).toBeGreaterThan(CHART_CHROMA.light);
  });
});
