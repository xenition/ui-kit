/**
 * Shared palette for the POS V4 "register" line — the tactile checkout look.
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The V4 line keeps the catalog
 * grid, cart lines and rows crisp on the plain surface; the gradient is reserved
 * for the checkout moments — the payment-success screen, the sales summary, and
 * the register header — where the brand ramp's light steps (50/100) act as
 * near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (payment / sales / register). */
export function registerGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue celebratory gradient (accent → primary) for the payment-success peak. */
export function registerCelebrate(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function registerInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function registerInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function registerTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function registerBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
