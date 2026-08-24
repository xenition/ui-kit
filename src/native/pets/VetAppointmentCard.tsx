import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button } from '../primitives';

export type VetAppointmentStatus = 'upcoming' | 'today' | 'completed' | 'cancelled';
export type VetVisitReason = 'checkup' | 'vaccination' | 'surgery' | 'dental' | 'emergency' | 'grooming' | 'other';

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

export interface VetAppointmentCardProps {
  /** Vet or veterinary clinic name. */
  vetName: string;
  /** Clinic / location line. */
  clinic?: string;
  /** Reason for the visit; drives the icon. */
  reason: VetVisitReason;
  /** Appointment date (already formatted). */
  date: string;
  /** Appointment time (already formatted). */
  time?: string;
  /** Lifecycle status; drives the chip + accent. */
  status: VetAppointmentStatus;
  /** Pet name shown as a sub-label. */
  petName?: string;
  /** Optional notes / preparation instructions. */
  notes?: string;
  /** Primary action label (confirm/reschedule) — hidden when the visit is closed. */
  actionLabel?: string;
  onAction?: () => void;
  /** Secondary cancel action for open appointments. */
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A vet-visit card: reason icon, vet + clinic, the scheduled date/time, and a
 * status chip. Open visits (`upcoming`/`today`) expose confirm + cancel actions;
 * `completed`/`cancelled` visits are read-only. Status reads via a labelled chip
 * plus a left accent bar. Token-only colors.
 */
export function VetAppointmentCard({
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
}: VetAppointmentCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const open = status === 'upcoming' || status === 'today';

  return (
    <View
      accessibilityLabel={`${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderTopColor: colors[meta.slot],
          borderWidth: 1,
          borderTopWidth: 3,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          opacity: status === 'cancelled' ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {REASON_GLYPH[reason]}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {vetName}
          </Text>
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

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          📅 {date}
          {time ? ` · ${time}` : ''}
        </Text>
      </View>

      {petName ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>For {petName}</Text>
      ) : null}

      {notes ? (
        <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {notes}
        </Text>
      ) : null}

      {open && (onAction || onCancel) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAction ? (
            <View style={{ flex: 1 }}>
              <Button variant="primary" size="sm" onPress={onAction}>
                {actionLabel}
              </Button>
            </View>
          ) : null}
          {onCancel ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="sm" tone="danger" onPress={onCancel}>
                Cancel
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
