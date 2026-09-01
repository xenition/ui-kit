import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { LineChartV4 } from '../charts/LineChartV4';
import { clampPercent, toneInk, type FarmTone } from './internal/farm-v4';
import type { ChartToneV4 } from '../../primitives/internal/v4-chart';
import type { ProgressTone } from '../primitives/Progress';
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
 * Band → tone and default label.
 *
 * `dry` and `optimal` are genuinely a caution and a good outcome, so they keep
 * `warn` and `success`. **`wet` does not get one**: saturated soil is a
 * *reading*, not a verdict — whether it is bad depends on the crop — and §5 of
 * the brief reserves the status colours for things that really mean good or
 * bad. It takes the brand slot, as the base did.
 */
const STATUS_META: Record<
  SoilMoistureStatus,
  { label: string; tone: ProgressTone & FarmTone; chart?: ChartToneV4 }
> = {
  dry: { label: 'Dry', tone: 'warn', chart: 'warn' },
  optimal: { label: 'Optimal', tone: 'success', chart: 'success' },
  wet: { label: 'Saturated', tone: 'primary' },
};

/** Where the bands sit, when `status` is not supplied. */
function deriveStatus(pct: number): SoilMoistureStatus {
  if (pct < 30) return 'dry';
  if (pct > 70) return 'wet';
  return 'optimal';
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
export function SoilMoistureCardV4({
  moisture,
  label,
  status,
  trend,
  soilTemp,
  title = 'Soil moisture',
  chartHeight = 90,
  statusLabels,
  unknownLabel = '—',
  trendLabel = 'Trend',
  style,
}: SoilMoistureCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const pct = clampPercent(moisture);
  const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
  const meta = STATUS_META[band];
  const bandLabel = statusLabels?.[band] ?? meta.label;
  const ink = toneInk(theme, meta.tone);
  const series = Array.isArray(trend) ? trend : [];

  return (
    <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph="💧" size="base" style={{ color: ink }} />
        <TextV4 size="base" weight="semibold" tone="onCard" style={{ flex: 1 }}>
          {title}
        </TextV4>
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {bandLabel}
        </BadgeV4>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <TextV4
          face="heading"
          size="3xl"
          weight="bold"
          numeric="tabular"
          style={{ color: ink }}
        >
          {pct != null ? String(pct) : unknownLabel}
        </TextV4>
        {pct != null ? (
          <TextV4 size="base" tone="mutedText">
            %
          </TextV4>
        ) : null}
        {soilTemp != null ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              marginLeft: tokens.spacing.sm,
            }}
          >
            <IconV4 glyph="🌡️" size="sm" />
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {soilTemp}
            </TextV4>
          </View>
        ) : null}
      </View>

      {label != null ? (
        <TextV4 size="xs" tone="mutedText">
          {label}
        </TextV4>
      ) : null}

      {pct != null ? <ProgressV4 value={pct} tone={meta.tone} /> : null}

      {series.length > 1 ? (
        <LineChartV4
          data={series}
          height={chartHeight}
          // `LineChartV4` carries tone on the SERIES, not the chart: a chart
          // has no single meaning, a series does. One series, named, and given
          // a status tone only where the band genuinely is one.
          series={[{ key: 'moisture', label: trendLabel, tone: meta.chart }]}
          caption={trendLabel}
          accessibilityLabel={`${title} ${trendLabel}, ${series.length} samples`}
        />
      ) : null}
    </CardV4>
  );
}
