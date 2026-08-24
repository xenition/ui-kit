import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Badge } from '../primitives';

/** Advisory category. Drives the default glyph. */
export type AdvisoryKind = 'frost' | 'heat' | 'rain' | 'wind' | 'drought' | 'storm' | 'general';
/** Advisory severity — colors the banner and is stated as a text chip. */
export type AdvisorySeverity = 'info' | 'watch' | 'warning' | 'severe';

export interface WeatherAdvisoryProps {
  /** Advisory headline (e.g. "Frost expected overnight"). */
  title: string;
  /** Supporting detail (e.g. "Lows near -2°C, 03:00–07:00"). */
  message?: string;
  /** Category. Default `'general'` — selects the leading glyph. */
  kind?: AdvisoryKind;
  /** Severity. Default `'info'` — colors the banner + text chip. */
  severity?: AdvisorySeverity;
  /** Valid-window / timing hint (e.g. "Tonight → 7am"). */
  timeframe?: string;
  /** Override the leading glyph/emoji. */
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

/** Token-derived translucent tint (no literal hex; mirrors the primitives). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
 * A weather advisory banner — a tinted, accent-barred callout carrying a
 * category glyph, headline, optional message + timeframe, and a severity
 * {@link Badge}. Severity drives the color, but the text chip states it too, so
 * the alert never relies on color alone. Announced to assistive tech via
 * `accessibilityRole="alert"`. The tint is a token-derived `withAlpha` of the
 * severity slot — no literal colors.
 */
export function WeatherAdvisory({
  title,
  message,
  kind = 'general',
  severity = 'info',
  timeframe,
  icon,
  style,
}: WeatherAdvisoryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY_META[severity];
  const glyph = icon ?? KIND_GLYPH[kind];
  const accent = colors[meta.color];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderLeftWidth: 4,
          borderLeftColor: accent,
          backgroundColor: withAlpha(accent, 0.12),
        },
        style,
      ]}
    >
      <Icon glyph={glyph} size="xl" color={meta.color} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {meta.label}
          </Badge>
        </View>
        {message != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: 2 }}>
            {message}
          </Text>
        ) : null}
        {timeframe != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 4 }}>
            🕓 {timeframe}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
