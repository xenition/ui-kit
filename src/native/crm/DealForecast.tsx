import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { BarChart, type ChartColor } from '../charts';
import { formatMoney } from '../commerce/money';

export interface ForecastPeriod {
  /** Axis label (e.g. "Jan", "Q1"). */
  label: string;
  /** Forecast amount for the period in integer **cents**. */
  valueCents: number;
}

export interface DealForecastProps {
  /** Per-period forecast series. */
  periods: ForecastPeriod[];
  /** Heading (default "Forecast"). */
  title?: string;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Optional target/quota in cents — shown as a labelled reference. */
  targetCents?: number;
  /** Bar color token (default `primary`; use `success` for won-weighted). */
  color?: ChartColor;
  /** Plot height in px (default 128). */
  height?: number;
  /** Placeholder when there are no periods. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Revenue forecast block — a header with the summed pipeline total (and, when a
 * `targetCents` is given, attainment vs quota) over a reused {@link BarChart} of
 * per-period amounts. Values are integer cents formatted via `formatMoney`; the
 * bar heights are relative so the raw cents map straight to the chart. Renders
 * an empty placeholder for a zero-length series. Bar/text colors are theme
 * tokens (`color` is a `SemanticColors` key) — no literals.
 */
export function DealForecast({
  periods,
  title = 'Forecast',
  currency = 'USD',
  targetCents,
  color = 'primary',
  height = 128,
  emptyLabel = 'No forecast data',
  style,
}: DealForecastProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = periods.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
  const attainment =
    targetCents && targetCents > 0 ? Math.round((total / targetCents) * 100) : undefined;

  return (
    <Card padding="md" style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ gap: 1 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{title}</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {formatMoney(total, currency)}
          </Text>
        </View>
        {attainment != null ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>vs target</Text>
            <Text
              style={{
                color: attainment >= 100 ? colors.success : colors.onSurface,
                fontSize: tokens.typography.scale.base,
                fontWeight: '700',
              }}
            >
              {attainment}%
            </Text>
          </View>
        ) : null}
      </View>

      {periods.length === 0 ? (
        <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      ) : (
        <BarChart
          data={periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0))}
          labels={periods.map((p) => p.label)}
          color={color}
          height={height}
          accessibilityLabel={`Forecast across ${periods.length} periods, total ${formatMoney(total, currency)}`}
        />
      )}
    </Card>
  );
}
