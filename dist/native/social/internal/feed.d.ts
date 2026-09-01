/**
 * Shared palette for the social V4 "feed" line — the clean, airy social look.
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The V4 line keeps the feed
 * cards, comments and rows on the plain surface; the gradient is reserved for the
 * identity moments — the profile header, the story viewer, and the story rings —
 * where the brand ramp's light steps (50/100) act as near-white "ink" on the
 * saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (profile header / story viewer). */
export declare function feedGradient(r: Ramps): [string, string, string];
/** Two-hue "story" gradient (accent → primary) for story rings and covers. */
export declare function feedStory(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function feedInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function feedInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function feedTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function feedBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=feed.d.ts.map