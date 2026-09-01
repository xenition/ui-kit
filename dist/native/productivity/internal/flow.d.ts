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
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (project / today / review). */
export declare function flowGradient(r: Ramps): [string, string, string];
/** Two-hue "momentum" gradient (accent → primary) for a decorative cover. */
export declare function flowMomentum(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function flowInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function flowInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function flowTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function flowBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=flow.d.ts.map