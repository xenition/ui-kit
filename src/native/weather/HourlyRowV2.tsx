import * as React from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { Icon } from '../primitives/Icon';
import { clamp, conditionGlyph, conditionLabel, withAlpha } from './weather-utils';
import type { HourlyRowProps, HourlyPoint } from './HourlyRow';

/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV2Props = HourlyRowProps;

/** One rounded hour tile — hook-per-tile lives in its own component. */
function HourTile({
  hour,
  index,
  unit,
  showPrecip,
  onSelectHour,
}: {
  hour: HourlyPoint;
  index: number;
  unit: string;
  showPrecip: boolean;
  onSelectHour?: (hour: HourlyPoint, i: number) => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const label = conditionLabel(hour.condition);
  const glyph = conditionGlyph(hour.condition);
  const precip = hour.precip != null ? clamp(hour.precip, 0, 100) : null;

  const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}${
    precip != null ? `, ${precip}% precipitation` : ''
  }`;

  const tile = (
    <View
      style={{
        width: 78,
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        backgroundColor: withAlpha(colors.primary, 0.08),
      }}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {hour.time}
      </Text>
      <Icon glyph={glyph} size="2xl" accessibilityLabel={label} />
      <Text
        allowFontScaling={false}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}
      >
        {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
      </Text>
      {showPrecip && precip != null ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.onSurface, 0.06),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs }}>
            💧
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {precip}%
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (!onSelectHour) {
    return (
      <View accessibilityRole="text" accessibilityLabel={a11y}>
        {tile}
      </View>
    );
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={() => onSelectHour(hour, index)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {tile}
      </Pressable>
    </Animated.View>
  );
}

/**
 * HourlyRow — **bold rounded tiles** design (v2). A horizontal scroll of soft
 * primary-tinted, generously-rounded hour tiles; each carries the time, a large
 * condition glyph + label, a bold temperature, and a pill-shaped precip chip.
 * The condition is a glyph AND its text label — never color alone. Renders a
 * muted empty state when `hours` is empty. Same props as {@link HourlyRowProps};
 * token-only colors.
 */
export function HourlyRowV2({
  hours,
  unit = '°',
  showPrecip = true,
  onSelectHour,
  emptyLabel = 'No hourly data',
  style,
}: HourlyRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (hours.length === 0) {
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

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
      style={style}
    >
      {hours.map((hour, index) => (
        <HourTile
          key={`${hour.time}-${index}`}
          hour={hour}
          index={index}
          unit={unit}
          showPrecip={showPrecip}
          onSelectHour={onSelectHour}
        />
      ))}
    </ScrollView>
  );
}
