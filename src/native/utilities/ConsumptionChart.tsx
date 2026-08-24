import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card } from '../primitives';
import { BarChart, LineChart, type LineChartDatum } from '../charts';
import { formatUsage } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

/** One period's consumption. */
export interface ConsumptionPoint {
  /** Axis label (e.g. "Jan", "W1"). */
  label: string;
  /** Consumption for the period, in `unit`s. */
  value: number;
}

export interface ConsumptionChartProps {
  /** Utility line — drives the title glyph, label, and default unit. */
  kind: UtilityKind;
  /** Ordered per-period consumption. */
  data: ConsumptionPoint[];
  /** Chart family — reuses the token-bound `BarChart` or `LineChart` (default `bar`). */
  variant?: 'bar' | 'line';
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed total (default `0`). */
  decimals?: number;
  /** Title override (defaults to "<Utility> usage"). */
  title?: string;
  /** Plot height in px (default `140`). */
  height?: number;
  /** Loading skeleton flag — renders a placeholder instead of the chart. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A consumption-over-time chart card that **reuses** the token-bound `BarChart` /
 * `LineChart` primitives rather than drawing its own geometry. It derives the
 * period total from the data (via `formatUsage`, so it never renders `NaN`),
 * renders an accessible summary, and degrades to an inline empty message when
 * there are no points (guarded indexing throughout). Every color traces to a
 * token — the charts express series via theme color keys, never a literal.
 */
export function ConsumptionChart({
  kind,
  data,
  variant = 'bar',
  unit,
  decimals = 0,
  title,
  height = 140,
  loading = false,
  style,
}: ConsumptionChartProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const points = Array.isArray(data) ? data : [];
  const heading = title ?? `${kd.label} usage`;

  if (loading) {
    return (
      <Card style={style}>
        <View accessibilityLabel="Loading usage chart" style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '50%',
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
          <View style={{ height, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
        </View>
      </Card>
    );
  }

  const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
  const labels = points.map((p) => p.label);
  const total = values.reduce((sum, v) => sum + v, 0);

  return (
    <Card style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.md,
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {heading}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Total {formatUsage(total, u, decimals)}
        </Text>
      </View>

      {points.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          No usage recorded yet.
        </Text>
      ) : variant === 'line' ? (
        <LineChart
          data={values.map((y, i) => ({ x: i, y }) satisfies LineChartDatum)}
          height={height}
          color="primary"
          accessibilityLabel={`${heading} line chart, ${points.length} periods, total ${formatUsage(total, u, decimals)}`}
        />
      ) : (
        <BarChart
          data={values}
          labels={labels}
          height={height}
          color="primary"
          accessibilityLabel={`${heading} bar chart, ${points.length} periods, total ${formatUsage(total, u, decimals)}`}
        />
      )}
    </Card>
  );
}
