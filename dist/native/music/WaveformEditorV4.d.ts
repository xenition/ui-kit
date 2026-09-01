import * as React from 'react';
import type { WaveformEditorProps } from './WaveformEditor';
/** Drop-in for {@link WaveformEditorProps} — same props, the V4 "session" design. */
export type WaveformEditorV4Props = WaveformEditorProps;
/**
 * WaveformEditor — **V4** "session" design, and the ONE reserved gradient moment
 * of the music V4 line: the signal hero (web/native parity). In `full` the
 * waveform sits on the brand-gradient ground (`sessionGradient(tokens.ramps)` as
 * an absolute-fill wash) with the bars drawn in near-white ink — `sessionInk(r)`
 * for played/active, `withAlpha(sessionInk(r), 0.4)` for unplayed — the playhead
 * in `sessionInk`, any labels in `sessionInk`/`sessionInkSoft`, and a time chip
 * as a frosted tile (`sessionTile` + `sessionBorder`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient) with bars in
 * `colors.primary`/`withAlpha(colors.primary, 0.3)`. Honors every prop of
 * {@link WaveformEditorProps}: the played/unplayed split, playhead position,
 * optional selection region, and the `onSeek` intent. State is never on color
 * alone: the playhead is a real marker. Token-only colors via `useXenitionTheme()`.
 */
export declare function WaveformEditorV4({ peaks, progress, selection, variant, loading, emptyLabel, placeholderBars, onSeek, style, }: WaveformEditorV4Props): React.ReactElement;
//# sourceMappingURL=WaveformEditorV4.d.ts.map