/**
 * The AA proof for the V4 surface line.
 *
 * A translucent panel is the easiest place in a design system to lose
 * legibility, because the thing behind it is not the designer's to choose. The
 * compiler contrast-checks `onSurface` against `surface` — an OPAQUE pair — and
 * that guarantee evaporates the moment the panel lets a stranger's artwork
 * through.
 *
 * So this file re-runs the check under the only assumption that is actually
 * safe: the ground behind the glass is the worst case. Pure black and pure
 * white are the two extremes of that space, and every real photograph
 * composites to something between them, so clearing both clears everything.
 *
 * What it establishes, and what the V4 surfaces then rely on:
 *
 *   1. `glass.tint` exactly as the compiler emits it keeps `onSurface` above
 *      4.5:1 over either extreme, in both schemes — with a measured margin of
 *      roughly 5.6:1 at worst. That is what lets `BottomSheetV4`, `ModalV4` and
 *      `ActionSheetV4` turn glass on without each re-deriving a safe alpha.
 *
 *   2. That margin is NOT large. Thinning the token by as little as 12% drops a
 *      warm-neutral light theme to 4.36:1 — a fail. So the compiler's alpha is
 *      treated as a floor: `GlassPanel`'s `intensity` scale can only move
 *      toward opaque, never past the floor toward transparent. `soft` means
 *      "as translucent as this theme's contrast budget allows", not "45%".
 */

import { compileTheme, MIN_CONTRAST } from './compile';
import { contrastRatio, hexToRgb, rgbToHex } from './color';
import { GLASS_SURFACE_MIX, composeGlass, composeGlassCss, splitAlpha } from './glass';
import type { GlassIntensity } from './glass';
import type { ThemeSeed } from './types';

const SEEDS: ThemeSeed[] = [
  { primary: '#7C3AED', neutral: 'cool', font: { heading: 'Inter', body: 'Inter' }, shape: 'rounded', mode: 'both' },
  { primary: '#EA580C', accent: '#D4A24E', neutral: 'warm', font: { heading: 'Fraunces', body: 'Inter' }, shape: 'sharp', mode: 'both' },
  { primary: '#0D9488', neutral: 'pure', font: { heading: 'Inter', body: 'Inter' }, shape: 'pill', mode: 'both' },
  // A near-black brand and a near-white brand: the two seeds most likely to
  // push a derived surface toward an extreme.
  { primary: '#111111', neutral: 'pure', font: { heading: 'Inter', body: 'Inter' }, shape: 'rounded', mode: 'both' },
  { primary: '#FDE68A', neutral: 'warm', font: { heading: 'Inter', body: 'Inter' }, shape: 'rounded', mode: 'both' },
];

/** The two extremes of "unknown artwork". Everything real composites between. */
const WORST_GROUNDS = ['#000000', '#ffffff'];

/** Source-over composite of `color` at `alpha` onto an opaque `ground`. */
function composite(color: string, alpha: number, ground: string): string {
  const f = hexToRgb(color);
  const b = hexToRgb(ground);
  return rgbToHex({
    r: Math.round(f.r * alpha + b.r * (1 - alpha)),
    g: Math.round(f.g * alpha + b.g * (1 - alpha)),
    b: Math.round(f.b * alpha + b.b * (1 - alpha)),
  });
}

/** Read back an `rgba(r, g, b, a)` string — what `composeGlass` hands React Native. */
function fromRgba(value: string): { color: string; alpha: number } {
  const m = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/.exec(value);
  if (!m) throw new Error(`not an rgba() string: ${value}`);
  return {
    color: rgbToHex({ r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) }),
    alpha: Number(m[4]),
  };
}

/** The worst contrast `fg` achieves on this glass over any possible ground. */
function worstOnGlass(fg: string, glass: string, alpha: number): number {
  return Math.min(
    ...WORST_GROUNDS.map((ground) => contrastRatio(fg, composite(glass, alpha, ground)))
  );
}

describe('glass legibility — text on a translucent panel over unknown artwork', () => {
  it.each(SEEDS.map((s) => [s.primary, s] as const))(
    'keeps onSurface above AA on the raw glass tint, both schemes (%s)',
    (_label, seed) => {
      const theme = compileTheme(seed);
      for (const scheme of ['light', 'dark'] as const) {
        const glass = scheme === 'light' ? theme.lightGlass : theme.darkGlass;
        const colors = scheme === 'light' ? theme.light : theme.dark;
        const { color, alpha } = splitAlpha(glass.tint);
        expect(worstOnGlass(colors.onSurface, color, alpha)).toBeGreaterThanOrEqual(MIN_CONTRAST);
      }
    }
  );

  it.each(SEEDS.map((s) => [s.primary, s] as const))(
    'keeps onSurface above AA at every GlassPanel intensity (%s)',
    (_label, seed) => {
      const theme = compileTheme(seed);
      for (const scheme of ['light', 'dark'] as const) {
        const glass = scheme === 'light' ? theme.lightGlass : theme.darkGlass;
        const colors = scheme === 'light' ? theme.light : theme.dark;

        for (const intensity of Object.keys(GLASS_SURFACE_MIX) as GlassIntensity[]) {
          // The exact value the component paints — not a re-derivation of it.
          const { color, alpha } = fromRgba(
            composeGlass(glass, colors.surface, intensity).backgroundColor
          );
          expect(worstOnGlass(colors.onSurface, color, alpha)).toBeGreaterThanOrEqual(
            MIN_CONTRAST
          );
        }
      }
    }
  );

  it('mixes toward opaque only — every intensity is at or above the raw tint', () => {
    const theme = compileTheme(SEEDS[0]!);
    const raw = splitAlpha(theme.lightGlass.tint);
    let previous = raw.alpha;
    for (const intensity of ['soft', 'regular', 'strong'] as GlassIntensity[]) {
      const { alpha } = fromRgba(
        composeGlass(theme.lightGlass, theme.light.surface, intensity).backgroundColor
      );
      expect(alpha).toBeGreaterThanOrEqual(previous - 1e-9);
      previous = alpha;
    }
    // `soft` is the token itself, to the byte.
    const soft = fromRgba(composeGlass(theme.lightGlass, theme.light.surface, 'soft').backgroundColor);
    expect(soft.color).toBe(raw.color);
    expect(soft.alpha).toBeCloseTo(raw.alpha, 2);
  });

  it('the web twin composes the same mix, expressed as color-mix over the vars', () => {
    // Prop parity is not enough: the two platforms must also agree on the
    // number. CSS `color-mix` is premultiplied, and `composeGlass` does the
    // same sum by hand, so the percentages here are the mirror of the ratios above.
    expect(composeGlassCss('soft')).toBe('var(--xen-glass-tint)');
    expect(composeGlassCss('regular')).toBe(
      'color-mix(in srgb, var(--xen-glass-tint) 80%, var(--xen-surface))'
    );
    expect(composeGlassCss('strong')).toBe(
      'color-mix(in srgb, var(--xen-glass-tint) 55%, var(--xen-surface))'
    );
  });

  it('the compiler alpha really is the floor — 12% thinner already fails', () => {
    // This is why `GLASS_SURFACE_MIX.soft` is 0 and not a fraction that would
    // look airier. The margin at the token's own alpha is ~5.6:1, and it is
    // spent by a multiplier as small as 0.88.
    const warmLight = compileTheme(SEEDS[1]!);
    const { color, alpha } = splitAlpha(warmLight.lightGlass.tint);
    expect(worstOnGlass(warmLight.light.onSurface, color, alpha)).toBeGreaterThanOrEqual(
      MIN_CONTRAST
    );
    expect(worstOnGlass(warmLight.light.onSurface, color, alpha * 0.88)).toBeLessThan(MIN_CONTRAST);
  });

  it('records that a V4 surface may not put `muted` on glass', () => {
    // `muted` is de-emphasised text and carries no contrast promise even on an
    // opaque surface. On glass it is measurably worse. The V4 sheets therefore
    // render every line of text in `onSurface` (or a `*Text` slot) whenever the
    // panel is translucent — this test is the reason, written down.
    const theme = compileTheme(SEEDS[0]!);
    const { color, alpha } = splitAlpha(theme.lightGlass.tint);
    const mutedOnGlass = worstOnGlass(theme.light.muted, color, alpha);
    const inkOnGlass = worstOnGlass(theme.light.onSurface, color, alpha);
    expect(mutedOnGlass).toBeLessThan(inkOnGlass);
    expect(mutedOnGlass).toBeLessThan(MIN_CONTRAST);
  });
});
