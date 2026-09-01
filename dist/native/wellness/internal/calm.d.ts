/**
 * Shared palette for the wellness "calm" surfaces — the gradient + glass look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated gradient ground for any hue,
 * and stay in the light orientation in both schemes. A two-hue "dawn" gradient
 * (accent → primary) is offered for decorative, non-text-heavy grounds.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Primary-hue gradient stops for a text-bearing hero/panel (light → deep). */
export declare function calmGradient(r: Ramps): [string, string, string];
/** Two-hue "dawn" gradient (accent → primary) for decorative grounds/covers. */
export declare function calmDawn(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function calmInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function calmInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function calmTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function calmBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=calm.d.ts.map