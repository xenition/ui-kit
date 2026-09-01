import * as React from 'react';
import type { MetronomeBarProps } from './MetronomeBar';
/** Drop-in for {@link MetronomeBarProps} — same props, the V4 "session" design. */
export type MetronomeBarV4Props = MetronomeBarProps;
/**
 * MetronomeBar — **V4** "session" design (native parity of the web V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * 44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in the a11y `selected`/label. The optional `bpm` shows in bold tabular
 * numerals. No gradient — clean/tactile. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function MetronomeBarV4({ beatsPerBar, currentBeat, playing, bpm, variant, disabled, onToggle, style, }: MetronomeBarV4Props): React.ReactElement;
//# sourceMappingURL=MetronomeBarV4.d.ts.map