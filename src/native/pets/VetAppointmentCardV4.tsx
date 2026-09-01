import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { VetAppointmentCardProps, VetAppointmentStatus, VetVisitReason } from './VetAppointmentCard';

/** V4 layout choices for the "companion" design. */
export type VetAppointmentCardLayout = 'card' | 'compact';

/** Drop-in for {@link VetAppointmentCardProps} — same props, the V4 "companion" design. */
export interface VetAppointmentCardV4Props extends VetAppointmentCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: VetAppointmentCardLayout;
}

const STATUS_META: Record<VetAppointmentStatus, { label: string; tone: 'primary' | 'warn' | 'success' | 'neutral' }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  today: { label: 'Today', tone: 'warn' },
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
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
 * VetAppointmentCard — **V4** "companion" design (native parity of the web V4).
 * The warm, friendly take on a vet visit: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the reason glyph in a soft-primary
 * tinted well, a bold vet name, muted meta lines (date/time/pet/clinic), a
 * labelled status Badge, and the notes shown as a soft-primary chip. Open visits
 * (`upcoming`/`today`) keep the confirm + cancel actions. Same props/behavior as
 * {@link VetAppointmentCardProps}; status + reason both read via glyph + labelled
 * chip (never color alone). Token-only colors via `useXenitionTheme()`.
 */
export function VetAppointmentCardV4({
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
  variant = 'card',
}: VetAppointmentCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const open = status === 'upcoming' || status === 'today';
  const a11y = `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`;

  const glyphWell = (size: number, fontSize: number) => (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors.primary, 0.1),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize }}>
        {REASON_GLYPH[reason]}
      </Text>
    </View>
  );

  const statusBadge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {meta.label}
    </Badge>
  );

  if (variant === 'compact') {
    const metaLine = clinic || (petName ? `For ${petName}` : undefined);
    return (
      <View
        accessibilityLabel={a11y}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 44,
            gap: tokens.spacing.sm,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.sm,
            opacity: status === 'cancelled' ? 0.7 : 1,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          },
          style,
        ]}
      >
        {glyphWell(36, tokens.typography.scale.lg)}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {vetName}
          </Text>
          {metaLine ? (
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {metaLine}
            </Text>
          ) : null}
        </View>
        {statusBadge}
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {time ? time : date}
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={a11y}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          opacity: status === 'cancelled' ? 0.7 : 1,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {glyphWell(44, tokens.typography.scale.xl)}
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {vetName}
          </Text>
          {clinic ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              📍 {clinic}
            </Text>
          ) : null}
        </View>
        {statusBadge}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        📅 {date}
        {time ? ` · ${time}` : ''}
      </Text>

      {petName ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>For {petName}</Text>
      ) : null}

      {notes ? (
        <View
          style={{
            alignSelf: 'flex-start',
            maxWidth: '100%',
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Text numberOfLines={3} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {notes}
          </Text>
        </View>
      ) : null}

      {open && (onAction || onCancel) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
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
