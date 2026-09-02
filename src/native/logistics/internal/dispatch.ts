/**
 * Shared palette for the logistics V4 "dispatch" line — the confident,
 * operations-desk look. Every value derives from the compiled theme ramps, so
 * the module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels, rows and bars on the plain surface; the gradient
 * is reserved for the dispatch moment — the tracking-timeline hero — where the
 * brand ramp's light steps (50/100) act as near-white "ink" on the saturated
 * ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing dispatch moment (the tracking hero). */
export function dispatchGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function dispatchInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function dispatchInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function dispatchTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function dispatchBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
