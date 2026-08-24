import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type WeightStatus = 'ideal' | 'under' | 'over';
export interface WeightTrackerProps {
    /** Latest weight reading. */
    current: number;
    /** Unit label, e.g. "kg" or "lb". */
    unit?: string;
    /** Change vs. previous reading (same unit). */
    delta?: number;
    /** Recent readings, oldest → newest, for the trend line. */
    history?: number[];
    /** Ideal range `[min, max]` in the same unit; drives the status classification. */
    idealRange?: [number, number];
    /** Explicit status override; computed from `idealRange` otherwise. */
    status?: WeightStatus;
    /** Copy when there is no reading yet. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A pet weight tracker: the current reading with unit, a change delta (down is
 * neutral-good here — vets track both directions, so the delta tone follows the
 * ideal range, not the sign), a status chip vs. the ideal band, and a
 * {@link Sparkline} of recent history. Renders an empty state when there is no
 * reading. Status reads via a labelled chip (not color alone). Token-only colors.
 */
export declare function WeightTracker({ current, unit, delta, history, idealRange, status, emptyLabel, style, }: WeightTrackerProps): React.ReactElement;
//# sourceMappingURL=WeightTracker.d.ts.map