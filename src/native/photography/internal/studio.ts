/**
 * Shared palette for the photography V4 "studio" line — the matted,
 * image-forward gallery look. Every value derives from the compiled theme
 * ramps, so the module restyles from the seed and never introduces a literal
 * color. The V4 line keeps the album cards, tiles, and rows on the plain surface
 * with a floating matted photo; the gradient is reserved for the studio moments
 * — the gallery header and the shoot-booking peak — where the brand ramp's light
 * steps (50/100) act as near-white "ink" on the saturated ground for any hue. A
 * neutral scrim darkens cover photos for legible near-white overlays in both
 * schemes.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing studio moment (gallery header / booking). */
export function studioGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** A dark neutral scrim (transparent → dark) for legible overlays on cover photos. */
export function studioScrim(r: Ramps, alpha = 0.7): [string, string] {
  return [withAlpha(r.neutral[900], 0), withAlpha(r.neutral[900], alpha)];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function studioInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function studioInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function studioTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function studioBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
