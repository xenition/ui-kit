import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Badge, Button, type BadgeTone, type AvatarStatus } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

/**
 * Alternate design (v2) of {@link TechnicianCard} — a drop-in with the **same
 * props**. Where the original is a left-aligned roster row, V2 is a *centered
 * profile card*: an elevated surface, a large **ringed avatar** with a presence
 * dot, the name / role stacked centrally, an availability badge, centered skill
 * chips, a jobs-today stat, and full-width **Call / Assign** actions.
 * Availability is a text + glyph badge (never color alone). Token-pure.
 */
export type TechnicianCardV2Props = TechnicianCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  presence: AvatarStatus;
  ringSlot: 'success' | 'primary' | 'warn' | 'muted';
}

const STATUS: Record<TechnicianStatus, Desc> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online', ringSlot: 'success' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy', ringSlot: 'primary' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away', ringSlot: 'warn' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline', ringSlot: 'muted' },
};

export function TechnicianCardV2({
  name,
  role,
  status,
  avatarUrl,
  skills,
  jobsToday,
  phone,
  onCall,
  onAssign,
  style,
}: TechnicianCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const sd = STATUS[status] ?? STATUS.offline;
  const skillList = Array.isArray(skills) ? skills : [];

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: tokens.spacing.lg,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    ...shadow('md', tokens),
  };

  const a11y = `Technician ${name}${role != null ? `, ${role}` : ''}, ${sd.label}`;

  return (
    <Animated.View accessible accessibilityLabel={a11y} style={[{ opacity: enter.opacity, transform: enter.transform }, surface, style]}>
      <View
        style={{
          padding: 4,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: withAlpha(colors[sd.ringSlot], 0.55),
        }}
      >
        <Avatar src={avatarUrl} name={name} size="xl" status={sd.presence} />
      </View>

      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
        {name}
      </Text>
      {role != null ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {role}
        </Text>
      ) : null}

      <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>

      {jobsToday != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🗒 {Math.max(0, Math.trunc(jobsToday))} jobs today</Text>
      ) : null}

      {skillList.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: 'center' }}>
          {skillList.map((skill, i) => (
            <View
              key={`${skill}-${i}`}
              style={{
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
                backgroundColor: withAlpha(colors.primary, 0.1),
              }}
            >
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{skill}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {(phone != null && onCall) || onAssign ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, width: '100%', marginTop: tokens.spacing.xs }}>
          {phone != null && onCall ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="sm" onPress={onCall} accessibilityLabel={`Call ${name}`}>
                📞 Call
              </Button>
            </View>
          ) : null}
          {onAssign ? (
            <View style={{ flex: 1 }}>
              <Button variant="primary" size="sm" onPress={onAssign} accessibilityLabel={`Assign ${name}`}>
                Assign
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );
}
