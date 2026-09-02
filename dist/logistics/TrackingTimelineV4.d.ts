import * as React from 'react';
import type { TrackingTimelineProps } from './TrackingTimeline';
/** Drop-in for {@link TrackingTimelineProps} — same props, the V4 "dispatch" design. */
export type TrackingTimelineV4Props = TrackingTimelineProps;
/**
 * TrackingTimeline — **V4** "dispatch" design (web parity of the native V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * canonical **picked → in-transit → out-for-delivery → delivered** rail — stays
 * on the plain surface: reached stages fill with their tone token + a glyph,
 * the current stage is ringed, upcoming stages are muted. Status is carried by
 * glyph + stage word (+ a redundant per-node `aria-label`), never color alone;
 * an `exception` current stage flags the hero with a danger word. Empty/loading
 * states supported. Identical props/behavior to {@link TrackingTimelineProps}.
 * All colors from `--xen-*` token classes / gradient utilities (no literals).
 */
export declare const TrackingTimelineV4: React.ForwardRefExoticComponent<TrackingTimelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackingTimelineV4.d.ts.map