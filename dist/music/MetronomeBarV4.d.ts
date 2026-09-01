import * as React from 'react';
import type { MetronomeBarProps } from './MetronomeBar';
/** Drop-in for {@link MetronomeBarProps} — same props, the V4 "session" design. */
export type MetronomeBarV4Props = MetronomeBarProps;
/**
 * MetronomeBar — **V4** "session" design (web parity of the native V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * ≥44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in `aria-pressed`/label. The optional `bpm` shows in bold tabular-nums. No
 * gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export declare const MetronomeBarV4: React.ForwardRefExoticComponent<MetronomeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MetronomeBarV4.d.ts.map