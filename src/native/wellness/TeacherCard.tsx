import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export interface TeacherCardProps {
  name: string;
  specialty?: string;
  avatarGlyph?: string;
  sessions?: number;
  following?: boolean;
  onPress?: () => void;
  onFollow?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * TeacherCard — an instructor row on a clean card: a soft primary-tinted avatar
 * circle, the teacher's name, specialty and session count, and (when `onFollow`
 * is wired) a Follow/Following button. The card stays calm — surface, border,
 * `onSurface`/`mutedText` text — with the only tint on the avatar; follow state
 * lives in the button's label and variant, not in color alone. The whole row is
 * pressable when `onPress` is set. Token-only colors.
 */
export function TeacherCard({
  name,
  specialty,
  avatarGlyph = '🧑‍🏫',
  sessions,
  following = false,
  onPress,
  onFollow,
  style,
}: TeacherCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const body = (
    <>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.14),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {avatarGlyph}
        </Text>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {specialty ? (
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
            {specialty}
          </Text>
        ) : null}
        {sessions != null ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {`${sessions} sessions`}
          </Text>
        ) : null}
      </View>

      {onFollow ? (
        <Button
          variant={following ? 'secondary' : 'primary'}
          size="sm"
          onPress={onFollow}
          accessibilityState={{ selected: following }}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </>
  );

  const cardStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onPress}
        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.85 : 1 }]}
      >
        {body}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{body}</View>;
}
