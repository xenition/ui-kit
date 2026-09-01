/**
 * Shared palette for the medical V4 "clinic" line — the calm, trustworthy
 * clinical look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels, and rows on the plain surface; the gradient is
 * reserved for the clinic moment — the visit-summary hero — where the brand
 * ramp's light steps (50/100) act as near-white "ink" on the saturated ground
 * for any hue. A neutral scrim darkens a hero header for legible near-white
 * overlays in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing clinic moment (the visit-summary hero). */
export function clinicGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** A dark neutral scrim (transparent → dark) for legible overlays on a hero header. */
export function clinicScrim(r: Ramps, alpha = 0.7): [string, string] {
  return [withAlpha(r.neutral[900], 0), withAlpha(r.neutral[900], alpha)];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function clinicInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function clinicInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function clinicTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function clinicBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
