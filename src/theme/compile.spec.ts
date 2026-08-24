import { contrastRatio, hexToHsl } from './color';
import { compileTheme, MIN_CONTRAST } from './compile';
import { RAMP_STEPS, SemanticColors, ThemeSeed } from './types';

const baseSeed: ThemeSeed = {
  primary: '#7C3AED',
  accent: '#F59E0B',
  neutral: 'warm',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** The semantic pairs the compiler guarantees at ≥ 4.5:1. */
const ON_PAIRS: ReadonlyArray<[keyof SemanticColors, keyof SemanticColors]> = [
  ['onSurface', 'surface'],
  ['onPrimary', 'primary'],
  ['onAccent', 'accent'],
  ['onSuccess', 'success'],
  ['onWarn', 'warn'],
  ['onDanger', 'danger'],
];

describe('compileTheme — validation', () => {
  it('throws on invalid primary hex', () => {
    expect(() => compileTheme({ ...baseSeed, primary: 'purple' })).toThrow(/seed\.primary/);
    expect(() => compileTheme({ ...baseSeed, primary: '#12345' })).toThrow(/hex color/);
  });

  it('throws on invalid accent hex', () => {
    expect(() => compileTheme({ ...baseSeed, accent: 'orange' })).toThrow(/seed\.accent/);
  });

  it('throws on unknown neutral / shape / mode', () => {
    expect(() =>
      compileTheme({ ...baseSeed, neutral: 'beige' as ThemeSeed['neutral'] })
    ).toThrow(/seed\.neutral/);
    expect(() => compileTheme({ ...baseSeed, shape: 'blobby' as ThemeSeed['shape'] })).toThrow(
      /seed\.shape/
    );
    expect(() => compileTheme({ ...baseSeed, mode: 'auto' as ThemeSeed['mode'] })).toThrow(
      /seed\.mode/
    );
  });

  it('throws on missing or empty fonts', () => {
    expect(() => compileTheme({ ...baseSeed, font: { heading: '', body: 'Inter' } })).toThrow(
      /seed\.font/
    );
    expect(() =>
      compileTheme({ ...baseSeed, font: undefined as unknown as ThemeSeed['font'] })
    ).toThrow(/seed\.font/);
  });
});

describe('compileTheme — determinism and structure', () => {
  it('is deterministic: same seed → deep-equal output', () => {
    expect(compileTheme(baseSeed)).toEqual(compileTheme(baseSeed));
    expect(compileTheme({ ...baseSeed })).toEqual(compileTheme({ ...baseSeed }));
  });

  it('emits full 11-step ramps of valid hex for primary/accent/neutral', () => {
    const theme = compileTheme(baseSeed);
    for (const rampName of ['primary', 'accent', 'neutral'] as const) {
      for (const step of RAMP_STEPS) {
        expect(theme.ramps[rampName][step]).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it('derives a default accent by rotating the primary hue +40°', () => {
    const { accent: _drop, ...seedWithoutAccent } = baseSeed;
    const theme = compileTheme(seedWithoutAccent);
    const primaryHue = hexToHsl(baseSeed.primary).h;
    const accentHue = hexToHsl(theme.ramps.accent[500]).h;
    const diff = (accentHue - primaryHue + 360) % 360;
    expect(diff).toBeGreaterThan(30);
    expect(diff).toBeLessThan(50);
  });

  it('maps shape to the radius scale', () => {
    expect(compileTheme({ ...baseSeed, shape: 'sharp' }).radius).toEqual({
      sm: 0,
      md: 0,
      lg: 0,
      full: 0,
    });
    expect(compileTheme({ ...baseSeed, shape: 'rounded' }).radius.md).toBe(8);
    expect(compileTheme({ ...baseSeed, shape: 'pill' }).radius.md).toBe(16);
    expect(compileTheme({ ...baseSeed, shape: 'pill' }).radius.full).toBe(9999);
  });

  it('tints the neutral ramp by temperature', () => {
    const warm = compileTheme({ ...baseSeed, neutral: 'warm' }).ramps.neutral[500];
    const cool = compileTheme({ ...baseSeed, neutral: 'cool' }).ramps.neutral[500];
    const pure = compileTheme({ ...baseSeed, neutral: 'pure' }).ramps.neutral[500];
    expect(warm).not.toBe(cool);
    expect(hexToHsl(pure).s).toBe(0);
    expect(hexToHsl(warm).s).toBeGreaterThan(0);
  });

  it('produces a dark mode that differs from light', () => {
    const theme = compileTheme(baseSeed);
    expect(theme.dark).not.toEqual(theme.light);
    expect(theme.dark.surface).not.toBe(theme.light.surface);
    // Dark surface is darker than light surface.
    expect(hexToHsl(theme.dark.surface).l).toBeLessThan(hexToHsl(theme.light.surface).l);
  });

  it('echoes the seed and carries spacing/typography scales', () => {
    const theme = compileTheme(baseSeed);
    expect(theme.seed).toEqual(baseSeed);
    expect(theme.spacing.md).toBe(16);
    expect(theme.typography.fontHeading).toBe('Inter');
    expect(theme.typography.scale.base).toBe(16);
  });
});

describe('compileTheme — WCAG contrast property', () => {
  // 25 varied primaries: very light, very dark, saturated, muted, achromatic.
  const PRIMARIES = [
    '#FFFF00', // very light, worst-case yellow
    '#111111', // very dark, near-black
    '#FFFFFF',
    '#000000',
    '#7C3AED',
    '#F59E0B',
    '#0EA5E9',
    '#EF4444',
    '#22C55E',
    '#FAFAFA',
    '#123456',
    '#FF00FF',
    '#00FFFF',
    '#800000',
    '#008080',
    '#FFC0CB',
    '#4B0082',
    '#F0E68C',
    '#2D3748',
    '#E53E3E',
    '#38B2AC',
    '#D69E2E',
    '#1A202C',
    '#EDF2F7',
    '#663399',
  ] as const;

  const NEUTRALS = ['warm', 'cool', 'pure'] as const;

  it(`every on-X/X pair is ≥ ${MIN_CONTRAST}:1 in light AND dark, for 25 varied seeds`, () => {
    expect(PRIMARIES).toHaveLength(25);
    for (const [i, primary] of PRIMARIES.entries()) {
      const seed: ThemeSeed = {
        ...baseSeed,
        primary,
        accent: undefined,
        neutral: NEUTRALS[i % NEUTRALS.length] as ThemeSeed['neutral'],
      };
      const theme = compileTheme(seed);
      for (const mode of ['light', 'dark'] as const) {
        const colors = theme[mode];
        for (const [on, base] of ON_PAIRS) {
          const ratio = contrastRatio(colors[on], colors[base]);
          expect(
            ratio,
          ).toBeGreaterThanOrEqual(MIN_CONTRAST);
        }
      }
    }
  });
});
