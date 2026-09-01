/**
 * Shared palette for the streaming V4 "spotlight" line — the artwork-forward,
 * immersive look. Every value derives from the compiled theme ramps, so the
 * module restyles from the seed and never introduces a literal color. The V4
 * line keeps the queue rows and small players on the plain surface; the gradient
 * is reserved for the immersive moments — the full-screen player, the album /
 * artist hero, and the artwork glow — where the brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (full-screen player / album). */
export declare function spotlightGradient(r: Ramps): [string, string, string];
/** Two-hue "glow" gradient (accent → primary) for artwork backdrops / covers. */
export declare function spotlightGlow(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function spotlightInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function spotlightInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass controls). */
export declare function spotlightTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function spotlightBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=spotlight.d.ts.map