import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar } from '../primitives/Avatar';
import { FollowButton } from './FollowButton';

/** The kind of activity — drives the default text template and the glyph badge. */
export type NotificationKind = 'like' | 'comment' | 'follow' | 'mention' | 'repost';

/** The person who triggered the notification. */
export interface NotificationActor {
  /** Display name (shown bold at the start of the action line). */
  name: string;
  /** Avatar image; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick after the name. */
  verified?: boolean;
}

export interface NotificationRowProps {
  /** Activity kind — picks the badge glyph/tint and the default action phrase. */
  kind: NotificationKind;
  /** Who triggered it (avatar + name). */
  actor: NotificationActor;
  /** Action text after the actor name; when omitted it is derived from `kind`. */
  text?: string;
  /** Relative timestamp shown muted at the end (e.g. `2h`). */
  time?: string;
  /** Unread state — adds a soft-primary row tint and a leading primary dot. */
  unread?: boolean;
  /** Thumbnail of the post the activity refers to, shown at the trailing edge. */
  thumbnailUrl?: string;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  /**
   * For `kind="follow"`: whether the viewer already follows the actor back.
   * When defined (with `onFollow`) a trailing Follow/Following button replaces
   * the thumbnail.
   */
  following?: boolean;
  /** For `kind="follow"`: fires with the *next* desired state when the button is tapped. */
  onFollow?: (next: boolean) => void;
  /** Optional style override for the row container. */
  style?: StyleProp<ViewStyle>;
}

/** Default action phrase per kind, appended after the actor's name. */
const DEFAULT_TEXT: Record<NotificationKind, string> = {
  like: 'liked your post',
  comment: 'commented on your post',
  follow: 'started following you',
  mention: 'mentioned you',
  repost: 'reposted your post',
};

/** Small kind glyph shown as a badge overlapping the avatar. */
const KIND_GLYPH: Record<NotificationKind, string> = {
  like: '❤',
  comment: '💬',
  follow: '＋',
  mention: '@',
  repost: '🔁',
};

/** Semantic color slot (fill / on-fill) for the badge per kind. */
const KIND_SLOT: Record<NotificationKind, { bg: keyof SemanticColors; fg: keyof SemanticColors }> = {
  like: { bg: 'danger', fg: 'onDanger' },
  comment: { bg: 'primary', fg: 'onPrimary' },
  follow: { bg: 'primary', fg: 'onPrimary' },
  mention: { bg: 'primary', fg: 'onPrimary' },
  repost: { bg: 'success', fg: 'onSuccess' },
};

/**
 * NotificationRow — **V4** "feed" design. A single activity/notification item:
 * the actor's big avatar carries a small kind-glyph badge (❤ / 💬 / ＋ / @ / 🔁)
 * tinted by a semantic token, followed by a bold-name action line and a muted
 * time. `unread` paints a soft-primary row tint (via `withAlpha`) and a leading
 * primary dot. A trailing slot shows either the referenced post's `thumbnailUrl`
 * or — for the follow kind — a {@link FollowButton}. Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `NotificationRow`.
 */
export function NotificationRow({
  kind,
  actor,
  text,
  time,
  unread = false,
  thumbnailUrl,
  onPress,
  following,
  onFollow,
  style,
}: NotificationRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const body = text ?? DEFAULT_TEXT[kind];
  const slot = KIND_SLOT[kind];

  const showFollow = kind === 'follow' && (onFollow != null || following != null);

  const trailing = showFollow ? (
    <FollowButton
      state={following ? 'following' : 'follow'}
      size="sm"
      onPress={onFollow ? () => onFollow(!following) : undefined}
    />
  ) : thumbnailUrl ? (
    <Image
      source={{ uri: thumbnailUrl }}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      style={{ width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
    />
  ) : null;

  const a11yLabel = `${actor.name} ${body}${time ? `, ${time}` : ''}${unread ? ', unread' : ''}`;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      minHeight: 44,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      backgroundColor: unread ? withAlpha(colors.primary, 0.1) : colors.surface,
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: unread ? colors.primary : 'transparent',
        }}
      />

      <View>
        <Avatar src={actor.avatarUrl} name={actor.name} size="lg" />
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.surface,
            backgroundColor: colors[slot.bg],
          }}
        >
          <Text style={{ color: colors[slot.fg], fontSize: tokens.typography.scale.xs }}>{KIND_GLYPH[kind]}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>
          <Text style={{ color: colors.onSurface, fontWeight: '800' }}>{actor.name}</Text>
          {actor.verified ? <Text style={{ color: colors.primaryText }}> ✓</Text> : null}
          <Text>{` ${body}`}</Text>
        </Text>
        {time ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{time}</Text> : null}
      </View>

      {trailing}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, pressed ? { backgroundColor: withAlpha(colors.primary, 0.1) } : null]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityRole="text" accessibilityLabel={a11yLabel} style={containerStyle}>
      {inner}
    </View>
  );
}
