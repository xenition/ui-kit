/**
 * Shared palette for the travel V4 "journey" line — the boarding-pass look.
 *
 * Every value derives from the compiled theme ramps, so the module restyles from
 * the seed and never introduces a literal color. The brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated gradient ground for any hue
 * and stay light-oriented in both schemes. A two-hue "horizon" gradient
 * (accent → primary) is offered for decorative destination covers. Used with
 * restraint: a deep journey gradient on the boarding-pass header / trip hero, and
 * a small gradient "disc" behind leading glyphs on the clean cards — the one
 * signature touch that lifts V4 above the base.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep journey gradient for a text-bearing hero/header (mid → deep). */
export declare function journeyGradient(r: Ramps): [string, string, string];
/** A lighter gradient for the small leading glyph disc. */
export declare function journeyDisc(r: Ramps): [string, string];
/** Two-hue "horizon" gradient (accent → primary) for decorative covers. */
export declare function journeyHorizon(r: Ramps): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function journeyInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function journeyInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function journeyTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function journeyBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=journey.d.ts.map