/**
 * Shared palette for the music V4 "session" line — the tactile DAW look. Every
 * value derives from the compiled theme ramps, so the module restyles from the
 * seed and never introduces a literal color. The V4 line keeps the pads, faders,
 * keys, and rows on the plain surface; the gradient is reserved for the session
 * moment — the `WaveformEditor` signal hero — where the brand ramp's light steps
 * (50/100) act as near-white "ink" on the saturated ground for any hue. A
 * neutral scrim darkens the signal ground for legible near-white overlays in
 * both schemes.
 */
import type { NativeThemeTokens } from '../../theme';
type Ramps = NativeThemeTokens['ramps'];
/** Deep brand gradient for a text-bearing session moment (the waveform hero). */
export declare function sessionGradient(r: Ramps): [string, string, string];
/** A dark neutral scrim (transparent → dark) for legible overlays on the signal ground. */
export declare function sessionScrim(r: Ramps, alpha?: number): [string, string];
/** Near-white primary ink for text/icons on the gradient ground. */
export declare function sessionInk(r: Ramps): string;
/** Softer secondary ink on the gradient ground. */
export declare function sessionInkSoft(r: Ramps): string;
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
export declare function sessionTile(r: Ramps, alpha?: number): string;
/** Hairline/edge for a frosted tile on the gradient ground. */
export declare function sessionBorder(r: Ramps, alpha?: number): string;
export {};
//# sourceMappingURL=session.d.ts.map