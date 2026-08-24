import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './weather-utils';

/** Severity of a weather advisory, low → high. */
export type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency';

interface SeverityMeta {
  /** Severity tone — warn/danger only, always paired with glyph + label. */
  tone: Extract<keyof SemanticColors, 'warn' | 'danger'>;
  glyph: string;
  label: string;
}

const SEVERITY: Record<WeatherAlertSeverity, SeverityMeta> = {
  advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
  watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
  warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
  emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};

export interface WeatherAlertProps {
  /** Alert headline (e.g. `'Flash Flood Warning'`). */
  title: string;
  /** Longer description / instructions. */
  description?: string;
  /** Severity → tone + glyph. Default `'advisory'`. */
  severity?: WeatherAlertSeverity;
  /** Effective-through caption. */
  until?: string;
  /** Fired when the alert is tapped (open detail). */
  onPress?: () => void;
  /** Fired when the dismiss affordance is pressed; omit to hide it. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Banner for a weather advisory. The severity drives the token tone
 * (warn for advisory/watch, danger for warning/emergency) but is ALSO spelled
 * out with a glyph and a text severity label, so it never relies on color
 * alone. The surface is a `warn`/`danger` token tint with a matching left rail.
 * Optional tap + dismiss callbacks. All colors/sizes come from the compiled
 * theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function WeatherAlert({
  title,
  description,
  severity = 'advisory',
  until,
  onPress,
  onDismiss,
  style,
}: WeatherAlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY[severity];
  const toneColor = colors[meta.tone];

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : 'alert'}
      accessibilityLabel={`${meta.label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderLeftWidth: 4,
          borderLeftColor: toneColor,
          backgroundColor: withAlpha(toneColor, pressed ? 0.22 : 0.14),
        },
        style,
      ]}
    >
      <Icon glyph={meta.glyph} size="lg" accessibilityLabel={meta.label} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            style={{
              color: toneColor,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              textTransform: 'uppercase',
            }}
          >
            {meta.label}
          </Text>
        </View>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            marginTop: 2,
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              marginTop: tokens.spacing.xs,
            }}
          >
            {description}
          </Text>
        ) : null}
        {until ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              marginTop: tokens.spacing.xs,
            }}
          >
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
        >
          <Icon glyph="✕" size="sm" color="muted" accessibilityLabel="Dismiss" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
