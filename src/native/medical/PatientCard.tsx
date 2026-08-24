import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';

export type PatientStatus = 'stable' | 'observation' | 'critical' | 'discharged';

const STATUS_META: Record<
  PatientStatus,
  { label: string; tone: 'success' | 'warn' | 'danger' | 'neutral'; glyph: string }
> = {
  stable: { label: 'Stable', tone: 'success', glyph: '●' },
  observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
  critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
  discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};

export interface PatientCardProps {
  /** Patient full name. */
  name: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Age in years. */
  age?: number;
  /** Sex / gender short label, e.g. "F", "M". */
  sex?: string;
  /** Medical record number. */
  mrn?: string;
  /** Clinical status; drives the badge (glyph + label + tone). */
  status?: PatientStatus;
  /** Optional room / bed or ward line. */
  room?: string;
  /** Fires when the card is pressed to open the chart. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A patient roster / chart-header card: avatar, name, an age·sex·MRN demographic
 * line, an optional room, and a clinical status badge whose meaning is carried
 * by a glyph + label as well as tone. Tap to open the record. Informational UI
 * only — not a medical device. Token-only colors.
 */
export function PatientCard({
  name,
  avatar,
  age,
  sex,
  mrn,
  status,
  room,
  onPress,
  style,
}: PatientCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? STATUS_META[status] : undefined;

  const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(Boolean) as string[];
  const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={avatar} name={name} size="lg" />
      <View style={{ flex: 1, gap: 3 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {demo.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {demo.join('  ·  ')}
          </Text>
        ) : null}
        {room ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            🛏 {room}
          </Text>
        ) : null}
      </View>
      {meta ? (
        <Badge tone={meta.tone} variant="soft">
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
