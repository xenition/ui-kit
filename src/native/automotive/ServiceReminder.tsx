import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge, Button, type BadgeTone } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Urgency of a service reminder. */
export type ServiceUrgency = 'upcoming' | 'due' | 'overdue';
/** Presentation for a {@link ServiceReminder}. */
export type ServiceReminderVariant = 'card' | 'row';

/** Urgency → tone + spelled-out word (never color alone). */
const URGENCY: Record<ServiceUrgency, { tone: keyof SemanticColors; word: string }> = {
  upcoming: { tone: 'primary', word: 'Upcoming' },
  due: { tone: 'warn', word: 'Due now' },
  overdue: { tone: 'danger', word: 'Overdue' },
};

export interface ServiceReminderProps {
  /** Service name, e.g. `'Oil change'`. */
  service: string;
  /** Urgency level. */
  urgency?: ServiceUrgency;
  /** Icon glyph/emoji for the service (default 🔧). */
  glyph?: string;
  /** When it is due, pre-formatted (e.g. `'Sep 30'` / `'in 2 weeks'`). */
  dueLabel?: string;
  /** Mileage context, pre-formatted (e.g. `'Due at 60,000 mi'`). */
  mileageLabel?: string;
  /** Supporting detail line. */
  detail?: string;
  /** Presentation variant. */
  variant?: ServiceReminderVariant;
  /** Label for the primary action button; button hidden when omitted. */
  actionLabel?: string;
  /** Fires when the action button is pressed (e.g. book service). */
  onAction?: () => void;
  /** Fires when the dismiss/snooze control is pressed. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A vehicle service reminder — the service name, an urgency level
 * (upcoming/due/overdue) shown as a text-labelled badge with a left accent bar
 * so meaning never rests on color, plus due-date and mileage context and an
 * optional action. An `overdue` reminder maps to the `danger` slot per contract.
 * Data + `onAction`/`onDismiss` callbacks only; nothing fetches. Colors come
 * from semantic tokens and `withAlpha` tints — no literal colors.
 * `variant="row"` renders a denser list line.
 */
export function ServiceReminder({
  service,
  urgency = 'upcoming',
  glyph = '🔧',
  dueLabel,
  mileageLabel,
  detail,
  variant = 'card',
  actionLabel,
  onAction,
  onDismiss,
  style,
}: ServiceReminderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const u = URGENCY[urgency] ?? URGENCY.upcoming;
  const toneColor = colors[u.tone];
  const row = variant === 'row';

  const a11y = `${service}, ${u.word}${dueLabel ? `, ${dueLabel}` : ''}${mileageLabel ? `, ${mileageLabel}` : ''}`;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(toneColor, 0.14),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base }}>{glyph}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {service}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[dueLabel, mileageLabel].filter(Boolean).join(' · ')}
        </Text>
      </View>
      <Badge tone={(u.tone === 'muted' ? 'neutral' : u.tone) as BadgeTone} variant="soft" size="sm">
        {u.word}
      </Badge>
    </View>
  );

  return (
    <View
      accessible={!onAction && !onDismiss}
      accessibilityLabel={a11y}
      style={[
        {
          flexDirection: 'row',
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Left accent bar — reinforces urgency alongside the text badge. */}
      <View style={{ width: 4, backgroundColor: toneColor }} />
      <View style={{ flex: 1, padding: row ? tokens.spacing.md : tokens.spacing.lg, gap: row ? tokens.spacing.sm : tokens.spacing.md }}>
        {header}
        {detail && !row ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{detail}</Text>
        ) : null}
        {onAction || onDismiss ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onDismiss ? (
              <View style={{ flex: 1 }}>
                <Button variant="ghost" size="sm" onPress={onDismiss} accessibilityLabel={`Snooze ${service} reminder`}>
                  Snooze
                </Button>
              </View>
            ) : null}
            {onAction && actionLabel ? (
              <View style={{ flex: onDismiss ? 2 : 1 }}>
                <Button
                  variant="primary"
                  tone={urgency === 'overdue' ? 'danger' : 'default'}
                  size="sm"
                  onPress={onAction}
                  accessibilityLabel={`${actionLabel} — ${service}`}
                >
                  {actionLabel}
                </Button>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}
