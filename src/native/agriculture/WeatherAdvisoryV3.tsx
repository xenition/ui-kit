import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';

/** Drop-in alternate of {@link WeatherAdvisoryProps} — identical prop contract. */
export type WeatherAdvisoryV3Props = WeatherAdvisoryProps;

const KIND_GLYPH: Record<AdvisoryKind, string> = {
  frost: '❄️',
  heat: '🔥',
  rain: '🌧️',
  wind: '💨',
  drought: '🏜️',
  storm: '⛈️',
  general: '🌤️',
};

const SEVERITY_META: Record<AdvisorySeverity, { label: string; color: keyof SemanticColors }> = {
  info: { label: 'Info', color: 'primary' },
  watch: { label: 'Watch', color: 'warn' },
  warning: { label: 'Warning', color: 'warn' },
  severe: { label: 'Severe', color: 'danger' },
};

/**
 * WeatherAdvisory — design variant **V3**: a **compact inline advisory** — a
 * single-line tinted pill with the category glyph, a `SEVERITY — headline`
 * label, and an optional timeframe flush right. Severity shows as a text prefix,
 * never color alone. Announced via `accessibilityRole="alert"`. Same props as
 * {@link WeatherAdvisoryProps}; only the layout differs. Token-only.
 */
export function WeatherAdvisoryV3({
  title,
  message,
  kind = 'general',
  severity = 'info',
  timeframe,
  icon,
  style,
}: WeatherAdvisoryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY_META[severity];
  const glyph = icon ?? KIND_GLYPH[kind];
  const accent = colors[meta.color];

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      borderRadius: tokens.radius.full,
      borderLeftWidth: 3,
      borderLeftColor: accent,
      backgroundColor: withAlpha(accent, 0.1),
    },
    style,
  ];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`}
      style={container}
    >
      <Text style={{ fontSize: tokens.typography.scale.base }}>{glyph}</Text>
      <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm }}>
        <Text style={{ color: accent, fontWeight: '800' }}>{meta.label}</Text>
        <Text style={{ color: colors.onSurface, fontWeight: '600' }}> — {title}</Text>
      </Text>
      {timeframe != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🕓 {timeframe}</Text>
      ) : null}
    </View>
  );
}
