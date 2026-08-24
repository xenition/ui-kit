import * as React from 'react';
/** Health of a sensor value. */
export type SensorStatus = 'normal' | 'warn' | 'danger' | 'offline';
export interface SensorReadingProps {
    /** What is being measured (e.g. "Temperature", "CO₂"). */
    label: string;
    /** Numeric/formatted reading. Shown as "—" when `offline`. */
    value?: string | number;
    /** Unit suffix (e.g. "°C", "ppm", "%"). */
    unit?: string;
    /** Leading glyph/emoji (e.g. "🌡️", "💧"). */
    icon?: string;
    /** Reading health — drives the value color + a text status chip. */
    status?: SensorStatus;
    /** Optional trend hint shown under the value (e.g. "↑ 2° since 1pm"). */
    trend?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A single sensor reading — glyph, label, a large value+unit, and a status
 * {@link Badge}. `status` colors the value (`warn`→warn, `danger`→danger,
 * else onSurface/muted) but is always paired with a text chip so an at-risk
 * reading is legible without color. When `offline` the value renders as an em
 * dash. Optional `trend` line sits underneath. Token-bound throughout.
 */
export declare const SensorReading: React.ForwardRefExoticComponent<SensorReadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SensorReading.d.ts.map