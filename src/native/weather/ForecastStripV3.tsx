import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel, withAlpha } from './weather-utils';
import type { ForecastStripProps, ForecastDay } from './ForecastStrip';

/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV3Props = ForecastStripProps;

/**
 * ForecastStrip — **vertical list** design (v3). Each day is a full-width row:
 * the day label on the left, the condition glyph + short text in the middle, and
 * the high / low temperatures right-aligned; an optional precip chip sits under
 * the day label. The selected row is tinted and its label bolded — never color
 * alone. Rows are divided by hairline separators. Renders a muted empty state
 * when `days` is empty. Same props as {@link ForecastStripProps}; token-only
 * colors.
 */
export function ForecastStripV3({
  days,
  unit = '°',
  selectedIndex,
  onSelectDay,
  emptyLabel = 'No forecast available',
  style,
}: ForecastStripV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container = {
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden' as const,
  };

  if (days.length === 0) {
    return (
      <View accessibilityRole="summary" style={[container, { padding: tokens.spacing.lg }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const renderRow = (day: ForecastDay, index: number): React.ReactElement => {
    const selected = index === selectedIndex;
    const label = conditionLabel(day.condition);
    const glyph = conditionGlyph(day.condition);
    const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${
      day.low != null ? `, low ${day.low}${unit}` : ''
    }`;

    const row = (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          borderTopWidth: index === 0 ? 0 : 1,
          borderTopColor: colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : 'transparent',
        }}
      >
        <View style={{ width: 56 }}>
          <Text
            style={{
              color: selected ? colors.primaryText : colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: selected ? '800' : '600',
            }}
          >
            {day.label}
          </Text>
          {day.precip != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>💧 {day.precip}%</Text>
          ) : null}
        </View>

        <Icon glyph={glyph} size="xl" accessibilityLabel={label} />
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {label}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {day.high != null ? `${day.high}${unit}` : '—'}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
            {day.low != null ? `${day.low}${unit}` : '—'}
          </Text>
        </View>
      </View>
    );

    if (!onSelectDay) {
      return (
        <View key={`${day.label}-${index}`} accessibilityRole="text" accessibilityLabel={a11y}>
          {row}
        </View>
      );
    }
    return (
      <Pressable
        key={`${day.label}-${index}`}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={a11y}
        onPress={() => onSelectDay(day, index)}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {row}
      </Pressable>
    );
  };

  return (
    <View style={[container, style]}>{days.map(renderRow)}</View>
  );
}
