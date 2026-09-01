import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PatientCardProps, PatientStatus } from './PatientCard';

/** V4 layout choices for the "clinic" design. */
export type PatientCardLayout = 'full' | 'compact';

/** Drop-in for {@link PatientCardProps} — same props, the V4 "clinic" design. */
export interface PatientCardV4Props extends PatientCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: PatientCardLayout;
}

const STATUS_META: Record<
  PatientStatus,
  { label: string; tone: 'success' | 'warn' | 'danger' | 'neutral'; glyph: string }
> = {
  stable: { label: 'Stable', tone: 'success', glyph: '●' },
  observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
  critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
  discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};

/**
 * PatientCard — **V4** "clinic" design. The calm, clinical take on a patient
 * roster / chart-header row: an elevated rounded card with a soft shadow, the
 * avatar + name + an age·sex·MRN demographic line, an optional room, and a
 * labelled clinical-status badge whose meaning is carried by a glyph + label as
 * well as tone (never color alone). Tap to open the record. Honors the V4
 * `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link PatientCardProps}. Token-only colors via
 * `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export function PatientCardV4({
  name,
  avatar,
  age,
  sex,
  mrn,
  status,
  room,
  onPress,
  variant = 'full',
  style,
}: PatientCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? STATUS_META[status] : undefined;

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(Boolean) as string[];
  const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;

  const isCompact = variant === 'compact';

  const body = (
    <View
      style={[
        shell,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: isCompact ? tokens.spacing.sm : tokens.spacing.md,
          padding: isCompact ? tokens.spacing.sm : tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Avatar src={avatar} name={name} size={isCompact ? 'sm' : 'lg'} />
      <View style={{ flex: 1, gap: isCompact ? 2 : 3 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: isCompact ? tokens.typography.scale.sm : tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {demo.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: isCompact ? tokens.typography.scale.xs : tokens.typography.scale.sm }}>
            {demo.join('  ·  ')}
          </Text>
        ) : null}
        {!isCompact && room ? (
          <View style={{ alignSelf: 'flex-start', marginTop: 2, backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }}>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              🛏 {room}
            </Text>
          </View>
        ) : null}
      </View>
      {meta ? (
        <Badge tone={meta.tone} variant="soft" size={isCompact ? 'sm' : 'md'}>
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{body}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
