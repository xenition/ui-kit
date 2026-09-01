import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ImpactStatProps } from './ImpactStat';

/** Drop-in for {@link ImpactStatProps} — same props, the V4 "rally" design. */
export type ImpactStatV4Props = ImpactStatProps;

/**
 * ImpactStat — **V4** "rally" design. A single mission metric drawn with the
 * warm, elevated "rally" identity: a big legible value numeral, an optional
 * muted unit, a glyph chip in the tone color, a caption label, and a supporting
 * caption. Honors all three `variant`s — `plain` (no surface), `card` (an
 * elevated bordered `colors.card` surface with a soft shadow), and `tile` (a
 * filled soft-tone panel via `withAlpha`) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}; the glyph is decorative and the metric is announced
 * as a `summary`. Tone reads through the glyph + value color, never color
 * alone. Token-only colors via `useXenitionTheme()`.
 */
export function ImpactStatV4({
  value,
  label,
  unit,
  glyph,
  caption,
  variant = 'plain',
  tone = 'primary',
  style,
}: ImpactStatV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;

  const containerStyle: StyleProp<ViewStyle> =
    variant === 'card'
      ? {
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }
      : variant === 'tile'
        ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(accent, 0.12) }
        : null;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`${String(value)}${unit ? ` ${unit}` : ''} ${label}`}
      style={[containerStyle, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {glyph ? (
          <View
            style={{
              width: tokens.spacing.xl,
              height: tokens.spacing.xl,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(accent, 0.14),
            }}
          >
            <Icon glyph={glyph} size="base" />
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{value}</Text>
          ) : (
            value
          )}
          {unit ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>{unit}</Text>
          ) : null}
        </View>
      </View>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>{label}</Text>
      {caption ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>{caption}</Text>
      ) : null}
    </View>
  );
}
