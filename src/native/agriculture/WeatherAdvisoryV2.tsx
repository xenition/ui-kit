import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';

/** Drop-in alternate of {@link WeatherAdvisoryProps} — identical prop contract. */
export type WeatherAdvisoryV2Props = WeatherAdvisoryProps;

const KIND_GLYPH: Record<AdvisoryKind, string> = {
  frost: '❄️',
  heat: '🔥',
  rain: '🌧️',
  wind: '💨',
  drought: '🏜️',
  storm: '⛈️',
  general: '🌤️',
};

const SEVERITY_META: Record<
  AdvisorySeverity,
  { label: string; color: keyof SemanticColors; tone: 'primary' | 'warn' | 'danger' }
> = {
  info: { label: 'Info', color: 'primary', tone: 'primary' },
  watch: { label: 'Watch', color: 'warn', tone: 'warn' },
  warning: { label: 'Warning', color: 'warn', tone: 'warn' },
  severe: { label: 'Severe', color: 'danger', tone: 'danger' },
};

/**
 * WeatherAdvisory — design variant **V2**: a **big alert banner card** — a large
 * severity glyph in a tinted circular disc on the left, a bold headline, message
 * and timeframe stacked to the right, and a severity {@link Badge}. The whole
 * surface is a tinted, elevated card with a thick severity edge, so it reads as
 * a full-width hero alert rather than V1's slim callout. Severity is stated in
 * text, never color alone. Announced via `accessibilityRole="alert"`. Same props
 * as {@link WeatherAdvisoryProps}. Token-only.
 */
export function WeatherAdvisoryV2({
  title,
  message,
  kind = 'general',
  severity = 'info',
  timeframe,
  icon,
  style,
}: WeatherAdvisoryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY_META[severity];
  const glyph = icon ?? KIND_GLYPH[kind];
  const accent = colors[meta.color];

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderTopWidth: 5,
      borderTopColor: accent,
      backgroundColor: withAlpha(accent, 0.1),
      ...shadow('md', tokens),
    },
    style,
  ];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`}
      style={container}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(accent, 0.16),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'] }}>{glyph}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800', fontFamily: tokens.typography.fontHeading, marginTop: tokens.spacing.xs }}>
          {title}
        </Text>
        {message != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>
            {message}
          </Text>
        ) : null}
        {timeframe != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
            🕓 {timeframe}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
