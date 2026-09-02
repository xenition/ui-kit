/**
 * Shared palette for the logistics V4 "dispatch" line — the confident,
 * operations-desk look. Every value derives from the compiled theme ramps, so
 * the module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels, rows and bars on the plain surface; the gradient
 * is reserved for the dispatch moment — the tracking-timeline hero — where the
 * brand ramp's light steps (50/100) act as near-white "ink" on the saturated
 * ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing dispatch moment (the tracking hero). */
export declare function dispatchGradient(r: Ramps): [string, string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function dispatchInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function dispatchInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function dispatchTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function dispatchBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=dispatch.d.ts.map