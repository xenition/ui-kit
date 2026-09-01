/**
 * Shared palette for the travel V4 "journey" line — the boarding-pass look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated gradient ground for any hue
 * and stay light-oriented in both schemes. A two-hue "horizon" gradient
 * (accent → primary) is offered for decorative destination covers. Used with
 * restraint: a deep journey gradient on the boarding-pass header / trip hero, and
 * a small gradient "disc" behind leading glyphs on the clean cards — the one
 * signature touch that lifts V4 above the base.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep journey gradient for a text-bearing hero/header (mid → deep). */
export function journeyGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** A lighter gradient for the small leading glyph disc. */
export function journeyDisc(r: Ramps): [string, string] {
  return [r.primary[400], r.primary[600]];
}

/** Two-hue "horizon" gradient (accent → primary) for decorative covers. */
export function journeyHorizon(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function journeyInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function journeyInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function journeyTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function journeyBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
