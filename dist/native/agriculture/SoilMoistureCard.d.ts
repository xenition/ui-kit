import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Moisture band — colors the reading and pairs with a text chip. */
export type SoilMoistureStatus = 'dry' | 'optimal' | 'wet';
export interface SoilMoistureCardProps {
    /** Current volumetric moisture percent (0–100). Clamped/guarded. */
    moisture?: number;
    /** Sensor / zone label (e.g. "Zone 3 · 30cm"). */
    label?: string;
    /** Moisture band. Default derived from `moisture` thresholds. */
    status?: SoilMoistureStatus;
    /** Recent moisture samples for the trend line. Empty → no chart. */
    trend?: number[];
    /** Companion reading (e.g. soil temperature "18°C"). */
    soilTemp?: string;
    /** Card title. Default "Soil moisture". */
    title?: string;
    /** Chart height in px. Default 90. */
    chartHeight?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A soil-moisture panel — a titled {@link Card} showing the current percent
 * (colored by band and paired with a text {@link Badge}, never color alone), a
 * fill {@link Progress}, an optional companion soil-temperature reading, and a
 * recent {@link LineChart} trend. The moisture value is clamped to [0,100] and
 * `status` defaults to a threshold-derived band. An empty `trend` simply omits
 * the chart. Token-bound throughout — no literal colors.
 */
export declare function SoilMoistureCard({ moisture, label, status, trend, soilTemp, title, chartHeight, style, }: SoilMoistureCardProps): React.ReactElement;
//# sourceMappingURL=SoilMoistureCard.d.ts.map