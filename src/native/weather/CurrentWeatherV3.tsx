import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle } from '../primitives/internal/appearance';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV3Props = CurrentWeatherProps;

/**
 * CurrentWeather — **compact left-aligned** design (v3). A single tidy row: the
 * condition glyph, then a left-aligned stack of location / temperature with the
 * condition label and an inline `H · L` line beside it. Built for list headers
 * and dense dashboards. The condition is a glyph AND its text label — never
 * color alone. Renders a muted placeholder when `temperature` is absent and a
 * skeleton when `loading`. Same props as {@link CurrentWeatherProps};
 * token-only colors.
 */
export function CurrentWeatherV3({
  location,
  temperature,
  unit = '°',
  condition,
  feelsLike,
  high,
  low,
  loading = false,
  onPress,
  style,
}: CurrentWeatherV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasData = temperature != null;
  const label = conditionLabel(condition);
  const glyph = conditionGlyph(condition);

  const container = {
    ...appearanceStyle('outline', colors, tokens),
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.md,
  };

  const a11y =
    hasData && !loading
      ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
      : loading
        ? 'Loading current weather'
        : 'Current weather unavailable';

  if (loading) {
    return (
      <View style={[container, style]} accessibilityRole="summary" accessibilityLabel={a11y}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            style={{
              width: 90,
              height: tokens.typography.scale.sm,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
          <View
            style={{
              width: 130,
              height: tokens.typography.scale.xl,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
        </View>
      </View>
    );
  }

  const hiLo: string[] = [];
  if (high != null) hiLo.push(`H ${high}${unit}`);
  if (low != null) hiLo.push(`L ${low}${unit}`);
  if (feelsLike != null) hiLo.push(`Feels ${feelsLike}${unit}`);

  const inner = (
    <>
      <Icon glyph={glyph} size="2xl" accessibilityLabel={label} />

      <View style={{ flex: 1, minWidth: 0 }}>
        {location ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {location}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <Text
            allowFontScaling={false}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
          >
            {hasData ? `${temperature}${unit}` : '—'}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {label}
          </Text>
        </View>
        {hiLo.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>
            {hiLo.join('  ·  ')}
          </Text>
        ) : null}
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View style={[container, style]} accessibilityRole="summary" accessibilityLabel={a11y}>
        {inner}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => [container, { opacity: pressed ? 0.85 : 1 }, style]}
    >
      {inner}
    </Pressable>
  );
}
