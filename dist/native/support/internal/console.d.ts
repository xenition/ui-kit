/**
 * Shared palette for the support V4 "console" line — the calm agent-workspace
 * look. Every value derives from the compiled theme ramps, so the module
 * restyles from the seed and never introduces a literal color. The V4 line keeps
 * the ticket queue / conversation on the plain surface (one accent, status by
 * glyph + color); the gradient is reserved for the three peak moments — the
 * open-ticket header, the agent-performance card, and the CSAT results card —
 * where the brand ramp's light steps (50/100) act as near-white "ink" on the
 * saturated ground for any hue.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing hero (ticket header / stats / CSAT). */
export declare function consoleGradient(r: Ramps): [string, string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function consoleInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function consoleInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function consoleTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function consoleBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=console.d.ts.map