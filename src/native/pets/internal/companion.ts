/**
 * Shared palette for the pets V4 "companion" line — the warm, friendly pet-care
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the cards, rings, and rows on the plain surface; the gradient is reserved for
 * the companion moment — the pet profile hero — where the brand ramp's light
 * steps (50/100) act as near-white "ink" on the saturated ground for any hue. A
 * neutral scrim darkens a hero photo for legible near-white overlays in both
 * schemes.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing companion moment (the profile hero). */
export function companionGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** A dark neutral scrim (transparent → dark) for legible overlays on a hero photo. */
export function companionScrim(r: Ramps, alpha = 0.7): [string, string] {
  return [withAlpha(r.neutral[900], 0), withAlpha(r.neutral[900], alpha)];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function companionInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function companionInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function companionTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function companionBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
