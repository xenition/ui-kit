/**
 * Shared palette for the utilities V4 line. Derived entirely from the brand ramp
 * so the module restyles from the seed and never uses a literal color. Used with
 * restraint: a deep brand gradient on the account header + payment confirmation,
 * and a small gradient "disc" behind the leading glyph on the clean cards — the
 * one signature touch that lifts V4 above the base while keeping money surfaces
 * calm. Near-white ink (ramp step 50) reads on the gradient for any hue and stays
 * light-oriented in both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a hero ground (mid → deep, so near-white ink reads). */
export declare function brandGradient(r: Ramps): [string, string, string];
/** A lighter gradient for the small leading glyph disc. */
export declare function brandDisc(r: Ramps): [string, string];
/** Near-white ink for text/icons on the gradient. */
export declare function brandInk(r: Ramps): string;
/** Softer secondary ink on the gradient. */
export declare function brandInkSoft(r: Ramps): string;
/** Frosted translucent chip fill on the gradient. */
export declare function brandTile(r: Ramps, alpha?: number): string;
/** Hairline for a frosted chip on the gradient. */
export declare function brandBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=brand.d.ts.map