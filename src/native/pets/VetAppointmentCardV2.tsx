import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar, Badge, Button, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** Drop-in alternate design for {@link VetAppointmentCard} — identical props. */
export type VetAppointmentCardV2Props = VetAppointmentCardProps;

interface StatusMeta {
  label: string;
  tone: 'primary' | 'warn' | 'success' | 'neutral';
  slot: keyof SemanticColors;
}

const STATUS_META: Record<VetAppointmentStatus, StatusMeta> = {
  upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
  today: { label: 'Today', tone: 'warn', slot: 'warn' },
  completed: { label: 'Completed', tone: 'success', slot: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral', slot: 'muted' },
};

const REASON_GLYPH: Record<VetVisitReason, string> = {
  checkup: '🩺',
  vaccination: '💉',
  surgery: '🔪',
  dental: '🦷',
  emergency: '🚑',
  grooming: '✂️',
  other: '📋',
};

/**
 * Elevated appointment card — a bolder alternate to {@link VetAppointmentCard}.
 * A tinted date "block" (date over time) leads the header, the vet appears with
 * an avatar + clinic, and open visits expose a full-width confirm/join primary
 * plus a cancel. Status reads via a labelled chip. Same `VetAppointmentCardProps`;
 * shadow depth instead of a top accent border. Token-pure.
 */
export function VetAppointmentCardV2({
  vetName,
  clinic,
  reason,
  date,
  time,
  status,
  petName,
  notes,
  actionLabel = 'Confirm',
  onAction,
  onCancel,
  style,
}: VetAppointmentCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const open = status === 'upcoming' || status === 'today';
  const textSlot = (colors as unknown as Record<string, string>)[`${String(meta.slot)}Text`] ?? colors[meta.slot];

  return (
    <View
      accessibilityLabel={`${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          opacity: status === 'cancelled' ? 0.7 : 1,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 64,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors[meta.slot], 0.12),
          }}
        >
          <Text numberOfLines={1} style={{ color: textSlot, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {date}
          </Text>
          {time ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {time}
            </Text>
          ) : null}
        </View>

        <Avatar name={vetName} size="md" />

        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph={REASON_GLYPH[reason]} size="base" />
            <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {vetName}
            </Text>
          </View>
          {clinic ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {clinic}
            </Text>
          ) : null}
        </View>

        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      {petName ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>For {petName}</Text> : null}

      {notes ? (
        <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {notes}
        </Text>
      ) : null}

      {open && (onAction || onCancel) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAction ? (
            <View style={{ flex: 2 }}>
              <Button variant="primary" size="md" onPress={onAction}>
                {actionLabel}
              </Button>
            </View>
          ) : null}
          {onCancel ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="md" tone="danger" onPress={onCancel}>
                Cancel
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
