import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { metaLine, toneFill, toneInk, type ToneV4 } from './internal/fleet-v4';
import type { ServiceReminderProps, ServiceUrgency } from './ServiceReminder';

export interface ServiceReminderV4Props extends ServiceReminderProps {
  /** Override the urgency words — three English phrases lived inside. */
  urgencyLabels?: Partial<Record<ServiceUrgency, string>>;
  /** Accessible name for the dismiss control. Default `'Dismiss reminder'`. */
  dismissLabel?: string;
}

/** Urgency → tone and default word. Genuinely a status, so the tones stay. */
const URGENCY_META: Record<ServiceUrgency, { label: string; tone: ToneV4 }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  due: { label: 'Due now', tone: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger' },
};

/** How far the ground travels from the card toward the urgency tone. */
const GROUND_TINT = 0.1;

/** The urgency rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;

/**
 * **V4 service reminder** — same props as {@link ServiceReminder} plus
 * `urgencyLabels` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale.** A tinted ground was the only signal; V4
 *    adds the badge word and a leading rail.
 * 2. **`overdue` announces itself.** An overdue service is the one state in
 *    this component that should interrupt, and the base announced all three
 *    identically.
 * 3. **The dismiss control is a 44pt target with a name.** It was an
 *    unlabelled glyph.
 * 4. **The tint is mixed from resolved semantic colours**, so it lands on the
 *    right side of the page in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export function ServiceReminderV4({
  service,
  urgency = 'upcoming',
  glyph = '🔧',
  dueLabel,
  mileageLabel,
  detail,
  variant = 'card',
  urgencyLabels,
  dismissLabel = 'Dismiss reminder',
  actionLabel,
  onAction,
  onDismiss,
  style,
}: ServiceReminderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!service) return null;

  const meta = URGENCY_META[urgency];
  const word = urgencyLabels?.[urgency] ?? meta.label;
  const caption = metaLine([dueLabel, mileageLabel, detail]);
  const card = variant === 'card';

  return (
    <View
      // Only the overdue end interrupts; a reminder that announces every state
      // as an alert teaches the user to ignore all of them.
      accessibilityRole={urgency === 'overdue' ? 'alert' : 'summary'}
      accessibilityLabel={metaLine([word, service, caption])}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: card ? 1 : 0,
          borderColor: colors.border,
          backgroundColor: card ? mixToken(colors.card, toneFill(theme, meta.tone), GROUND_TINT) : 'transparent',
          padding: card ? tokens.spacing.md : tokens.spacing.sm,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {card ? (
        <View
          style={{
            width: RAIL,
            alignSelf: 'stretch',
            borderRadius: tokens.radius.full,
            backgroundColor: toneFill(theme, meta.tone),
          }}
        />
      ) : null}

      <IconV4 glyph={glyph} size="lg" style={{ color: toneInk(theme, meta.tone) }} />

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4
            face="heading"
            size="base"
            weight="bold"
            tone="onCard"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {service}
          </TextV4>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        </View>

        {caption ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {caption}
          </TextV4>
        ) : null}

        {actionLabel && onAction ? (
          <ButtonV4
            variant="secondary"
            size="sm"
            onPress={onAction}
            accessibilityLabel={actionLabel}
            style={{ alignSelf: 'flex-start' }}
          >
            {actionLabel}
          </ButtonV4>
        ) : null}
      </View>

      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={dismissLabel}
          onPress={onDismiss}
          style={({ pressed }) => ({
            width: minTap(tokens.spacing),
            height: minTap(tokens.spacing),
            marginVertical: -tokens.spacing.sm,
            marginRight: -tokens.spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          })}
        >
          <IconV4 name="close" size="base" color="mutedText" />
        </Pressable>
      ) : null}
    </View>
  );
}
