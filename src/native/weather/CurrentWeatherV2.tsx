import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { shadow } from '../primitives/internal/elevation';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel, withAlpha } from './weather-utils';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV2Props = CurrentWeatherProps;

/**
 * CurrentWeather — **immersive hero** design (v2). The whole card is a soft
 * primary-tinted wash floating on an `lg` shadow; a large condition glyph sits
 * centered above an oversized temperature, with the condition label beneath and
 * feels-like / high / low carried as quiet tinted pills. The condition is always
 * a glyph AND its text label — never color alone. Renders a muted placeholder
 * when `temperature` is absent and a skeleton when `loading`. Same props as
 * {@link CurrentWeatherProps}; token-only colors.
 */
export function CurrentWeatherV2({
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
}: CurrentWeatherV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const hasData = temperature != null;
  const label = conditionLabel(condition);
  const glyph = conditionGlyph(condition);

  const a11y =
    hasData && !loading
      ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
      : loading
        ? 'Loading current weather'
        : 'Current weather unavailable';

  const wash = {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.xl,
    backgroundColor: withAlpha(colors.primary, 0.1),
    overflow: 'hidden' as const,
    ...shadow('lg', tokens),
  };

  if (loading) {
    return (
      <View style={[wash, style]} accessibilityRole="summary" accessibilityLabel={a11y}>
        <View style={{ alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
          <View
            style={{
              width: 180,
              height: tokens.typography.scale['3xl'] * 1.8,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
        </View>
      </View>
    );
  }

  const pill = (text: string, key: string): React.ReactElement => (
    <View
      key={key}
      style={{
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors.onSurface, 0.06),
      }}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {text}
      </Text>
    </View>
  );

  const pills: React.ReactElement[] = [];
  if (feelsLike != null) pills.push(pill(`Feels ${feelsLike}${unit}`, 'feels'));
  if (high != null) pills.push(pill(`H ${high}${unit}`, 'high'));
  if (low != null) pills.push(pill(`L ${low}${unit}`, 'low'));

  const content = (
    <Animated.View style={{ alignItems: 'center', opacity: enter.opacity, transform: enter.transform }}>
      {location ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: tokens.spacing.md,
          }}
        >
          {location}
        </Text>
      ) : null}

      <Icon glyph={glyph} size={tokens.typography.scale['3xl'] * 2} accessibilityLabel={label} />

      <Text
        allowFontScaling={false}
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale['3xl'] * 2,
          fontWeight: '800',
          marginTop: tokens.spacing.sm,
        }}
      >
        {hasData ? `${temperature}${unit}` : '—'}
      </Text>

      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '600',
          marginTop: tokens.spacing.xs,
        }}
      >
        {label}
      </Text>

      {pills.length ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
            marginTop: tokens.spacing.md,
          }}
        >
          {pills}
        </View>
      ) : null}
    </Animated.View>
  );

  if (!onPress) {
    return (
      <View style={[wash, style]} accessibilityRole="summary" accessibilityLabel={a11y}>
        {content}
      </View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[wash, style]}
      >
        {content}
      </Pressable>
    </Animated.View>
  );
}
