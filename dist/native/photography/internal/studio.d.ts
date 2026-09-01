/**
 * Shared palette for the photography V4 "studio" line — the matted,
 * image-forward gallery look. Every value derives from the compiled theme
 * ramps, so the module restyles from the seed and never introduces a literal
 * color. The V4 line keeps the album cards, tiles, and rows on the plain surface
 * with a floating matted photo; the gradient is reserved for the studio moments
 * — the gallery header and the shoot-booking peak — where the brand ramp's light
 * steps (50/100) act as near-white "ink" on the saturated ground for any hue. A
 * neutral scrim darkens cover photos for legible near-white overlays in both
 * schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing studio moment (gallery header / booking). */
export declare function studioGradient(r: Ramps): [string, string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on cover photos. */
export declare function studioScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function studioInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function studioInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function studioTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function studioBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=studio.d.ts.map