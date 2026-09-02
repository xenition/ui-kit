/**
 * Shared palette for the learning V4 "campus" line — the bright, modern
 * learning-platform look. Every value derives from the compiled theme ramps, so
 * the module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels and rows on the plain surface; the gradient is
 * reserved for the campus moment — the certificate award hero — where the brand
 * ramp's light steps (50/100) act as near-white "ink" on the saturated ground
 * for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing campus moment (the certificate hero). */
export declare function campusGradient(r: Ramps): [string, string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function campusInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function campusInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function campusTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function campusBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=campus.d.ts.map