import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type TrackingStage } from './internal';
export interface TrackingEvent {
    /** Which lifecycle stage this event belongs to. */
    stage: TrackingStage;
    /** Human timestamp (e.g. `Mon 9:14 AM`). */
    time?: string;
    /** Location / note line under the stage title. */
    detail?: string;
}
export interface TrackingTimelineProps {
    /** The current stage reached: picked → in-transit → out-for-delivery → delivered. */
    current: TrackingStage;
    /** Optional per-stage events (timestamps / locations) to annotate the rail. */
    events?: TrackingEvent[];
    /** Muted skeleton rail while the tracking record loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical delivery tracking rail over the canonical stages
 * **picked → in-transit → out-for-delivery → delivered**. Reached stages fill
 * with their tone token and are marked with a `✓`/glyph; the current stage is
 * ringed; upcoming stages are muted. Status is carried by glyph + stage word
 * (and a redundant `accessibilityLabel` per node), never color alone. An
 * `exception` current stage recolors the reached head to danger. Empty/loading
 * states supported. No literal colors.
 */
export declare function TrackingTimeline({ current, events, loading, style, }: TrackingTimelineProps): React.ReactElement;
//# sourceMappingURL=TrackingTimeline.d.ts.map