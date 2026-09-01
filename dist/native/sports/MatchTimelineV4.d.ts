import * as React from 'react';
import type { MatchTimelineProps, MatchEvent, MatchEventKind } from './MatchTimeline';
/** Drop-in for {@link MatchTimelineProps} — same props, the V4 "broadcast" design. */
export type MatchTimelineV4Props = MatchTimelineProps;
/**
 * MatchTimeline — **V4** "broadcast" design. The matchday feed: an elevated card
 * with a center rail, each event hung on the home (left) or away (right) side
 * and anchored by a round node carrying the kind glyph (goal ⚽ / card 🟨 / sub
 * 🔁) tinted from its semantic token, plus a bold minute chip on the rail. Kind
 * is always legible from glyph + shape, not color alone. Same props/behavior as
 * {@link MatchTimelineProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function MatchTimelineV4({ homeLabel, awayLabel, events, emptyLabel, style, }: MatchTimelineV4Props): React.ReactElement;
export type { MatchEvent, MatchEventKind };
//# sourceMappingURL=MatchTimelineV4.d.ts.map