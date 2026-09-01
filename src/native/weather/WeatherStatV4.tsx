import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk } from './internal/v4-sky';
import type { WeatherStatProps } from './WeatherStat';

/** Drop-in for {@link WeatherStatProps} — same props, a different design. */
export type WeatherStatV4Props = WeatherStatProps;

/**
 * WeatherStat — **sky tile** design (v4). A polished metric tile: the leading
 * glyph sits in a small gradient badge (the brand ramp), the muted label rides
 * above a large token-scaled value with an optional unit suffix, and a caption
 * closes it. Same label / value / unit / caption / glyph contract as the base;
 * `variant='plain'` drops the card chrome for dense grids. Every color/size
 * traces to the compiled theme — no literal colors. Renders a muted placeholder
 * when `value` is absent. Same props as {@link WeatherStatProps}.
 */
export function WeatherStatV4({
  label,
  value,
  unit,
  glyph,
  caption,
  variant = 'card',
  emptyValue = '—',
  style,
}: WeatherStatV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const hasValue = value != null;
  const badge = tokens.typography.scale.xl + tokens.spacing.sm;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {glyph ? (
          <GradientSurface
            colors={skyGradient(r)}
            style={{ width: badge, height: badge, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          >
            <Icon glyph={glyph} size="base" style={{ color: skyInk(r) }} />
          </GradientSurface>
        ) : null}
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{label}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs, marginTop: tokens.spacing.sm }}>
        {typeof value === 'string' || typeof value === 'number' || !hasValue ? (
          <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1 }}>
            {hasValue ? value : emptyValue}
          </Text>
        ) : (
          value
        )}
        {unit && hasValue ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base, marginBottom: 3 }}>{unit}</Text>
        ) : null}
      </View>

      {caption ? (
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>{caption}</Text>
      ) : null}
    </>
  );

  const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;

  if (variant === 'plain') {
    return (
      <View accessibilityRole="summary" accessibilityLabel={a11y} style={style}>
        {body}
      </View>
    );
  }

  const surface: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      minWidth: 150,
      flexGrow: 1,
      flexBasis: 0,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  return (
    <View accessibilityRole="summary" accessibilityLabel={a11y} style={surface}>
      {body}
    </View>
  );
}
