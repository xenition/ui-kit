import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Badge, Icon, type BadgeTone, type AvatarStatus } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

/**
 * Alternate design (v3) of {@link TechnicianCard} — a drop-in with the **same
 * props**. The *compact roster row*: a small avatar with a presence dot, the
 * name + role stacked, an availability badge, and trailing **Call / Assign**
 * icon-taps. Availability is a text + glyph badge (never color alone).
 * Token-pure.
 */
export type TechnicianCardV3Props = TechnicianCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  presence: AvatarStatus;
}

const STATUS: Record<TechnicianStatus, Desc> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

export function TechnicianCardV3({
  name,
  role,
  status,
  avatarUrl,
  jobsToday,
  phone,
  onCall,
  onAssign,
  style,
}: TechnicianCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.offline;

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  const sub = [role, jobsToday != null ? `🗒 ${Math.max(0, Math.trunc(jobsToday))}` : null].filter(Boolean).join('   ·   ');
  const a11y = `Technician ${name}${role != null ? `, ${role}` : ''}, ${sd.label}`;

  return (
    <View accessible accessibilityLabel={a11y} style={[rowStyle, style]}>
      <Avatar src={avatarUrl} name={name} size="sm" status={sd.presence} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {name}
        </Text>
        {sub ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {sub}
          </Text>
        ) : null}
      </View>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      {phone != null && onCall ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Call ${name}`}
          onPress={onCall}
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph="📞" size="sm" />
        </Pressable>
      ) : null}
      {onAssign ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Assign ${name}`}
          onPress={onAssign}
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph="＋" size="sm" color="primaryText" />
        </Pressable>
      ) : null}
    </View>
  );
}
