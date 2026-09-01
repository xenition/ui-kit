import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Severity of a home alert — drives the accent, glyph + announced label. */
export type AlertSeverity = 'info' | 'warning' | 'critical';

interface SeverityMeta {
  /** Default glyph when none is supplied. */
  glyph: string;
  /** Word announced before the title so severity never rides on color alone. */
  word: string;
  /** Semantic accent slot: info→primary, warning→warn, critical→danger. */
  accent: keyof SemanticColors;
}

/** info→primary, warning→warn, critical→danger — accent by icon + label, not color alone. */
const SEVERITY_META: Record<AlertSeverity, SeverityMeta> = {
  info: { glyph: 'ℹ️', word: 'Info', accent: 'primary' },
  warning: { glyph: '⚠️', word: 'Warning', accent: 'warn' },
  critical: { glyph: '🚨', word: 'Critical', accent: 'danger' },
};

export interface AlertCardProps {
  /** Alert severity — `info`→primary, `warning`→warn, `critical`→danger. */
  severity: AlertSeverity;
  /** Headline of the alert (e.g. "Front door left open"). */
  title: string;
  /** Optional supporting detail line(s). */
  message?: string;
  /** Optional relative/absolute time, shown muted (e.g. "2m ago"). */
  time?: string;
  /** Optional device or zone the alert came from (e.g. "Front Door"). */
  deviceName?: string;
  /** Override the severity's default glyph/emoji. */
  icon?: string;
  /** When set, renders a dismiss (✕) control that fires this. */
  onDismiss?: () => void;
  /** When set, renders a primary "view" action that fires this. */
  onView?: () => void;
  /** Label for the `onView` action. Defaults to `'View'`. */
  viewLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * AlertCard — **V4** "ambient" home alert. A calm notification card with a
 * **left severity-accent bar**, a severity glyph in a soft-tint disc, and a
 * soft (not saturated) severity-tinted background — `info`→primary,
 * `warning`→warn, `critical`→danger. Severity is spelled out as a word in the
 * accessible label so it never rides on color alone. Optional dismiss (✕) and
 * view actions are ≥44px targets. Presentational only; token-only colors via
 * `useXenitionTheme()` + `withAlpha`, dark-mode safe.
 */
export function AlertCard({
  severity,
  title,
  message,
  time,
  deviceName,
  icon,
  onDismiss,
  onView,
  viewLabel = 'View',
  style,
}: AlertCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY_META[severity] ?? SEVERITY_META.info;
  const accent = colors[meta.accent];
  const meta2 = `${deviceName ?? ''}${deviceName != null && time != null ? ' · ' : ''}${time ?? ''}`;

  return (
    <View
      accessibilityRole={severity === 'critical' ? 'alert' : 'summary'}
      accessibilityLabel={`${meta.word} alert: ${title}`}
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: withAlpha(accent, 0.4),
          backgroundColor: withAlpha(accent, 0.08),
        },
        style,
      ]}
    >
      {/* Left severity-accent bar. */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 4, backgroundColor: accent }} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          paddingLeft: tokens.spacing.md + 4,
        }}
      >
        {/* Severity glyph in a soft-tint disc. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: withAlpha(accent, 0.4),
            backgroundColor: withAlpha(accent, 0.15),
          }}
        >
          <Icon glyph={icon ?? meta.glyph} color={meta.accent} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <Text style={{ flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
              {title}
            </Text>
            {onDismiss ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Dismiss alert"
                onPress={onDismiss}
                style={({ pressed }) => ({
                  width: 44,
                  height: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.md,
                  backgroundColor: pressed ? withAlpha(colors.onSurface, 0.05) : 'transparent',
                })}
              >
                <Icon glyph="✕" color="muted" size="base" />
              </Pressable>
            ) : null}
          </View>
          {message != null ? (
            <Text style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.scale.sm, color: withAlpha(colors.onSurface, 0.8) }}>
              {message}
            </Text>
          ) : null}
          {meta2.length > 0 ? (
            <Text style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.scale.xs, color: colors.muted }}>{meta2}</Text>
          ) : null}
          {onView ? (
            <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={viewLabel}
                onPress={onView}
                style={({ pressed }) => ({
                  minHeight: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onPrimary }}>{viewLabel}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
