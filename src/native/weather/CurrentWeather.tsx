import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import {
  conditionGlyph,
  conditionLabel,
  type WeatherCondition,
} from './weather-utils';

/** `compact` = single-line summary; `hero` = large stacked layout. */
export type CurrentWeatherVariant = 'hero' | 'compact';

export interface CurrentWeatherProps {
  /** Place name shown as the eyebrow (e.g. `'San Francisco'`). */
  location?: string;
  /** Current temperature (already in the caller's unit). */
  temperature?: number;
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Icon + text condition. Rendered as glyph AND label — never color alone. */
  condition?: WeatherCondition;
  /** "Feels like" apparent temperature. */
  feelsLike?: number;
  /** Daily high. */
  high?: number;
  /** Daily low. */
  low?: number;
  /** Layout density. Default `'hero'`. */
  variant?: CurrentWeatherVariant;
  /** Skeleton state while data loads. */
  loading?: boolean;
  /** Fired when the hero is tapped (e.g. open full forecast). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Hero current-conditions block: location eyebrow, a large temperature, and the
 * condition shown as a glyph beside its text label (accessibility never relies
 * on color). Feels-like plus daily high/low sit underneath. `variant='compact'`
 * collapses to a single row for list headers. Renders a muted placeholder when
 * `temperature` is absent and a skeleton when `loading`. All colors/sizes come
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function CurrentWeather({
  location,
  temperature,
  unit = '°',
  condition,
  feelsLike,
  high,
  low,
  variant = 'hero',
  loading = false,
  onPress,
  style,
}: CurrentWeatherProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasData = temperature != null;
  const label = conditionLabel(condition);
  const glyph = conditionGlyph(condition);

  const a11y =
    hasData && !loading
      ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
      : loading
        ? 'Loading current weather'
        : 'Current weather unavailable';

  if (loading) {
    return (
      <Card
        variant="elevated"
        style={style}
        accessibilityRole="summary"
        accessibilityLabel={a11y}
      >
        <View style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              width: 120,
              height: tokens.typography.scale.sm,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
          <View
            style={{
              width: 160,
              height: tokens.typography.scale['3xl'] * 1.4,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
        </View>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card
        variant="outlined"
        onTouchEnd={onPress}
        style={style}
        accessibilityRole="summary"
        accessibilityLabel={a11y}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
        >
          <Icon glyph={glyph} size="xl" />
          <View style={{ flex: 1 }}>
            {location ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {location}
              </Text>
            ) : null}
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
              {label}
            </Text>
          </View>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
            }}
          >
            {hasData ? `${temperature}${unit}` : '—'}
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card
      variant="elevated"
      onTouchEnd={onPress}
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={a11y}
    >
      {location ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            marginBottom: tokens.spacing.xs,
          }}
        >
          {location}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Icon glyph={glyph} size={tokens.typography.scale['3xl'] * 1.5} />
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'] * 1.4,
            fontWeight: '800',
          }}
        >
          {hasData ? `${temperature}${unit}` : '—'}
        </Text>
      </View>

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

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: tokens.spacing.md,
          marginTop: tokens.spacing.sm,
        }}
      >
        {feelsLike != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            Feels like {feelsLike}
            {unit}
          </Text>
        ) : null}
        {high != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            H {high}
            {unit}
          </Text>
        ) : null}
        {low != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            L {low}
            {unit}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
