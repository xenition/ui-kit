/**
 * Shared palette for the survey V4 "focus" line — the calm, legible form look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The V4 line keeps the question
 * stack on the plain surface (one accent, big controls); the gradient is reserved
 * for the two peak/end moments — the survey completion hero and the NPS results
 * card — where the brand ramp's light steps (50/100) act as near-white "ink" on
 * the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (completion / results). */
export function focusGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue celebratory gradient (accent → primary) for the completion peak. */
export function focusCelebrate(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function focusInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function focusInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function focusTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function focusBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
