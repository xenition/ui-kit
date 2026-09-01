/**
 * Shared palette for the medical V4 "clinic" line — the calm, trustworthy
 * clinical look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the cards, panels, and rows on the plain surface; the gradient is
 * reserved for the clinic moment — the visit-summary hero — where the brand
 * ramp's light steps (50/100) act as near-white "ink" on the saturated ground
 * for any hue. A neutral scrim darkens a hero header for legible near-white
 * overlays in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing clinic moment (the visit-summary hero). */
export declare function clinicGradient(r: Ramps): [string, string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero header. */
export declare function clinicScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function clinicInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function clinicInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function clinicTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function clinicBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=clinic.d.ts.map