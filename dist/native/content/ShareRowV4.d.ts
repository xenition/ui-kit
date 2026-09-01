import * as React from 'react';
import type { ShareRowProps } from './ShareRow';
export interface ShareRowV4Props extends ShareRowProps {
    /** Rewrite each destination's label — the visible pill copy and its name. */
    formatTargetLabel?: (label: string) => string;
}
/**
 * **V4 share row** — same props as {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square — on this
 *    twin with hit slop over them, on the web twin with no recourse at all —
 *    which is a miss on the one row of the article whose only purpose is to be
 *    tapped.
 * 2. **Press is a state layer.** `opacity: 0.6` is *below* M3's 0.38 disabled
 *    band by the time it reaches the glyph, so a pressed share button read as
 *    an unavailable one.
 * 3. **The destination copy is overridable.** The four defaults ship
 *    unchanged — they are good defaults — but `formatTargetLabel` lets an app
 *    localise "Copy link" without rebuilding the whole `targets` array, and
 *    the heading takes `mutedText` rather than the `muted` fill.
 */
export declare function ShareRowV4({ onShare, targets, variant, heading, formatTargetLabel, style, }: ShareRowV4Props): React.ReactElement;
//# sourceMappingURL=ShareRowV4.d.ts.map