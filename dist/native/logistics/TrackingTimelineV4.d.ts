import * as React from 'react';
import type { TrackingTimelineProps } from './TrackingTimeline';
/** Drop-in for {@link TrackingTimelineProps} — same props, the V4 "dispatch" design. */
export type TrackingTimelineV4Props = TrackingTimelineProps;
/**
 * TrackingTimeline — **V4** "dispatch" design (native twin of the web V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`dispatchGradient`) in near-white ink (`dispatchInk` / `dispatchInkSoft`). The
 * body — the canonical **picked → in-transit → out-for-delivery → delivered**
 * rail — stays on the plain surface: reached stages fill with their tone token +
 * a glyph, the current stage is ringed, upcoming stages are muted. Status is
 * carried by glyph + stage word (+ a redundant per-node `accessibilityLabel`),
 * never color alone; an `exception` current stage flags the hero with a danger
 * word. Empty/loading states supported. Token-only colors via
 * `useXenitionTheme()` + the dispatch ramp helpers, dark-mode safe.
 */
export declare function TrackingTimelineV4({ current, events, loading, style, }: TrackingTimelineV4Props): React.ReactElement;
//# sourceMappingURL=TrackingTimelineV4.d.ts.map