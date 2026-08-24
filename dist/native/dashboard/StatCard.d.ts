import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface StatCardProps {
    /** Metric name, e.g. "Monthly revenue". */
    label: string;
    /** The dominant value, e.g. "$12.4k" or 128. */
    value: React.ReactNode;
    /** Optional change readout, e.g. "+12%". */
    delta?: string;
    /** Direction of `delta`; drives the success/danger tone. */
    trend?: 'up' | 'down';
    /** Optional leading icon/illustration slot. */
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single at-a-glance metric card. The `value` is the dominant element; the
 * `delta` reads in a success (up) or danger (down) tone. Token-only; the native
 * mirror of a dashboard stat tile every admin screen otherwise hand-rolls.
 */
export declare function StatCard({ label, value, delta, trend, icon, style, }: StatCardProps): React.ReactElement;
//# sourceMappingURL=StatCard.d.ts.map