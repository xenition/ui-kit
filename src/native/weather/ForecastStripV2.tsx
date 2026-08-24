import * as React from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel, withAlpha } from './weather-utils';
import type { ForecastStripProps, ForecastDay } from './ForecastStrip';

/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV2Props = ForecastStripProps;

interface Range {
  min: number;
  max: number;
}

function tempRange(days: ForecastDay[]): Range {
  const temps: number[] = [];
  for (const d of days) {
    if (d.high != null) temps.push(d.high);
    if (d.low != null) temps.push(d.low);
  }
  if (temps.length === 0) return { min: 0, max: 1 };
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  return { min, max: max === min ? min + 1 : max };
}

/** One large tappable day card — hook-per-card lives in its own component. */
function DayCard({
  day,
  index,
  unit,
  range,
  selected,
  onSelectDay,
}: {
  day: ForecastDay;
  index: number;
  unit: string;
  range: Range;
  selected: boolean;
  onSelectDay?: (day: ForecastDay, i: number) => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const label = conditionLabel(day.condition);
  const glyph = conditionGlyph(day.condition);

  const span = range.max - range.min;
  const lowPct = day.low != null ? (day.low - range.min) / span : 0;
  const highPct = day.high != null ? (day.high - range.min) / span : 1;
  const barLeft = `${Math.max(0, Math.min(1, lowPct)) * 100}%` as `${number}%`;
  const barWidth = `${Math.max(0.08, Math.min(1, highPct - lowPct)) * 100}%` as `${number}%`;

  const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${
    day.low != null ? `, low ${day.low}${unit}` : ''
  }${day.precip != null ? `, ${day.precip}% precipitation` : ''}`;

  const body = (
    <View
      style={{
        width: 108,
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? withAlpha(colors.primary, 0.1) : colors.surface,
      }}
    >
      <Text
        style={{
          color: selected ? colors.primaryText : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: selected ? '800' : '600',
        }}
      >
        {day.label}
      </Text>
      <Icon glyph={glyph} size="2xl" accessibilityLabel={label} />
      <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {label}
      </Text>

      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
        {day.high != null ? `${day.high}${unit}` : '—'}
      </Text>

      {/* Token-tinted hi/lo range bar. */}
      <View
        style={{
          alignSelf: 'stretch',
          height: 6,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.onSurface, 0.08),
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: barLeft,
            width: barWidth,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, selected ? 0.85 : 0.5),
          }}
        />
      </View>

      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {day.low != null ? `${day.low}${unit}` : '—'}
      </Text>

      {day.precip != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs }}>
            💧
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{day.precip}%</Text>
        </View>
      ) : null}
    </View>
  );

  if (!onSelectDay) {
    return (
      <View accessibilityRole="text" accessibilityLabel={a11y}>
        {body}
      </View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={a11y}
        onPress={() => onSelectDay(day, index)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

/**
 * ForecastStrip — **large day cards** design (v2). A horizontal scroll of tall,
 * rounded day cards, each carrying the day label, a big condition glyph + text,
 * the high temperature, a token-tinted hi/lo range bar, the low, and an optional
 * precip chance. The selected day gets a thicker primary border, a soft tint,
 * and a bold label — never color alone. Renders a muted empty state when `days`
 * is empty. Same props as {@link ForecastStripProps}; token-only colors.
 */
export function ForecastStripV2({
  days,
  unit = '°',
  selectedIndex,
  onSelectDay,
  emptyLabel = 'No forecast available',
  style,
}: ForecastStripV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (days.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[
          {
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            padding: tokens.spacing.lg,
          },
          style,
        ]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const range = tempRange(days);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
      style={style}
    >
      {days.map((day, index) => (
        <DayCard
          key={`${day.label}-${index}`}
          day={day}
          index={index}
          unit={unit}
          range={range}
          selected={index === selectedIndex}
          onSelectDay={onSelectDay}
        />
      ))}
    </ScrollView>
  );
}
