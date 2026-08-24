import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button, Icon } from '../primitives';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** Drop-in alternate design for {@link VetAppointmentCard} — identical props. */
export type VetAppointmentCardV3Props = VetAppointmentCardProps;

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
 * Minimal single-line appointment row — a dense alternate to
 * {@link VetAppointmentCard}. The reason glyph, vet name, and date/time sit on a
 * hairline-separated line; open visits show an inline link action, closed visits
 * a status chip. Status always reads via glyph + chip, never color alone. Same
 * `VetAppointmentCardProps`. Token-pure.
 */
export function VetAppointmentCardV3({
  vetName,
  clinic,
  reason,
  date,
  time,
  status,
  petName,
  actionLabel = 'Confirm',
  onAction,
  style,
}: VetAppointmentCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const open = status === 'upcoming' || status === 'today';
  const when = [date, time].filter(Boolean).join(' · ');
  const sub = [clinic, petName ? `for ${petName}` : null].filter(Boolean).join(' · ');

  return (
    <View
      accessibilityLabel={`${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
          opacity: status === 'cancelled' ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Icon glyph={REASON_GLYPH[reason]} size="lg" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {vetName}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {when}
          {sub ? ` · ${sub}` : ''}
        </Text>
      </View>
      {open && onAction ? (
        <Button variant="link" size="sm" onPress={onAction}>
          {actionLabel}
        </Button>
      ) : (
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      )}
    </View>
  );
}
