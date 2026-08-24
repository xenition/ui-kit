import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type VitalStatus = 'normal' | 'low' | 'high' | 'critical';
export interface VitalReading {
    /** Stable key + label, e.g. "Heart rate". */
    label: string;
    /** Measured value (number or preformatted, e.g. "120/80"). */
    value: React.ReactNode;
    /** Unit, e.g. "bpm", "mmHg". */
    unit?: string;
    /** Optional leading glyph. */
    glyph?: string;
    /** Flag vs. expected range. Shown by glyph + text, never color alone. */
    status?: VitalStatus;
}
export interface VitalsPanelProps {
    /** The vital readings to tile out. */
    vitals: VitalReading[];
    /** Optional panel heading. */
    title?: string;
    /** Skeleton placeholder while readings load. */
    loading?: boolean;
    /** Message shown when `vitals` is empty. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A vitals dashboard panel: a responsive grid of reading tiles (heart rate,
 * blood pressure, SpO₂, temperature, …). Each tile shows value + unit and, when
 * flagged, a normal / low / high / critical marker drawn as a glyph + label +
 * warn/danger token color so it is never color-only. Renders a loading skeleton
 * and an empty note. Informational UI only — not a medical device. Token-only
 * colors.
 */
export declare function VitalsPanel({ vitals, title, loading, emptyLabel, style, }: VitalsPanelProps): React.ReactElement;
//# sourceMappingURL=VitalsPanel.d.ts.map