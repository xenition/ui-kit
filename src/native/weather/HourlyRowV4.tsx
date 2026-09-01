import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, conditionGlyph, conditionLabel } from './weather-utils';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft, skyTile } from './internal/v4-sky';
import type { HourlyRowProps } from './HourlyRow';

/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV4Props = HourlyRowProps;

/**
 * HourlyRow — **sky tiles** design (v4). A rounded gradient panel holding a
 * horizontal scroll of soft translucent tiles, one per hour: time, a condition
 * glyph + label, temperature, and an optional precip chance. Gradient stops and
 * near-white ink derive from the brand ramp; the tiles are `skyTile` — no literal
 * colors, condition shown as glyph AND text. Renders a muted line when `hours` is
 * empty. Same props as {@link HourlyRowProps}.
 */
export function HourlyRowV4({
  hours,
  unit = '°',
  showPrecip = true,
  onSelectHour,
  emptyLabel = 'No hourly data',
  style,
}: HourlyRowV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);

  const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.md, overflow: 'hidden' as const };

  if (hours.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ borderRadius: tokens.radius.lg }, style]}>
        <GradientSurface colors={skyGradient(r)} style={surface}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>{emptyLabel}</Text>
        </GradientSurface>
      </View>
    );
  }

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={skyGradient(r)} style={surface}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.sm }}>
          {hours.map((hour, index) => {
            const label = conditionLabel(hour.condition);
            const glyph = conditionGlyph(hour.condition);
            const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`;

            const tile = (
              <View
                style={{
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  minWidth: 62,
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  backgroundColor: skyTile(r),
                }}
              >
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{hour.time}</Text>
                <Icon glyph={glyph} size="lg" accessibilityLabel={label} style={{ color: ink }} />
                <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
                </Text>
                {showPrecip && hour.precip != null ? (
                  <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>💧 {clamp(hour.precip, 0, 100)}%</Text>
                ) : null}
              </View>
            );

            if (!onSelectHour) {
              return (
                <View key={`${hour.time}-${index}`} accessibilityRole="text" accessibilityLabel={a11y}>
                  {tile}
                </View>
              );
            }
            return (
              <Pressable
                key={`${hour.time}-${index}`}
                accessibilityRole="button"
                accessibilityLabel={a11y}
                onPress={() => onSelectHour(hour, index)}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              >
                {tile}
              </Pressable>
            );
          })}
        </ScrollView>
      </GradientSurface>
    </View>
  );
}
