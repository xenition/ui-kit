import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { APPOINTMENT_STATUS_META, APPOINTMENT_TYPE_META } from './internal';
import type { LegalAppointmentProps } from './LegalAppointment';

/** Drop-in for {@link LegalAppointmentProps} — same props, the V4 "chambers" design. */
export type LegalAppointmentV4Props = LegalAppointmentProps;

/**
 * LegalAppointment — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary date-glyph
 * block, the date + time, type + status pills (each a glyph + word so state never
 * rests on color alone), and optional location / client. When `actionable` and
 * still `scheduled`, a confirm/cancel button row is shown. Tappable when
 * `onPress` is set. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
export function LegalAppointmentV4({
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
}: LegalAppointmentV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = APPOINTMENT_TYPE_META[type];
  const showActions = actionable && status === 'scheduled';
  const cancelled = status === 'cancelled';
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    flexDirection: 'row',
    gap: tokens.spacing.md,
    opacity: cancelled ? 0.6 : 1,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>{typeMeta.glyph}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{date}</Text>
          {time ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{time}</Text> : null}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
          <StatusPill meta={typeMeta} variant="inline" size="sm" />
          {status ? <StatusPill meta={APPOINTMENT_STATUS_META[status]} variant="soft" size="sm" /> : null}
        </View>
        {!compact && (location || client) ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{[location, client].filter(Boolean).join(' · ')}</Text>
        ) : null}

        {showActions ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            {onConfirm ? (
              <Button size="sm" variant="primary" onPress={onConfirm}>Confirm</Button>
            ) : null}
            {onCancel ? (
              <Button size="sm" variant="outline" onPress={onCancel}>Cancel</Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : cancelled ? 0.6 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
