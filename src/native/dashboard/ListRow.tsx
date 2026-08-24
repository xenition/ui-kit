import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';

export interface ListRowProps {
  title: string;
  /** Secondary line under the title. */
  meta?: string;
  /** Optional avatar image URL; when omitted, initials from `title` are shown. */
  avatarUrl?: string;
  /** Set false to omit the avatar entirely (plain text row). */
  showAvatar?: boolean;
  /** Custom leading slot; overrides the avatar. */
  leading?: React.ReactNode;
  /** Trailing slot: value text, badge, chevron, control, … */
  action?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A generic list row: leading avatar/slot, title + meta, and a trailing action
 * slot. The workhorse row for lists of people, files, items, etc. Pressable
 * when `onPress` is provided. Token-only.
 */
export function ListRow({
  title,
  meta,
  avatarUrl,
  showAvatar = true,
  leading,
  action,
  onPress,
  style,
}: ListRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 56,
        },
        style,
      ]}
    >
      {leading ?? (showAvatar ? <Avatar src={avatarUrl} name={title} size="md" /> : null)}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
        {meta ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
          >
            {meta}
          </Text>
        ) : null}
      </View>
      {action ? <View>{action}</View> : null}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={title}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
