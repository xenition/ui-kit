/**
 * Shared palette for the sports V4 "broadcast" line — the matchday look. Every
 * value derives from the compiled theme ramps, so the module restyles from the
 * seed and never introduces a literal color. The V4 line keeps the tables, rows
 * and stat cards on the plain surface; the gradient is reserved for the matchday
 * moments — the match header, player profile, champion card, and the feature
 * scoreline — where the brand ramp's light steps (50/100) act as near-white
 * "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (match header / player / final). */
export function broadcastGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue "trophy" gradient (accent → primary) for the champion celebration. */
export function broadcastTrophy(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function broadcastInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function broadcastInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function broadcastTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function broadcastBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
