import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel } from './weather-utils';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft, skyTile } from './internal/v4-sky';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV4Props = CurrentWeatherProps;

/**
 * CurrentWeather — **sky hero** design (v4). A rounded gradient panel in the mold
 * of a modern weather app: an oversized temperature, the condition as a big glyph
 * beside its label, and feels-like / high / low as soft translucent pill chips.
 * The gradient stops and the near-white ink all come from the brand ramp, so the
 * whole thing restyles from the seed and never uses a literal color; the
 * condition is a glyph AND text — never color alone. Renders a skeleton when
 * `loading`, a `—` placeholder when `temperature` is absent, and collapses to a
 * single row under `variant='compact'`. Same props as {@link CurrentWeatherProps}.
 */
export function CurrentWeatherV4({
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
}: CurrentWeatherV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);
  const hasData = temperature != null;
  const label = conditionLabel(condition);
  const glyph = conditionGlyph(condition);

  const surface = {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    overflow: 'hidden' as const,
  };

  const a11y =
    hasData && !loading
      ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
      : loading
        ? 'Loading current weather'
        : 'Current weather unavailable';

  const Chip = ({ text }: { text: string }) => (
    <View
      style={{
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: skyTile(r),
      }}
    >
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{text}</Text>
    </View>
  );

  let body: React.ReactElement;

  if (loading) {
    const bar = (w: number, h: number) => ({
      width: w,
      height: h,
      borderRadius: tokens.radius.sm,
      backgroundColor: skyTile(r, 0.28),
    });
    body = (
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={bar(120, tokens.typography.scale.sm)} />
        <View style={bar(180, tokens.typography.scale['3xl'] * 1.6)} />
        <View style={bar(140, tokens.typography.scale.base)} />
      </View>
    );
  } else if (variant === 'compact') {
    body = (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Icon glyph={glyph} size="2xl" accessibilityLabel={label} style={{ color: ink }} />
        <View style={{ flex: 1, minWidth: 0 }}>
          {location ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
              {location}
            </Text>
          ) : null}
          <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{label}</Text>
        </View>
        <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
          {hasData ? `${temperature}${unit}` : '—'}
        </Text>
      </View>
    );
  } else {
    const chips: string[] = [];
    if (feelsLike != null) chips.push(`Feels ${feelsLike}${unit}`);
    if (high != null) chips.push(`H ${high}${unit}`);
    if (low != null) chips.push(`L ${low}${unit}`);
    body = (
      <>
        {location ? (
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', letterSpacing: 0.3 }}>
            {location}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.sm }}>
          <Text
            allowFontScaling={false}
            style={{
              color: ink,
              fontSize: tokens.typography.scale['3xl'] * 1.9,
              fontWeight: '800',
              letterSpacing: -2,
            }}
          >
            {hasData ? `${temperature}${unit}` : '—'}
          </Text>
          <Icon glyph={glyph} size={tokens.typography.scale['3xl'] * 1.8} accessibilityLabel={label} style={{ color: ink }} />
        </View>
        <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700', marginTop: tokens.spacing.xs }}>
          {label}
        </Text>
        {chips.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
            {chips.map((c) => (
              <Chip key={c} text={c} />
            ))}
          </View>
        ) : null}
      </>
    );
  }

  const ground = (
    <GradientSurface colors={skyGradient(r)} style={surface}>
      {body}
    </GradientSurface>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => [{ borderRadius: tokens.radius.lg, opacity: pressed ? 0.92 : 1 }, style]}
      >
        {ground}
      </Pressable>
    );
  }
  return (
    <View accessibilityRole="summary" accessibilityLabel={a11y} style={[{ borderRadius: tokens.radius.lg }, style]}>
      {ground}
    </View>
  );
}
