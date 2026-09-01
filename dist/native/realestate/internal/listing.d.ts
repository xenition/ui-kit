/**
 * Shared palette for the real-estate V4 "listing" line — the image-forward,
 * editorial look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4 line
 * keeps the listing cards and rows on the plain surface; the gradient is reserved
 * for the listing moments — the property hero, agent header, and mortgage summary
 * — where the brand ramp's light steps (50/100) act as near-white "ink" on the
 * saturated ground for any hue. A neutral scrim darkens hero photos for legible
 * near-white overlays in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (property / agent / mortgage). */
export declare function listingGradient(r: Ramps): [string, string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on hero photos. */
export declare function listingScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function listingInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function listingInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function listingTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function listingBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=listing.d.ts.map