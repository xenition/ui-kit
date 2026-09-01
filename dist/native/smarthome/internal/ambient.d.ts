/**
 * Shared palette for the smart-home V4 "ambient" line — the calm control-panel
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the device tiles and controls on the plain surface (a soft glow marks an active
 * device); the gradient is reserved for the dashboard moments — the home header,
 * room header, and energy dashboard — where the brand ramp's light steps (50/100)
 * act as near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (home / room / energy). */
export declare function ambientGradient(r: Ramps): [string, string, string];
/** Two-hue "dusk" gradient (accent → primary) for a decorative room cover. */
export declare function ambientDusk(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function ambientInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function ambientInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function ambientTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function ambientBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=ambient.d.ts.map