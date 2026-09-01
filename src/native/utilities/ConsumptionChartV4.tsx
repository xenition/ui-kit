import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { BarChart, LineChart, type LineChartDatum } from '../charts';
import { formatUsage } from './internal/format';
import { utilityKind } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { ConsumptionChartProps } from './ConsumptionChart';

/** Drop-in for {@link ConsumptionChartProps} — same props, a different design. */
export type ConsumptionChartV4Props = ConsumptionChartProps;

/**
 * ConsumptionChart — **V4** design. An elevated card that **reuses** the same
 * token-bound `BarChart` / `LineChart` primitives (same data, same series color)
 * rather than drawing its own geometry. A refined header pairs the kind glyph in
 * the signature brand-gradient disc with a derived period total (via
 * `formatUsage`, so it never renders `NaN`) and a small legend. Preserves the
 * loading skeleton and the empty state. Same props as
 * {@link ConsumptionChartProps}; token-only colors.
 */
export function ConsumptionChartV4({
  kind,
  data,
  variant = 'bar',
  unit,
  decimals = 0,
  title,
  height = 140,
  loading = false,
  style,
}: ConsumptionChartV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const points = Array.isArray(data) ? data : [];
  const heading = title ?? `${kd.label} usage`;

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  if (loading) {
    return (
      <View style={[card, style]}>
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
      </View>
    );
  }

  const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
  const labels = points.map((p) => p.label);
  const total = values.reduce((sum, v) => sum + v, 0);

  return (
    <View style={[card, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.md,
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, minWidth: 0 }}>
          <GradientSurface
            colors={brandDisc(r)}
            style={{ width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          >
            <Icon glyph={kd.glyph} size="lg" accessibilityLabel={`${kd.label} usage`} style={{ color: brandInk(r) }} />
          </GradientSurface>
          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {heading}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              Total {formatUsage(total, u, decimals)}
            </Text>
          </View>
        </View>
      </View>

      {points.length === 0 ? (
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
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

      {points.length > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }}>
          <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {kd.label} usage ({u})
          </Text>
        </View>
      ) : null}
    </View>
  );
}
