import * as React from 'react';
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
export interface VitalsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The vital readings to tile out. */
    vitals: VitalReading[];
    /** Optional panel heading. */
    title?: string;
    /** Skeleton placeholder while readings load. */
    loading?: boolean;
    /** Message shown when `vitals` is empty. */
    emptyLabel?: string;
}
/**
 * A vitals dashboard panel — the web mirror of the native `VitalsPanel`. A
 * responsive grid of reading tiles (heart rate, blood pressure, SpO₂,
 * temperature, …). Each tile shows value + unit and, when flagged, a normal /
 * low / high / critical marker drawn as a glyph + label + warn/danger token
 * color so it is never color-only. Renders a loading skeleton and an empty
 * state (`EmptyState`). Token-only colors. Informational UI only — not a medical
 * device.
 */
export declare const VitalsPanel: React.ForwardRefExoticComponent<VitalsPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VitalsPanel.d.ts.map