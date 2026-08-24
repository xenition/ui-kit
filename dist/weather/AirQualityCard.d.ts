import * as React from 'react';
/** AQI severity band. */
export type AqiBand = 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
export interface AirQualityCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
    /** US AQI index value (0–500+). */
    aqi?: number;
    /** Dominant pollutant caption (e.g. `'PM2.5'`). */
    pollutant?: string;
    /** Short guidance sentence. */
    advice?: string;
    /** Loading skeleton. */
    loading?: boolean;
    /** Message shown when `aqi` is absent. */
    emptyLabel?: string;
}
/**
 * Air-quality index card (web parity of the native `AirQualityCard`): the
 * numeric AQI, its severity band shown as a `Badge` glyph + text label (never
 * color alone), a token scale track with a positioned marker, and optional
 * pollutant/advice captions. Severity maps to success/warn/danger token tones.
 * Renders a muted empty state when `aqi` is absent and a token skeleton when
 * `loading`. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export declare const AirQualityCard: React.ForwardRefExoticComponent<AirQualityCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AirQualityCard.d.ts.map