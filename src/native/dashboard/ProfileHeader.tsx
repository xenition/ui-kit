import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';

export interface ProfileHeaderProps {
  name: string;
  /** Optional line under the name, e.g. a role or handle. */
  subtitle?: string;
  /** Optional avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Trailing action slot, e.g. an "Edit" button. */
  actions?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Profile / account header: avatar, name, subtitle, and a trailing action slot.
 * The native mirror of the block that tops most account and settings screens.
 * Token-only.
 */
export function ProfileHeader({
  name,
  subtitle,
  avatarUrl,
  actions,
  style,
}: ProfileHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="header"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size="lg" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.xl,
            fontWeight: '700',
          }}
        >
          {name}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actions ? <View>{actions}</View> : null}
    </View>
  );
}
