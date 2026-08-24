import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { toneColor, PRESENCE_META, type Presence } from './internal';

export type DirectoryRowVariant = 'default' | 'compact';

export interface DirectoryRowProps {
  /** Person's name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Department / team. */
  department?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Work email — shown on the default variant. */
  email?: string;
  /** Phone / extension — shown on the default variant. */
  phone?: string;
  /** Live presence — shown as a glyph + word, never color alone. */
  presence?: Presence;
  /** Density. `compact` drops the contact meta. */
  variant?: DirectoryRowVariant;
  /** Tap handler for the row. */
  onPress?: () => void;
  /** Trailing quick-action (e.g. a message icon button). */
  onMessage?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Dense people-directory row: avatar with presence, name, title / department,
 * and contact meta (email / phone). Presence is conveyed by a glyph + word pill
 * so it never depends on color alone. `compact` trims to name + title for tight
 * lists. Optional trailing message affordance. All colors are theme tokens —
 * no literals.
 */
export function DirectoryRow({
  name,
  title,
  department,
  avatarUrl,
  email,
  phone,
  presence,
  variant = 'default',
  onPress,
  onMessage,
  testID,
  style,
}: DirectoryRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const presenceMeta = presence ? PRESENCE_META[presence] : undefined;
  const subtitle = [title, department].filter(Boolean).join(' · ');
  const contact = [email, phone].filter(Boolean).join('  ·  ');

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} status={presence} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {subtitle}
          </Text>
        ) : null}
        {!compact && contact ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {contact}
          </Text>
        ) : null}
      </View>
      {presenceMeta ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
          <Text style={{ color: toneColor(colors, presenceMeta.tone), fontSize: tokens.typography.scale.xs }}>
            {presenceMeta.glyph}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{presenceMeta.label}</Text>
        </View>
      ) : null}
      {onMessage ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Message ${name}`}
          hitSlop={8}
          onPress={onMessage}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingLeft: tokens.spacing.xs })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg }}>✉</Text>
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Open ${name}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
