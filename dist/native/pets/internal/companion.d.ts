/**
 * Shared palette for the pets V4 "companion" line — the warm, friendly pet-care
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the cards, rings, and rows on the plain surface; the gradient is reserved for
 * the companion moment — the pet profile hero — where the brand ramp's light
 * steps (50/100) act as near-white "ink" on the saturated ground for any hue. A
 * neutral scrim darkens a hero photo for legible near-white overlays in both
 * schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing companion moment (the profile hero). */
export declare function companionGradient(r: Ramps): [string, string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero photo. */
export declare function companionScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function companionInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function companionInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function companionTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function companionBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=companion.d.ts.map