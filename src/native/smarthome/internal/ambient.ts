/**
 * Shared palette for the smart-home V4 "ambient" line — the calm control-panel
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the device tiles and controls on the plain surface (a soft glow marks an active
 * device); the gradient is reserved for the dashboard moments — the home header,
 * room header, and energy dashboard — where the brand ramp's light steps (50/100)
 * act as near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (home / room / energy). */
export function ambientGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue "dusk" gradient (accent → primary) for a decorative room cover. */
export function ambientDusk(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function ambientInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function ambientInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function ambientTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function ambientBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
