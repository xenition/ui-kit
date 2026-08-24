import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';
import type { SemanticColors } from '../theme';

/** Severity of a civic / emergency alert — drives glyph, label, and token slot. */
export type AlertSeverity = 'info' | 'advisory' | 'warning' | 'emergency';

interface SeverityDescriptor {
  label: string;
  glyph: string;
  /** Semantic color slot the alert tints (never color alone — always + glyph + label). */
  slot: keyof SemanticColors;
}

const SEVERITY: Record<AlertSeverity, SeverityDescriptor> = {
  info: { label: 'Information', glyph: 'ℹ️', slot: 'primary' },
  advisory: { label: 'Advisory', glyph: '📢', slot: 'accent' },
  warning: { label: 'Warning', glyph: '⚠️', slot: 'warn' },
  emergency: { label: 'Emergency', glyph: '🚨', slot: 'danger' },
};

export interface CivicAlertProps {
  /** Alert severity — drives the glyph, label, and token color slot. */
  severity: AlertSeverity;
  /** Alert headline. */
  title: string;
  /** Body / detail message. */
  message?: string;
  /** Issuing agency / source. */
  source?: string;
  /** Localized issued time (already formatted). */
  time?: string;
  /** Label for the primary action (shown only with `onAction`). */
  actionLabel?: string;
  /** Fires the primary action (e.g. "View details", "Get directions"). */
  onAction?: () => void;
  /** Fires dismiss; a dismiss control is shown only when supplied. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses the RN
 * `alert` accessibility role so screen readers announce it. Optional primary and
 * dismiss actions. Every color traces to a `SemanticColors` slot or a
 * token-derived tint — no literals.
 */
export function CivicAlert({
  severity,
  title,
  message,
  source,
  time,
  actionLabel = 'View details',
  onAction,
  onDismiss,
  style,
}: CivicAlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = SEVERITY[severity] ?? SEVERITY.info;
  const accent = colors[sd.slot];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${sd.label}: ${title}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: accent,
          backgroundColor: withAlpha(accent, 0.12),
        },
        style,
      ]}
    >
      <Icon glyph={sd.glyph} size="xl" color={sd.slot} accessibilityLabel={sd.label} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
          {sd.label}
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {message != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{message}</Text>
        ) : null}
        {source != null || time != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[source, time].filter((v) => v != null && v !== '').join(' · ')}
          </Text>
        ) : null}
        {onAction != null ? (
          <View style={{ marginTop: tokens.spacing.sm, alignItems: 'flex-start' }}>
            <Button
              size="sm"
              tone={severity === 'emergency' ? 'danger' : 'default'}
              onPress={onAction}
            >
              {actionLabel}
            </Button>
          </View>
        ) : null}
      </View>
      {onDismiss != null ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          onPress={onDismiss}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Icon glyph="✕" size="sm" color="muted" accessibilityLabel="Dismiss" />
        </Pressable>
      ) : null}
    </View>
  );
}
