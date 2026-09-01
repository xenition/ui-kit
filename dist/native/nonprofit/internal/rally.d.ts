/**
 * Shared palette for the nonprofit V4 "rally" line — the warm, mission-driven
 * fundraising look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, meters, and rows on the plain surface; the gradient is
 * reserved for the rally moment — the thank-you celebration — where the brand
 * ramp's light steps (50/100) act as near-white "ink" on the saturated ground
 * for any hue. `rallyCelebrate` adds a warm two-hue (accent → primary) wash for
 * that peak. A neutral scrim darkens a hero photo for legible near-white
 * overlays in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing rally moment (the thank-you hero). */
export declare function rallyGradient(r: Ramps): [string, string, string];
/** Festive two-hue wash (warm accent → brand primary) for the celebration peak. */
export declare function rallyCelebrate(r: Ramps): [string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero photo. */
export declare function rallyScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function rallyInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function rallyInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function rallyTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function rallyBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=rally.d.ts.map