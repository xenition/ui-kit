/**
 * Shared palette for the utilities V4 line. Derived entirely from the brand ramp
 * so the module restyles from the seed and never uses a literal color. Used with
 * restraint: a deep brand gradient on the account header + payment confirmation,
 * and a small gradient "disc" behind the leading glyph on the clean cards — the
 * one signature touch that lifts V4 above the base while keeping money surfaces
 * calm. Near-white ink (ramp step 50) reads on the gradient for any hue and stays
 * light-oriented in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from './format';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a hero ground (mid → deep, so near-white ink reads). */
export function brandGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** A lighter gradient for the small leading glyph disc. */
export function brandDisc(r: Ramps): [string, string] {
  return [r.primary[400], r.primary[600]];
}

/** Near-white ink for text/icons on the gradient. */
export function brandInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient. */
export function brandInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent chip fill on the gradient. */
export function brandTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline for a frosted chip on the gradient. */
export function brandBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
