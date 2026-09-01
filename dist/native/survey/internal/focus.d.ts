/**
 * Shared palette for the survey V4 "focus" line — the calm, legible form look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The V4 line keeps the question
 * stack on the plain surface (one accent, big controls); the gradient is reserved
 * for the two peak/end moments — the survey completion hero and the NPS results
 * card — where the brand ramp's light steps (50/100) act as near-white "ink" on
 * the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (completion / results). */
export declare function focusGradient(r: Ramps): [string, string, string];
/** Two-hue celebratory gradient (accent → primary) for the completion peak. */
export declare function focusCelebrate(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function focusInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function focusInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function focusTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function focusBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=focus.d.ts.map