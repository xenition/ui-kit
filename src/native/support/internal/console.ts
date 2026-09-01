/**
 * Shared palette for the support V4 "console" line — the calm agent-workspace
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the ticket queue / conversation on the plain surface (one accent, status by
 * glyph + color); the gradient is reserved for the three peak moments — the
 * open-ticket header, the agent-performance card, and the CSAT results card —
 * where the brand ramp's light steps (50/100) act as near-white "ink" on the
 * saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (ticket header / stats / CSAT). */
export function consoleGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function consoleInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function consoleInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function consoleTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function consoleBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
