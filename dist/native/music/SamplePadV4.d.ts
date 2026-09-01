import * as React from 'react';
import type { SamplePadProps } from './SamplePad';
/** Drop-in for {@link SamplePadProps} — same props, the V4 "session" design. */
export type SamplePadV4Props = SamplePadProps;
/**
 * SamplePad — **V4** "session" design (native parity of the web V4). The clean,
 * tactile take on a sample pad: a rounded token tile that carries the cell
 * accent as a soft tint at rest, and when hit/lit flashes a stronger accent
 * fill + an accent border-ring + a corner marker (never color alone). `tile` is
 * a square grid cell (glyph stacked over label), `row` is a horizontal pad with
 * an inline mini-`WaveformEditor`; both keep ≥44px tap targets. Empty slots read
 * dimmed with a `＋`, `loading` swaps in a `Spinner` and blocks presses. Identical
 * props/behavior to {@link SamplePadProps}; the accent is preserved via the
 * `padAccentKey` slot + `colors[accentKey]` resolution (no literal colors, no
 * gradient).
 */
export declare function SamplePadV4({ name, detail, glyph, peaks, color, index, variant, playing, loading, disabled, onPress, style, }: SamplePadV4Props): React.ReactElement;
//# sourceMappingURL=SamplePadV4.d.ts.map