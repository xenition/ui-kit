import * as React from 'react';
import type { ShareRowProps } from './ShareRow';
export interface ShareRowV4Props extends ShareRowProps {
    /**
     * Rewrite each destination's label — the accessible name in `icons`, the
     * visible pill copy in `labeled`.
     *
     * The four defaults ship as English on screen, and `targets` is the only way
     * to change them today: a caller who wants "Copy link" in French has to
     * restate the glyph and the id as well.
     */
    formatTargetLabel?: (label: string) => string;
}
/**
 * **V4 share row** — the web twin of the native `ShareRowV4`, same props as
 * {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square on web,
 *    with no prop and no class that could raise them.
 * 2. **Press is the state layer.** Web dimmed to `0.8` and native to `0.6` —
 *    and `0.6` is *below* M3's 0.38-to-1 disabled boundary in perceived
 *    weight, so a pressed share button read as an unavailable one.
 * 3. **The destination copy is overridable** without restating the whole
 *    `targets` array, and the heading takes `mutedText` rather than the
 *    `muted` fill.
 */
export declare const ShareRowV4: React.ForwardRefExoticComponent<ShareRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShareRowV4.d.ts.map