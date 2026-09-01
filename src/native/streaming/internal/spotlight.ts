/**
 * Shared palette for the streaming V4 "spotlight" line — the artwork-forward,
 * immersive look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the queue rows and small players on the plain surface; the gradient
 * is reserved for the immersive moments — the full-screen player, the album /
 * artist hero, and the artwork glow — where the brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (full-screen player / album). */
export function spotlightGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue "glow" gradient (accent → primary) for artwork backdrops / covers. */
export function spotlightGlow(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function spotlightInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function spotlightInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass controls). */
export function spotlightTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function spotlightBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
