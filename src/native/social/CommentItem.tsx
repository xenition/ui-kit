import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { MentionText } from './MentionText';

export interface CommentItemProps {
  /** Comment author display name. */
  author: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  /** Comment body — `@mentions`/`#hashtags` are auto-highlighted. */
  text: string;
  /** Relative time label (e.g. `2h`). */
  timestamp?: string;
  likeCount?: number;
  liked?: boolean;
  /** Nesting depth for threaded replies (indents the row). Default `0`. */
  depth?: number;
  /** Pinned/highlighted comment (e.g. author's pick) — tints the surface. */
  pinned?: boolean;
  /**
   * Surface treatment applied when `pinned` — fill/border/elevation only;
   * radius/padding are unchanged. Default `'classic'` (the historical look).
   */
  appearance?: Appearance;
  onLike?: () => void;
  onReply?: () => void;
  onPressAuthor?: () => void;
  onPressMention?: (handle: string) => void;
  onPressHashtag?: (tag: string) => void;
  /** Nested reply items rendered beneath, already indented via their `depth`. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single comment: avatar, author + timestamp, body (with mention/hashtag
 * highlighting), and a like/reply action row. Supports threaded replies via
 * `depth` indentation and nested `children`, plus a `pinned` highlight. Token-only.
 */
export function CommentItem({
  author,
  handle,
  avatarUrl,
  text,
  timestamp,
  likeCount = 0,
  liked = false,
  depth = 0,
  pinned = false,
  appearance = 'classic',
  onLike,
  onReply,
  onPressAuthor,
  onPressMention,
  onPressHashtag,
  children,
  style,
}: CommentItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const indent = Math.max(0, depth) * tokens.spacing.xl;

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, { paddingLeft: indent }, style]}>
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          // A pinned comment gets a real surface (varies by `appearance`);
          // an unpinned one stays bare, exactly as before.
          ...(pinned ? appearanceStyle(appearance, colors, tokens) : null),
          borderRadius: tokens.radius.md,
          padding: pinned ? tokens.spacing.sm : 0,
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel={author} disabled={!onPressAuthor} onPress={onPressAuthor}>
          <Avatar src={avatarUrl} name={author} size="sm" />
        </Pressable>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {author}
            </Text>
            {handle ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>@{handle}</Text>
            ) : null}
            {timestamp ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {timestamp}</Text>
            ) : null}
            {pinned ? (
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                · Pinned
              </Text>
            ) : null}
          </View>

          <MentionText
            text={text}
            size="sm"
            onPressMention={onPressMention}
            onPressHashtag={onPressHashtag}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Like, ${likeCount}`}
              accessibilityState={{ selected: liked }}
              disabled={!onLike}
              onPress={onLike}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
            >
              <Text style={{ color: liked ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.sm }}>
                {liked ? '♥' : '♡'}
              </Text>
              {likeCount > 0 ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {likeCount}
                </Text>
              ) : null}
            </Pressable>
            {onReply ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reply"
                onPress={onReply}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  Reply
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
      {children ? <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>{children}</View> : null}
    </Animated.View>
  );
}
