import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

export type FamilyRole =
  | 'parent'
  | 'guardian'
  | 'child'
  | 'sibling'
  | 'grandparent'
  | 'caregiver'
  | 'other';

interface RoleMeta {
  label: string;
  tone: BadgeTone;
}

const ROLE_META: Record<FamilyRole, RoleMeta> = {
  parent: { label: 'Parent', tone: 'primary' },
  guardian: { label: 'Guardian', tone: 'primary' },
  child: { label: 'Child', tone: 'accent' },
  sibling: { label: 'Sibling', tone: 'accent' },
  grandparent: { label: 'Grandparent', tone: 'neutral' },
  caregiver: { label: 'Caregiver', tone: 'success' },
  other: { label: 'Family', tone: 'neutral' },
};

export interface FamilyMemberRowProps {
  /** Member's name. */
  name: string;
  /** Family role; drives the role chip. */
  role?: FamilyRole;
  /** Photo URL for the avatar; falls back to initials. */
  photoUrl?: string;
  /** Relationship detail line, e.g. "Mom" or "Age 8". */
  relationLabel?: string;
  /** Presence — shown as an online/offline dot + text (not color alone). */
  online?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). Pressable when `onPress` is set. Token-only colors.
 */
export function FamilyMemberRow({
  name,
  role = 'other',
  photoUrl,
  relationLabel,
  online,
  onPress,
  style,
}: FamilyMemberRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = ROLE_META[role] ?? ROLE_META.other;

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={photoUrl} name={name} size="md" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {relationLabel ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {relationLabel}
          </Text>
        ) : null}
        {online !== undefined ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: tokens.radius.full,
                backgroundColor: online ? colors.success : colors.border,
              }}
            />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {online ? 'Online' : 'Offline'}
            </Text>
          </View>
        ) : null}
      </View>
      <Badge tone={meta.tone} variant="soft" size="sm">
        {meta.label}
      </Badge>
    </View>
  );

  const a11y = `${name}, ${meta.label}${online !== undefined ? `, ${online ? 'online' : 'offline'}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
