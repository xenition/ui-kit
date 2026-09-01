/**
 * Shared palette for the sports V4 "broadcast" line — the matchday look. Every
 * value derives from the compiled theme ramps, so the module restyles from the
 * seed and never introduces a literal color. The V4 line keeps the tables, rows
 * and stat cards on the plain surface; the gradient is reserved for the matchday
 * moments — the match header, player profile, champion card, and the feature
 * scoreline — where the brand ramp's light steps (50/100) act as near-white
 * "ink" on the saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (match header / player / final). */
export declare function broadcastGradient(r: Ramps): [string, string, string];
/** Two-hue "trophy" gradient (accent → primary) for the champion celebration. */
export declare function broadcastTrophy(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function broadcastInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function broadcastInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function broadcastTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function broadcastBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=broadcast.d.ts.map