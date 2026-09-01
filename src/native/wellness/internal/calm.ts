/**
 * Shared palette for the wellness "calm" surfaces — the gradient + glass look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated gradient ground for any hue,
 * and stay in the light orientation in both schemes. A two-hue "dawn" gradient
 * (accent → primary) is offered for decorative, non-text-heavy grounds.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Primary-hue gradient stops for a text-bearing hero/panel (light → deep). */
export function calmGradient(r: Ramps): [string, string, string] {
  return [r.primary[400], r.primary[600], r.primary[700]];
}

/** Two-hue "dawn" gradient (accent → primary) for decorative grounds/covers. */
export function calmDawn(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function calmInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function calmInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function calmTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function calmBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
