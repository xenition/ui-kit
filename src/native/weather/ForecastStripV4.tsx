import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel } from './weather-utils';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft, skyTile } from './internal/v4-sky';
import type { ForecastStripProps, ForecastDay } from './ForecastStrip';

/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV4Props = ForecastStripProps;

/**
 * ForecastStrip — **sky tiles** design (v4). A rounded gradient panel of soft
 * translucent day tiles (horizontal scroll, or full-width rows under
 * `variant='list'`): day label, condition glyph + label, and high/low. The
 * selected day inverts to a solid near-white tile with deep-brand text — a filled
 * chip plus a bold label, never color alone. Gradient, ink and tiles all derive
 * from the brand ramp; no literal colors. Renders a muted line when `days` is
 * empty. Same props as {@link ForecastStripProps}.
 */
export function ForecastStripV4({
  days,
  unit = '°',
  selectedIndex,
  onSelectDay,
  variant = 'scroll',
  emptyLabel = 'No forecast available',
  style,
}: ForecastStripV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);
  const isRow = variant === 'list';

  const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.md, overflow: 'hidden' as const };

  if (days.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ borderRadius: tokens.radius.lg }, style]}>
        <GradientSurface colors={skyGradient(r)} style={surface}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>{emptyLabel}</Text>
        </GradientSurface>
      </View>
    );
  }

  const renderCell = (day: ForecastDay, index: number): React.ReactElement => {
    const selected = index === selectedIndex;
    const label = conditionLabel(day.condition);
    const glyph = conditionGlyph(day.condition);
    const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${
      day.low != null ? `, low ${day.low}${unit}` : ''
    }`;
    // Selected tile is near-white; its text is the deep end of the brand ramp.
    const fg = selected ? r.primary[700] : ink;
    const fgSoft = selected ? r.primary[500] : inkSoft;

    return (
      <Pressable
        key={`${day.label}-${index}`}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={a11y}
        onPress={onSelectDay ? () => onSelectDay(day, index) : undefined}
        style={({ pressed }) => [
          {
            flexDirection: isRow ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: isRow ? 'space-between' : 'center',
            gap: tokens.spacing.xs,
            minWidth: isRow ? undefined : 70,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: selected ? r.primary[50] : skyTile(r, pressed ? 0.26 : 0.16),
          },
        ]}
      >
        <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: selected ? '800' : '600', flex: isRow ? 1 : undefined, textAlign: isRow ? 'left' : 'center' }}>
          {day.label}
        </Text>
        <Icon glyph={glyph} size="lg" accessibilityLabel={label} style={{ color: fg }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
            {day.high != null ? `${day.high}${unit}` : '—'}
          </Text>
          <Text style={{ color: fgSoft, fontSize: tokens.typography.scale.sm }}>
            {day.low != null ? `${day.low}${unit}` : '—'}
          </Text>
        </View>
        {day.precip != null ? (
          <Text style={{ color: fgSoft, fontSize: tokens.typography.scale.xs }}>💧 {day.precip}%</Text>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface colors={skyGradient(r)} style={surface}>
        {isRow ? (
          <View style={{ gap: tokens.spacing.sm }}>{days.map(renderCell)}</View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.sm }}>
            {days.map(renderCell)}
          </ScrollView>
        )}
      </GradientSurface>
    </View>
  );
}
