/**
 * Shared palette for the weather **V4** design line — the "sky" look.
 *
 * Every value is derived from the compiled theme ramps, so the whole line
 * restyles from the seed and never introduces a literal color. The brand ramp's
 * light steps (50/100) are used as "ink" on the saturated gradient ground
 * because they read as near-white for any hue AND stay in the light orientation
 * in both schemes (the kit keeps `tokens.ramps` light-oriented in dark mode).
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../weather-utils';

type Ramps = NativeThemeTokens['ramps'];

/** Vertical gradient stops for a hero/panel ground (light-sky → deeper sky). */
export function skyGradient(ramps: Ramps): [string, string, string] {
  return [ramps.primary[400], ramps.primary[600], ramps.primary[700]];
}

/** A subtler ground gradient, for secondary panels. */
export function skyGradientSoft(ramps: Ramps): [string, string] {
  return [ramps.primary[400], ramps.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function skyInk(ramps: Ramps): string {
  return ramps.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function skyInkSoft(ramps: Ramps): string {
  return ramps.primary[100];
}

/** Translucent tile fill sitting on the gradient ground. */
export function skyTile(ramps: Ramps, alpha = 0.16): string {
  return withAlpha(ramps.primary[50], alpha);
}

/** Hairline/edge color for a tile on the gradient ground. */
export function skyBorder(ramps: Ramps, alpha = 0.28): string {
  return withAlpha(ramps.primary[50], alpha);
}
