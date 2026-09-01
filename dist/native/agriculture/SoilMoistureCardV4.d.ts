import * as React from 'react';
import type { SoilMoistureCardProps, SoilMoistureStatus } from './SoilMoistureCard';
export interface SoilMoistureCardV4Props extends SoilMoistureCardProps {
    /** Override the band names — three English words lived inside the component. */
    statusLabels?: Partial<Record<SoilMoistureStatus, string>>;
    /** Shown in place of the reading when there is none. Default `'—'`. */
    unknownLabel?: string;
    /** Label for the trend chart. Default `'Trend'`. */
    trendLabel?: string;
}
/**
 * **V4 soil moisture card** — same props as {@link SoilMoistureCard} plus
 * `statusLabels`, `unknownLabel` and `trendLabel`.
 *
 * ## Five changes
 *
 * 1. **The trend is `LineChartV4`**, on the validated chart palette, and it is
 *    given a status tone **only** where the band genuinely is one. The base
 *    passed `color: keyof SemanticColors` straight through as an identity,
 *    which is what `CHARTS-V4-BRIEF.md` §2/§3 retired.
 * 2. **The reading takes contrast-corrected ink.** A `3xl` number painted in
 *    the `warn` *fill* slot was the largest low-contrast element on the card.
 * 3. **The soil temperature carries an icon, not an emoji glued into the
 *    string** — `'🌡️ ' + soilTemp` cannot be tinted and is read aloud as the
 *    emoji's name.
 * 4. **The reading is tabular**, so a dashboard of sensors lines up.
 * 5. **Type comes from `TextV4`** and every caption moves to `mutedText`.
 *
 * With no `moisture` the card still composes: the badge, the label and the
 * trend all stand on their own.
 */
export declare function SoilMoistureCardV4({ moisture, label, status, trend, soilTemp, title, chartHeight, statusLabels, unknownLabel, trendLabel, style, }: SoilMoistureCardV4Props): React.ReactElement;
//# sourceMappingURL=SoilMoistureCardV4.d.ts.map