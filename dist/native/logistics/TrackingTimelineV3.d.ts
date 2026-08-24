import * as React from 'react';
import type { TrackingTimelineProps } from './TrackingTimeline';
/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV3Props = TrackingTimelineProps;
/**
 * TrackingTimeline, alternate design **V3** — a *compact horizontal step bar*.
 * The four lifecycle stages **picked → in-transit → out-for-delivery →
 * delivered** sit left-to-right as small nodes joined by connector segments
 * that fill with tone once passed; each stage's glyph sits in the node and its
 * word sits below, with the current stage bolded — glyph + word, never color
 * alone (each node carries a redundant a11y label). The current stage's event
 * time/detail is summarised in a caption underneath. An `exception` current
 * stage collapses to a danger strip. Empty/loading supported. No literal colors.
 */
export declare function TrackingTimelineV3({ current, events, loading, style, }: TrackingTimelineV3Props): React.ReactElement;
//# sourceMappingURL=TrackingTimelineV3.d.ts.map