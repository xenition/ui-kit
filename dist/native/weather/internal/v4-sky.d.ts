/**
 * Shared palette for the weather **V4** design line — the "sky" look.
 *
 * Every value is derived from the compiled theme ramps, so the whole line
 * restyles from the seed and never introduces a literal color. The brand ramp's
 * light steps (50/100) are used as "ink" on the saturated gradient ground
 * because they read as near-white for any hue AND stay in the light orientation
 * in both schemes (the kit keeps `tokens.ramps` light-oriented in dark mode).
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Vertical gradient stops for a hero/panel ground (light-sky → deeper sky). */
export declare function skyGradient(ramps: Ramps): [string, string, string];
/** A subtler ground gradient, for secondary panels. */
export declare function skyGradientSoft(ramps: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function skyInk(ramps: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function skyInkSoft(ramps: Ramps): string;
/** Translucent tile fill sitting on the gradient ground. */
export declare function skyTile(ramps: Ramps, alpha?: number): string;
/** Hairline/edge color for a tile on the gradient ground. */
export declare function skyBorder(ramps: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=v4-sky.d.ts.map