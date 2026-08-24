import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { Button } from '../primitives';
import {
  APPOINTMENT_STATUS_META,
  APPOINTMENT_TYPE_META,
  toneColor,
  type AppointmentStatus,
  type AppointmentType,
} from './internal';

export type LegalAppointmentVariant = 'default' | 'compact';

export interface LegalAppointmentProps {
  /** Appointment type — glyph + word chip. */
  type: AppointmentType;
  /** Pre-formatted date label (e.g. "Mon, Aug 24"). */
  date: string;
  /** Pre-formatted time / range label (e.g. "10:00–11:00 AM"). */
  time?: string;
  /** Location / room / video-link label. */
  location?: string;
  /** Client or counterparty name. */
  client?: string;
  /** Scheduling state — glyph + word pill, never color alone. */
  status?: AppointmentStatus;
  /** Density. */
  variant?: LegalAppointmentVariant;
  /** Whether to render the confirm/cancel action row (when scheduled). */
  actionable?: boolean;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  /** Confirm the appointment (renders "Confirm" when actionable + scheduled). */
  onConfirm?: () => void;
  /** Cancel the appointment. */
  onCancel?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A scheduled legal appointment — consultation, deposition, mediation, hearing —
 * with a leading date block, type + status pills (each glyph + word so state
 * never rests on color alone), and optional location / client. When `actionable`
 * and still `scheduled`, a confirm/cancel row is shown. All colors are theme
 * tokens — no literals.
 */
export function LegalAppointment({
  type,
  date,
  time,
  location,
  client,
  status = 'scheduled',
  variant = 'default',
  actionable = false,
  onPress,
  onConfirm,
  onCancel,
  testID,
  style,
}: LegalAppointmentProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = APPOINTMENT_TYPE_META[type];
  const tint = toneColor(colors, typeMeta.tone);
  const showActions = actionable && status === 'scheduled';
  const cancelled = status === 'cancelled';

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          opacity: cancelled ? 0.65 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          minWidth: 44,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.xs,
          borderRadius: tokens.radius.sm,
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.base }}>
          {typeMeta.glyph}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{date}</Text>
          {time ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text> : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          <StatusPill meta={typeMeta} variant="inline" size="sm" />
          {status ? <StatusPill meta={APPOINTMENT_STATUS_META[status]} size="sm" /> : null}
        </View>
        {!compact && (location || client) ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[location, client].filter(Boolean).join(' · ')}
          </Text>
        ) : null}

        {showActions ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            {onConfirm ? (
              <Button size="sm" variant="primary" tone="success" onPress={onConfirm}>
                Confirm
              </Button>
            ) : null}
            {onCancel ? (
              <Button size="sm" variant="outline" tone="danger" onPress={onCancel}>
                Cancel
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
