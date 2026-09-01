import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar } from '../primitives/Avatar';
import { useEnter } from '../primitives/internal/motion';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItemProps} — same props, the V4 "feed" design. */
export type CommentItemV4Props = CommentItemProps;

/**
 * CommentItem — **V4** "feed" design. The clean, airy take on a comment: a
 * larger avatar, a bold name, a muted handle/timestamp, a mention-aware body,
 * and a like + reply action row. Threaded replies keep their `depth` indent
 * and nested `children`; a `pinned` comment gets a soft-primary tinted rounded
 * surface. Same props/behavior as {@link CommentItemProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
export function CommentItemV4({
  author,
  handle,
  avatarUrl,
  text,
  timestamp,
  likeCount = 0,
  liked = false,
  depth = 0,
  pinned = false,
  onLike,
  onReply,
  onPressAuthor,
  onPressMention,
  onPressHashtag,
  children,
  style,
}: CommentItemV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const indent = Math.max(0, depth) * tokens.spacing.xl;

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, { paddingLeft: indent }, style]}>
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          // A pinned comment gets a soft-primary tinted surface; an unpinned one
          // stays bare on the clean feed surface.
          ...(pinned ? { backgroundColor: withAlpha(colors.primary, 0.1) } : null),
          borderRadius: tokens.radius.lg,
          padding: pinned ? tokens.spacing.sm : 0,
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel={author} disabled={!onPressAuthor} onPress={onPressAuthor}>
          <Avatar src={avatarUrl} name={author} size="md" />
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
              <Text style={{ color: liked ? colors.primaryText : colors.muted, fontSize: tokens.typography.scale.sm }}>
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
                <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
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
