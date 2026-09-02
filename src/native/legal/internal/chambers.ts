/**
 * Shared palette for the legal V4 "chambers" line — the distinguished, calm
 * law-office look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels and rows on the plain surface; the gradient is
 * reserved for the chambers moment — the matter-status hero — where the brand
 * ramp's light steps (50/100) act as near-white "ink" on the saturated ground
 * for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing chambers moment (the matter hero). */
export function chambersGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function chambersInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function chambersInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function chambersTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function chambersBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
