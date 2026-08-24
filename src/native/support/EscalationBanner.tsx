import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './internal';

/** Severity of the escalation. `critical` maps to danger, `warning` to warn. */
export type EscalationLevel = 'info' | 'warning' | 'critical';

export interface EscalationBannerProps {
  /** Severity level (default `warning`). */
  level?: EscalationLevel;
  /** Headline (e.g. "SLA breach imminent"). */
  title: string;
  /** Optional supporting line. */
  message?: string;
  /** Fires when the primary "Escalate" button is pressed. */
  onEscalate?: () => void;
  /** Fires when the secondary "Acknowledge"/dismiss button is pressed. */
  onAcknowledge?: () => void;
  /** Primary button label (default "Escalate"). */
  escalateLabel?: string;
  /** Secondary button label (default "Acknowledge"). */
  acknowledgeLabel?: string;
  /** Show a busy spinner on the escalate button. */
  escalating?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface LevelSpec {
  slot: keyof SemanticColors;
  glyph: string;
  role: string;
}

const LEVEL: Record<EscalationLevel, LevelSpec> = {
  info: { slot: 'primary', glyph: 'ℹ', role: 'Notice' },
  warning: { slot: 'warn', glyph: '⚠', role: 'Warning' },
  critical: { slot: 'danger', glyph: '⛔', role: 'Critical' },
};

/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic tint — never color alone — mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`, with an
 * optional busy spinner) and an "Acknowledge" secondary (`onAcknowledge`). All
 * colors come from `SemanticColors` + token tints; no literal hex.
 */
export function EscalationBanner({
  level = 'warning',
  title,
  message,
  onEscalate,
  onAcknowledge,
  escalateLabel = 'Escalate',
  acknowledgeLabel = 'Acknowledge',
  escalating = false,
  style,
}: EscalationBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = LEVEL[level] ?? LEVEL.warning;
  const accent = colors[spec.slot];
  const escalateTone = level === 'critical' ? 'danger' : level === 'warning' ? 'default' : 'primary';

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${spec.role}: ${title}${message ? `. ${message}` : ''}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          backgroundColor: withAlpha(accent, 0.12),
          borderColor: accent,
          borderWidth: 1,
          borderLeftWidth: 4,
          borderRadius: tokens.radius.md,
        },
        style,
      ]}
    >
      <Icon glyph={spec.glyph} size="lg" color={spec.slot} accessibilityLabel={spec.role} />
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {message ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{message}</Text>
        ) : null}
        {onEscalate || onAcknowledge ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            {onEscalate ? (
              <Button size="sm" tone={escalateTone} loading={escalating} onPress={onEscalate}>
                {escalateLabel}
              </Button>
            ) : null}
            {onAcknowledge ? (
              <Button size="sm" variant="ghost" onPress={onAcknowledge}>
                {acknowledgeLabel}
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}
