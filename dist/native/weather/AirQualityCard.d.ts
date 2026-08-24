import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** AQI severity band. */
export type AqiBand = 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
export interface AirQualityCardProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Air-quality index card: the numeric AQI, its severity band shown as a glyph +
 * text label (never color alone), a token-tinted scale bar with a position
 * marker, and optional pollutant/advice captions. Severity maps to
 * success/warn/danger tokens. Renders a muted empty state when `aqi` is absent
 * and a skeleton when `loading`. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function AirQualityCard({ aqi, pollutant, advice, loading, emptyLabel, style, }: AirQualityCardProps): React.ReactElement;
//# sourceMappingURL=AirQualityCard.d.ts.map