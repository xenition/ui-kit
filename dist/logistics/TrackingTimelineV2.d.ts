import * as React from 'react';
import type { TrackingTimelineProps } from './TrackingTimeline';
/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV2Props = TrackingTimelineProps;
/**
 * TrackingTimeline, alternate design **V2** — a *big vertical rail*. Larger
 * (32px) tone-filled nodes over a thick connector, with each stage's event
 * (time + detail) rendered inside its own tinted card beside the node so the
 * lifecycle **picked → in-transit → out-for-delivery → delivered** reads like a
 * courier tracking screen. Reached stages fill and carry a `✓`/glyph, current is
 * ringed and bold, upcoming are muted — always glyph + word, never color alone
 * (each node carries a redundant a11y label). An `exception` current stage
 * surfaces a danger head card. Empty/loading supported. No literal colors.
 */
export declare const TrackingTimelineV2: React.ForwardRefExoticComponent<TrackingTimelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackingTimelineV2.d.ts.map