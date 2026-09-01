import * as React from 'react';
import type { MatchTimelineProps, MatchEvent, MatchEventKind } from './MatchTimeline';
/** Drop-in for {@link MatchTimelineProps} — same props, the V4 "broadcast" design. */
export type MatchTimelineV4Props = MatchTimelineProps;
/**
 * MatchTimeline — **V4** "broadcast" design (web parity of the native V4). The
 * matchday feed: an elevated card with a center rail, each event hung on the
 * home (left) or away (right) side and anchored by a round node carrying the
 * kind glyph (goal ⚽ / card 🟨 / sub 🔁) tinted from its semantic token, plus a
 * bold minute chip on the rail. Kind is always legible from glyph + shape, not
 * color alone. Same props/behavior as {@link MatchTimelineProps}; all colors
 * from `--xen-*` token classes (no literals).
 */
export declare const MatchTimelineV4: React.ForwardRefExoticComponent<MatchTimelineProps & React.RefAttributes<HTMLDivElement>>;
export type { MatchEvent, MatchEventKind };
//# sourceMappingURL=MatchTimelineV4.d.ts.map