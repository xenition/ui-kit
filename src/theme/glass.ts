/**
 * Composing the glass token into a panel fill — shared by the native and web
 * `GlassPanel` and by the V4 surfaces (`BottomSheetV4`, `ModalV4`,
 * `ActionSheetV4`) so both platforms render the same translucency rather than
 * two independent guesses.
 *
 * ## Why the intensity scale only goes one way
 *
 * `glass-legibility.spec.ts` measures `onSurface` against the compiler's
 * `glass.tint` composited over the worst possible ground (pure black and pure
 * white — the extremes any real artwork sits between). The tint clears WCAG AA
 * with a margin of roughly 5.6:1 at worst across seeds and schemes, and that
 * margin is spent by a multiplier as small as 0.88.
 *
 * So the compiler's alpha is the FLOOR, and `intensity` can only travel toward
 * opaque. `soft` is the token untouched; `regular` and `strong` mix it toward
 * the opaque `surface`, which raises the alpha and pulls the colour toward the
 * pair `onSurface` is already guaranteed against. There is no setting that can
 * make a V4 panel illegible, because there is no setting below the floor.
 *
 * ## Why the arithmetic is premultiplied
 *
 * The web twin composes with CSS `color-mix()`, which mixes in premultiplied
 * alpha. React Native has no `color-mix()`, so {@link composeGlass} does the
 * same sum by hand — premultiplied, not the naïve lerp — so a panel is the same
 * colour on both platforms down to the rounding.
 */

import { hexToRgb, rgbToHex } from './color';
import type { GlassTokens } from './types';

/**
 * How far each intensity mixes the glass tint toward the opaque `surface`.
 * `0` is the compiler's tint as emitted: the most translucent this theme's
 * contrast budget allows.
 */
export const GLASS_SURFACE_MIX = { soft: 0, regular: 0.2, strong: 0.45 } as const;

/** The panel translucency scale. `soft` is the theme's legibility floor. */
export type GlassIntensity = keyof typeof GLASS_SURFACE_MIX;

/** Split an `#rrggbb` / `#rrggbbaa` into its opaque colour and its alpha. */
export function splitAlpha(hex: string): { color: string; alpha: number } {
  const h = hex.trim().replace('#', '');
  if (h.length === 8) {
    return { color: `#${h.slice(0, 6)}`, alpha: Number.parseInt(h.slice(6, 8), 16) / 255 };
  }
  if (h.length === 4) {
    const [r, g, b, a] = h;
    return { color: `#${r}${r}${g}${g}${b}${b}`, alpha: Number.parseInt(`${a}${a}`, 16) / 255 };
  }
  return { color: `#${h}`, alpha: 1 };
}

/**
 * Mix a translucent colour `t` of the way toward an OPAQUE one, the way CSS
 * `color-mix(in srgb, translucent (1-t), opaque t)` does it: premultiplied by
 * alpha, then un-premultiplied.
 */
function mixTowardOpaque(
  color: string,
  alpha: number,
  opaque: string,
  t: number
): { color: string; alpha: number } {
  const outAlpha = (1 - t) * alpha + t;
  if (outAlpha <= 0) return { color, alpha: 0 };
  const a = hexToRgb(color);
  const b = hexToRgb(opaque);
  const blend = (x: number, y: number): number =>
    Math.round(((1 - t) * alpha * x + t * y) / outAlpha);
  return {
    color: rgbToHex({ r: blend(a.r, b.r), g: blend(a.g, b.g), b: blend(a.b, b.b) }),
    alpha: outAlpha,
  };
}

/** `#rrggbb` + alpha → the `rgba()` string React Native accepts. */
function rgbaOf(color: string, alpha: number): string {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${Math.round(Math.min(Math.max(alpha, 0), 1) * 1000) / 1000})`;
}

export interface ComposedGlass {
  /** Panel fill. */
  backgroundColor: string;
  /** The hairline that keeps the panel's edge readable on a busy ground. */
  borderColor: string;
  /**
   * Blur radius for a host `BlurView`, passed straight through from the token.
   *
   * React Native has no `backdrop-filter`. A component that mounted a blur view
   * itself would crash in every app that has not installed one, so the kit does
   * not: `tint` is pre-composited by the compiler and the panel looks right
   * with no blur at all. An app that HAS a `BlurView` (`expo-blur`,
   * `@react-native-community/blur`) should wrap the panel and pass this number.
   */
  blur: number;
}

/**
 * Resolve the glass tokens into React Native style values at one intensity.
 *
 * @param glass   `useXenitionTheme().glass` — already resolved for the scheme.
 * @param surface `useXenitionTheme().colors.surface`, the opaque end of the mix.
 */
export function composeGlass(
  glass: GlassTokens,
  surface: string,
  intensity: GlassIntensity = 'regular'
): ComposedGlass {
  const t = GLASS_SURFACE_MIX[intensity];
  const tint = splitAlpha(glass.tint);
  const mixed = mixTowardOpaque(tint.color, tint.alpha, surface, t);
  const border = splitAlpha(glass.border);
  return {
    backgroundColor: rgbaOf(mixed.color, mixed.alpha),
    borderColor: rgbaOf(border.color, border.alpha),
    blur: glass.blur,
  };
}

/**
 * The same composition as a CSS value, for the web twin. Returns a
 * `color-mix()` expression over the emitted custom properties, so it re-resolves
 * on a theme swap and flips with `[data-theme="dark"]` without a re-render.
 */
export function composeGlassCss(intensity: GlassIntensity = 'regular'): string {
  const t = GLASS_SURFACE_MIX[intensity];
  if (t === 0) return 'var(--xen-glass-tint)';
  const pct = Math.round((1 - t) * 100);
  return `color-mix(in srgb, var(--xen-glass-tint) ${pct}%, var(--xen-surface))`;
}
