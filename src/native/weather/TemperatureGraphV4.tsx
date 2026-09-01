import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { LineChart } from '../charts/LineChart';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft } from './internal/v4-sky';
import type { TemperatureGraphProps } from './TemperatureGraph';

/** Drop-in for {@link TemperatureGraphProps} — same props, a different design. */
export type TemperatureGraphV4Props = TemperatureGraphProps;

/**
 * TemperatureGraph — **sky** design (v4). The shared `LineChart` over a rounded
 * gradient panel, with the title + min/max annotation in near-white ink and
 * x-axis labels in a softer ink — the weather-app "chance of rain" look. The
 * curve defaults to the `accent` token so it reads on the brand ground
 * (overridable via `color`); every color traces to a token, never a literal.
 * Renders a muted note when `data` is empty. Same props as
 * {@link TemperatureGraphProps}.
 */
export function TemperatureGraphV4({
  data,
  labels,
  unit = '°',
  title = 'Temperature',
  color = 'accent',
  height = 160,
  width = 300,
  emptyLabel = 'No temperature data',
  style,
}: TemperatureGraphV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);

  const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' as const };

  if (data.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ borderRadius: tokens.radius.lg }, style]}>
        <GradientSurface colors={skyGradient(r)} style={surface}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }}>{emptyLabel}</Text>
        </GradientSurface>
      </View>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={skyGradient(r)} style={surface}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.sm }}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
            H {max}
            {unit} · L {min}
            {unit}
          </Text>
        </View>

        <LineChart
          data={data}
          color={color}
          height={height}
          width={width}
          showDots
          accessibilityLabel={`Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points`}
        />

        {labels && labels.length > 0 ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
            {labels.map((label, index) => (
              <Text key={`${label}-${index}`} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
                {label}
              </Text>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
