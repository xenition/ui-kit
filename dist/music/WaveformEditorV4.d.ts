import * as React from 'react';
import type { WaveformEditorProps } from './WaveformEditor';
/** Drop-in for {@link WaveformEditorProps} — same props, the V4 "session" design. */
export type WaveformEditorV4Props = WaveformEditorProps;
/**
 * WaveformEditor — **V4** "session" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the music V4 line: the signal hero. In `full`
 * the waveform sits on the brand-gradient ground (`from-primary-500 to-primary-700`)
 * with the bars drawn in near-white ink — `bg-primary-50` for played/active,
 * `bg-primary-50/40` for unplayed — the playhead and any labels in
 * `text-primary-50`/`text-primary-100`, and time chips as frosted tiles
 * (`bg-primary-50/15 border border-primary-50/30`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient): `rounded-md border
 * border-border bg-surface` with bars in `bg-primary`/`bg-primary/30`. Honors
 * every prop of {@link WaveformEditorProps}: the played/unplayed split, playhead
 * position, optional selection region, and the `onSeek` intent — bars stay real
 * seek `<button>`s (≥44px tall in `full`) when interactive. State is never on
 * color alone: the playhead is a real marker. Token-only colors (no literals).
 */
export declare const WaveformEditorV4: React.ForwardRefExoticComponent<WaveformEditorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaveformEditorV4.d.ts.map