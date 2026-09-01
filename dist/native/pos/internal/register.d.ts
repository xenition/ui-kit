/**
 * Shared palette for the POS V4 "register" line — the tactile checkout look.
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The V4 line keeps the catalog
 * grid, cart lines and rows crisp on the plain surface; the gradient is reserved
 * for the checkout moments — the payment-success screen, the sales summary, and
 * the register header — where the brand ramp's light steps (50/100) act as
 * near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (payment / sales / register). */
export declare function registerGradient(r: Ramps): [string, string, string];
/** Two-hue celebratory gradient (accent → primary) for the payment-success peak. */
export declare function registerCelebrate(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function registerInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function registerInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function registerTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function registerBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=register.d.ts.map