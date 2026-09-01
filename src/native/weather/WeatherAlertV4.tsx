import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './weather-utils';
import { GradientSurface } from './internal/GradientSurface';
import type { WeatherAlertProps, WeatherAlertSeverity } from './WeatherAlert';

/** Drop-in for {@link WeatherAlertProps} — same props, a different design. */
export type WeatherAlertV4Props = WeatherAlertProps;

interface SeverityMeta {
  tone: Extract<keyof SemanticColors, 'warn' | 'danger'>;
  onTone: Extract<keyof SemanticColors, 'onWarn' | 'onDanger'>;
  glyph: string;
  label: string;
}

const SEVERITY: Record<WeatherAlertSeverity, SeverityMeta> = {
  advisory: { tone: 'warn', onTone: 'onWarn', glyph: 'ℹ️', label: 'Advisory' },
  watch: { tone: 'warn', onTone: 'onWarn', glyph: '⚠️', label: 'Watch' },
  warning: { tone: 'danger', onTone: 'onDanger', glyph: '⚠️', label: 'Warning' },
  emergency: { tone: 'danger', onTone: 'onDanger', glyph: '🚨', label: 'Emergency' },
};

/**
 * WeatherAlert — **filled tone banner** design (v4). A bold, gradient-filled
 * severity banner: warn (advisory/watch) or danger (warning/emergency) as the
 * ground, with the severity ALSO spelled out by a glyph and a text label — never
 * color alone. A big icon sits in a translucent chip, a severity pill and title
 * lead, and the copy + "until" line follow — all in the contrast-guaranteed
 * on-tone ink. Optional tap + dismiss. The gradient is the tone token stepped
 * with `withAlpha`; every color traces to a token — no literals. Same props as
 * {@link WeatherAlertProps}.
 */
export function WeatherAlertV4({
  title,
  description,
  severity = 'advisory',
  until,
  onPress,
  onDismiss,
  style,
}: WeatherAlertV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY[severity];
  const tone = colors[meta.tone];
  const ink = colors[meta.onTone];

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : 'alert'}
      accessibilityLabel={`${meta.label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => [{ borderRadius: tokens.radius.lg, opacity: pressed ? 0.95 : 1 }, style]}
    >
      <GradientSurface
        colors={[tone, withAlpha(tone, 0.82)]}
        style={{
          flexDirection: 'row',
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.14,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(ink, 0.22),
          }}
        >
          <Icon glyph={meta.glyph} size="xl" accessibilityLabel={meta.label} style={{ color: ink }} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <View style={{ paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, borderRadius: tokens.radius.full, backgroundColor: withAlpha(ink, 0.22) }}>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {meta.label}
              </Text>
            </View>
          </View>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800', marginTop: tokens.spacing.xs }}>
            {title}
          </Text>
          {description ? (
            <Text style={{ color: withAlpha(ink, 0.92), fontSize: tokens.typography.scale.base, marginTop: tokens.spacing.xs }}>
              {description}
            </Text>
          ) : null}
          {until ? (
            <Text style={{ color: withAlpha(ink, 0.8), fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>
              Until {until}
            </Text>
          ) : null}
        </View>

        {onDismiss ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss alert"
            onPress={onDismiss}
            hitSlop={8}
            style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(ink, 0.18) }}
          >
            <Icon glyph="✕" size="sm" accessibilityLabel="Dismiss" style={{ color: ink }} />
          </Pressable>
        ) : null}
      </GradientSurface>
    </Pressable>
  );
}
