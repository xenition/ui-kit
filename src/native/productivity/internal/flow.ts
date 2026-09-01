/**
 * Shared palette for the productivity V4 "flow" line — the calm, focused
 * task-workspace look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4 line
 * keeps the task rows, lists and cards on the plain surface (a completed task
 * gets a soft-success glow); the gradient is reserved for the focus moments — the
 * project header, today dashboard, and weekly review — where the brand ramp's
 * light steps (50/100) act as near-white "ink" on the saturated ground for any
 * hue.
 */
import type { NativeThemeTokens } from '../../theme';
import { withAlpha } from '../../primitives/internal/color';

type Ramps = NativeThemeTokens['ramps'];

/** Deep brand gradient for a text-bearing hero (project / today / review). */
export function flowGradient(r: Ramps): [string, string, string] {
  return [r.primary[500], r.primary[600], r.primary[700]];
}

/** Two-hue "momentum" gradient (accent → primary) for a decorative cover. */
export function flowMomentum(r: Ramps): [string, string] {
  return [r.accent[400], r.primary[600]];
}

/** Near-white primary ink for text/icons on the gradient ground. */
export function flowInk(r: Ramps): string {
  return r.primary[50];
}

/** Softer secondary ink on the gradient ground. */
export function flowInkSoft(r: Ramps): string {
  return r.primary[100];
}

/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export function flowTile(r: Ramps, alpha = 0.16): string {
  return withAlpha(r.primary[50], alpha);
}

/** Hairline/edge for a frosted tile on the gradient ground. */
export function flowBorder(r: Ramps, alpha = 0.3): string {
  return withAlpha(r.primary[50], alpha);
}
